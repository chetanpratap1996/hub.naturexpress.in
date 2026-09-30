/**
 * Enterprise Resume Parser — NatureXpress Hub
 * Extracts structured text, sections, URLs, emails, companies, durations,
 * and ranked skill signals from PDF, DOCX, and TXT resume files.
 */

// ─── PDF Text Extraction ─────────────────────────────────────────────────────
const extractPdfText = (buffer) => {
  const bytes = new Uint8Array(buffer);
  let rawText = '';
  let currentStr = '';

  for (let i = 0; i < bytes.length; i++) {
    const charCode = bytes[i];
    // Printable ASCII + whitespace + common unicode range
    if ((charCode >= 32 && charCode <= 126) || charCode === 10 || charCode === 13 || charCode === 9) {
      currentStr += String.fromCharCode(charCode);
    } else {
      if (currentStr.trim().length > 2) rawText += currentStr + ' ';
      currentStr = '';
    }
  }
  if (currentStr.trim().length > 2) rawText += currentStr;

  // Clean up PDF artifacts — remove streams of special chars, normalize whitespace
  return rawText
    .replace(/\(cid:[0-9]+\)/g, '')
    .replace(/[^\x20-\x7E\n\r\t]/g, ' ')
    .replace(/\s{3,}/g, '\n')
    .replace(/\n{4,}/g, '\n\n')
    .trim();
};

// ─── DOCX Text Extraction ─────────────────────────────────────────────────────
const extractDocxText = (buffer) => {
  try {
    const decoder = new TextDecoder('utf-8', { fatal: false });
    const rawText = decoder.decode(buffer);
    // Strip XML tags, extract visible text content
    const stripped = rawText
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .replace(/&quot;/g, '"')
      .replace(/\s{3,}/g, '\n')
      .trim();
    return stripped;
  } catch {
    const decoder = new TextDecoder('latin1', { fatal: false });
    return decoder.decode(buffer);
  }
};

// ─── URL / Link Extraction ────────────────────────────────────────────────────
const extractUrls = (text) => {
  const urlRegex = /(?:https?:\/\/|www\.)[^\s"'<>(),;]+|github\.com\/[^\s"'<>(),;]+|linkedin\.com\/[^\s"'<>(),;]+|figma\.com\/[^\s"'<>(),;]+|behance\.net\/[^\s"'<>(),;]+|dribbble\.com\/[^\s"'<>(),;]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.(?:vercel\.app|netlify\.app|web\.app|github\.io)[^\s"'<>(),;]*/gi;
  const raw = text.match(urlRegex) || [];
  return [...new Set(raw.map(u => u.replace(/[.,;:)}"']+$/, '').replace(/^www\./, 'https://www.')))];
};

// ─── Email Extraction ─────────────────────────────────────────────────────────
const extractEmail = (text) => {
  const match = text.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : null;
};

// ─── Phone Extraction ─────────────────────────────────────────────────────────
const extractPhone = (text) => {
  const match = text.match(/(?:\+91[\s\-]?)?[6-9]\d{9}/);
  return match ? match[0] : null;
};

// ─── Section Detection ────────────────────────────────────────────────────────
const detectSections = (text) => {
  const sectionHeaders = {
    experience: /(?:work\s+)?experience|employment\s+history|professional\s+background|internship|positions?\s+held/i,
    education: /education|academic|qualification|degree|university|college|school/i,
    projects: /project|portfolio|case\s+study|built|developed|created|deployed/i,
    skills: /skills?|technical|technologies|tools|languages|frameworks|competencies/i,
    certifications: /certifications?|courses?|training|credentials|awards?|achievements?/i,
    summary: /summary|objective|profile|about\s+me|career\s+goal/i,
  };

  const sections = {};
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  let currentSection = 'header';
  sections['header'] = [];

  for (const line of lines) {
    let matched = false;
    for (const [sectionName, regex] of Object.entries(sectionHeaders)) {
      if (line.length < 60 && regex.test(line)) {
        currentSection = sectionName;
        sections[sectionName] = sections[sectionName] || [];
        matched = true;
        break;
      }
    }
    if (!matched) {
      if (!sections[currentSection]) sections[currentSection] = [];
      sections[currentSection].push(line);
    }
  }

  return sections;
};

// ─── Company / Employer Detection ────────────────────────────────────────────
const detectCompanies = (text) => {
  const companyPatterns = [
    // "at XYZ" or "@ XYZ" patterns
    /(?:at|@|for)\s+([A-Z][a-zA-Z0-9\s&.,]+(?:Pvt\.?\s*Ltd\.?|Limited|Inc\.?|Corp\.?|Technologies|Tech|Solutions|Systems|Digital|Labs|Agency|Studio)?)/g,
    // "XYZ | Role" or "XYZ – Role" patterns  
    /^([A-Z][a-zA-Z0-9\s&.,]+(?:Pvt\.?\s*Ltd\.?|Limited|Inc\.?|Corp\.?|Technologies|Tech|Solutions|Systems|Digital|Labs|Agency|Studio))\s*[|–\-]/gm,
  ];

  const companies = new Set();
  for (const pattern of companyPatterns) {
    let match;
    const regex = new RegExp(pattern.source, pattern.flags);
    while ((match = regex.exec(text)) !== null) {
      const name = match[1].trim();
      if (name.length > 2 && name.length < 60) companies.add(name);
    }
  }
  return [...companies].slice(0, 5);
};

// ─── Seniority / Experience Level Detection ───────────────────────────────────
const detectSeniorityLevel = (text) => {
  const lower = text.toLowerCase();
  if (/senior|lead|principal|architect|head\s+of|director|manager|vp\s+of|chief/i.test(text)) {
    return { level: 'Senior', yearsEstimate: '4+' };
  }
  if (/junior|jr\.|fresher|trainee|intern|entry.level|graduate/i.test(lower)) {
    return { level: 'Junior / Fresher', yearsEstimate: '0–1' };
  }
  // Count year patterns like "2021", "2022 – 2024", etc.
  const yearMatches = text.match(/\b(20[1-2][0-9])\b/g) || [];
  const uniqueYears = [...new Set(yearMatches.map(Number))].sort();
  if (uniqueYears.length >= 2) {
    const span = uniqueYears[uniqueYears.length - 1] - uniqueYears[0];
    if (span >= 3) return { level: 'Mid-Level', yearsEstimate: `${span}+` };
    if (span >= 1) return { level: 'Early Career', yearsEstimate: `${span}–${span + 1}` };
  }
  return { level: 'Fresher / Entry', yearsEstimate: '0–1' };
};

// ─── Candidate Name Detection ─────────────────────────────────────────────────
const detectCandidateName = (text) => {
  // Most resumes start with the name in first 3 meaningful lines
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 1 && l.length < 50);
  for (const line of lines.slice(0, 5)) {
    // Name: title-cased words, no numbers, 2–4 words
    if (/^[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3}$/.test(line)) {
      return line;
    }
  }
  return null;
};

// ─── Main Parser Export ───────────────────────────────────────────────────────
export const parseResumeFile = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const buffer = e.target.result;
        let rawText = '';

        if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
          rawText = extractPdfText(buffer);
        } else {
          rawText = extractDocxText(buffer);
        }

        // ── Structured Extraction ──
        const urls = extractUrls(rawText);
        const email = extractEmail(rawText);
        const phone = extractPhone(rawText);
        const sections = detectSections(rawText);
        const companies = detectCompanies(rawText);
        const seniority = detectSeniorityLevel(rawText);
        const candidateName = detectCandidateName(rawText);

        // ── All-domain Skill Dictionary ──
        const allSkills = [
          // Web Dev
          'react', 'reactjs', 'react.js', 'next.js', 'nextjs', 'node.js', 'nodejs', 'express', 'express.js',
          'javascript', 'typescript', 'html5', 'html', 'css3', 'css', 'tailwind', 'tailwindcss',
          'mongodb', 'mongoose', 'supabase', 'postgresql', 'postgres', 'mysql', 'sqlite',
          'python', 'django', 'fastapi', 'flask', 'rest api', 'restful', 'graphql', 'api',
          'docker', 'aws', 'gcp', 'azure', 'vercel', 'netlify', 'heroku',
          'git', 'github', 'gitlab', 'ci/cd', 'jest', 'redux', 'zustand', 'prisma', 'sequelize',
          'vue', 'angular', 'svelte', 'vite', 'webpack', 'babel',
          // Marketing
          'meta ads', 'facebook ads', 'instagram ads', 'google ads', 'google adwords', 'sem',
          'seo', 'search engine optimization', 'copywriting', 'content marketing',
          'funnel', 'sales funnel', 'landing page', 'conversion rate',
          'roas', 'cac', 'ctr', 'cpa', 'analytics', 'google analytics', 'ga4',
          'meta pixel', 'facebook pixel', 'retargeting', 'remarketing',
          'custom audience', 'lookalike audience', 'a/b testing', 'split testing',
          'email marketing', 'klaviyo', 'mailchimp', 'hubspot', 'crm',
          'lead generation', 'drip campaign', 'whatsapp marketing',
          // Design
          'figma', 'adobe xd', 'sketch', 'invision', 'zeplin',
          'photoshop', 'illustrator', 'indesign', 'after effects', 'premiere',
          'ui/ux', 'ux research', 'user research', 'usability testing',
          'wireframe', 'wireframing', 'prototyping', 'prototype',
          'design system', 'component library', 'design tokens', 'auto layout',
          'typography', 'color theory', 'branding', 'brand identity',
          'behance', 'dribbble', 'canva', 'framer', 'lottie',
          'responsive design', 'mobile design', 'user flow', 'information architecture',
          // General
          'agile', 'scrum', 'jira', 'notion', 'trello', 'slack',
          'cursor', 'chatgpt', 'claude', 'ai tools', 'prompt engineering',
        ];

        const lower = rawText.toLowerCase();
        const detectedSkills = [...new Set(
          allSkills.filter(s => lower.includes(s.toLowerCase()))
        )];

        // ── Score Bonus ──
        let scoreBonus = 0;
        if (urls.length >= 3) scoreBonus += 25;
        else if (urls.length >= 1) scoreBonus += 15;
        if (detectedSkills.length >= 8) scoreBonus += 15;
        else if (detectedSkills.length >= 4) scoreBonus += 8;
        if (companies.length >= 1) scoreBonus += 5;
        if (sections.experience) scoreBonus += 5;

        // ── ATS Rating ──
        let atsRating = 'Low Proof Density';
        if (urls.length >= 2 && detectedSkills.length >= 6) atsRating = 'Verified High-Proof Resume';
        else if (urls.length >= 1 || detectedSkills.length >= 4) atsRating = 'Moderate Proof Density';

        const summary = urls.length > 0
          ? `Found ${urls.length} live URL(s) and ${detectedSkills.length} technical skills in resume.`
          : `Extracted ${detectedSkills.length} skills. No live deployed links detected — high ATS filter risk.`;

        resolve({
          success: true,
          fileName: file.name,
          fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          rawText,
          urlsFound: urls,
          email,
          phone,
          sections,
          companies,
          seniority,
          candidateName,
          detectedSkills: detectedSkills.map(s => s.toLowerCase()),
          scoreBonus,
          atsRating,
          summary,
        });
      } catch (err) {
        console.error('Resume parsing error:', err);
        resolve({
          success: false,
          fileName: file.name,
          rawText: '',
          scoreBonus: 5,
          atsRating: 'Standard Attachment',
          urlsFound: [],
          detectedSkills: [],
          sections: {},
          companies: [],
          seniority: { level: 'Unknown', yearsEstimate: '?' },
          candidateName: null,
          email: null,
          phone: null,
          summary: 'Resume attached. Deep scan incomplete — please try PDF format for best results.',
        });
      }
    };

    reader.onerror = () => resolve({
      success: false,
      fileName: file.name,
      rawText: '',
      scoreBonus: 5,
      atsRating: 'Standard Attachment',
      urlsFound: [],
      detectedSkills: [],
      sections: {},
      companies: [],
      seniority: { level: 'Unknown', yearsEstimate: '?' },
      candidateName: null,
      email: null,
      phone: null,
      summary: 'Resume attached.',
    });

    reader.readAsArrayBuffer(file);
  });
};
