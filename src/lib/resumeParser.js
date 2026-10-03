/**
 * Enterprise Resume Parser Engine — NatureXpress Hub
 * 
 * High-accuracy client-side text extractor, section detector, contact finder,
 * action verb classifier, and quantifiable metrics scanner for PDF, DOCX, and TXT files.
 */

// ─── Precision Keyword Matcher Helper ─────────────────────────────────────────
export const hasKeywordMatch = (text, keyword) => {
  if (!text || !keyword) return false;
  const kw = keyword.toLowerCase().trim();
  const lowerText = text.toLowerCase();

  // Exact phrase check
  if (kw.includes(' ') || kw.includes('/') || kw.includes('-') || kw.includes('.')) {
    // Escape special regex characters in phrase
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?:^|[^a-zA-Z0-9])${escaped}(?:$|[^a-zA-Z0-9])`, 'i');
    return regex.test(lowerText);
  }

  // Exact single word check with word boundaries
  const wordRegex = new RegExp(`\\b${kw}\\b`, 'i');
  return wordRegex.test(lowerText);
};

// ─── PDF Text Extraction ─────────────────────────────────────────────────────
const extractPdfText = (buffer) => {
  const bytes = new Uint8Array(buffer);
  let rawText = '';
  let currentStr = '';

  for (let i = 0; i < bytes.length; i++) {
    const charCode = bytes[i];
    // Printable ASCII + common whitespace
    if ((charCode >= 32 && charCode <= 126) || charCode === 10 || charCode === 13 || charCode === 9) {
      currentStr += String.fromCharCode(charCode);
    } else {
      if (currentStr.trim().length > 1) rawText += currentStr + ' ';
      currentStr = '';
    }
  }
  if (currentStr.trim().length > 1) rawText += currentStr;

  // Clean up PDF stream artifacts, unescape common PDF sequences, normalize whitespace
  return rawText
    .replace(/\(cid:[0-9]+\)/g, '')
    .replace(/\\([()\\])/g, '$1')
    .replace(/[^\x20-\x7E\n\r\t]/g, ' ')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

// ─── DOCX Text Extraction ─────────────────────────────────────────────────────
const extractDocxText = (buffer) => {
  try {
    const decoder = new TextDecoder('utf-8', { fatal: false });
    const rawText = decoder.decode(buffer);
    return rawText
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/[ \t]{2,}/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  } catch {
    const decoder = new TextDecoder('latin1', { fatal: false });
    return decoder.decode(buffer);
  }
};

// ─── URL / Link Extraction ────────────────────────────────────────────────────
const extractUrls = (text) => {
  const urlRegex = /(?:https?:\/\/|www\.)[^\s"'<>(),;]+|github\.com\/[^\s"'<>(),;]+|linkedin\.com\/(?:in\/)?[^\s"'<>(),;]+|figma\.com\/[^\s"'<>(),;]+|behance\.net\/[^\s"'<>(),;]+|dribbble\.com\/[^\s"'<>(),;]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.(?:vercel\.app|netlify\.app|web\.app|github\.io)[^\s"'<>(),;]*/gi;
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
  const match = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|(?:\+91[\s\-]?)?[6-9]\d{9}/);
  return match ? match[0] : null;
};

// ─── Section Detection ────────────────────────────────────────────────────────
const detectSections = (text) => {
  const sectionHeaders = {
    experience: /^(?:(?:work\s+)?experience|employment\s+history|professional\s+background|internships?|work\s+history)/i,
    education: /^(?:education|academic\s+background|qualifications?|degree|university|colleges?)/i,
    projects: /^(?:projects?|key\s+projects|portfolio|case\s+studies|technical\s+projects|work\s+samples)/i,
    skills: /^(?:skills?|technical\s+skills|core\s+competencies|technologies|tools\s+&?\s+skills|frameworks)/i,
    certifications: /^(?:certifications?|certificates?|credentials|licenses?|training|courses?)/i,
    summary: /^(?:summary|professional\s+summary|profile|about\s+me|objective|career\s+objective)/i,
  };

  const sections = {};
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  let currentSection = 'header';
  sections['header'] = [];

  for (const line of lines) {
    let matched = false;
    if (line.length < 50) {
      for (const [sectionName, regex] of Object.entries(sectionHeaders)) {
        if (regex.test(line)) {
          currentSection = sectionName;
          sections[sectionName] = sections[sectionName] || [];
          matched = true;
          break;
        }
      }
    }
    if (!matched) {
      if (!sections[currentSection]) sections[currentSection] = [];
      sections[currentSection].push(line);
    }
  }

  return sections;
};

// ─── Action Verbs Classifier ──────────────────────────────────────────────────
const POWER_VERBS = [
  'architected', 'spearheaded', 'engineered', 'scaled', 'optimized', 'deployed',
  'implemented', 'accelerated', 'automated', 'streamlined', 'designed', 'developed',
  'orchestrated', 'built', 'created', 'boosted', 'increased', 'maximized', 'minimized',
  'reduced', 'delivered', 'formulated', 'executed', 'configured', 'integrated', 'refactored',
  'debugged', 'migrated', 'managed', 'led', 'analyzed', 'generated', 'transformed'
];

const WEAK_VERBS = [
  'worked on', 'helped with', 'was responsible for', 'responsible for', 'assisted with',
  'assisted in', 'did', 'handled', 'tried', 'participated in', 'contributed to', 'involved in',
  'duties included', 'tasked with'
];

const scanActionVerbs = (text) => {
  const powerFound = POWER_VERBS.filter(v => hasKeywordMatch(text, v));
  const weakFound = WEAK_VERBS.filter(v => hasKeywordMatch(text, v));

  return {
    powerVerbs: powerFound,
    weakVerbs: weakFound,
    powerScore: Math.min(Math.round((powerFound.length / 5) * 100), 100),
    ratioVerdict: weakFound.length > powerFound.length ? 'Needs Stronger Impact Verbs' : 'Good Action Orientation'
  };
};

// ─── Measurable Numbers & Metrics Scanner ─────────────────────────────────────
const scanQuantifiableMetrics = (text) => {
  const metricRegexes = [
    /\b\d+(?:\.\d+)?\s*%/g, // Percentages: 45%, 12.5%
    /\b\d+(?:\.\d+)?\s*[xX]\b/g, // Multipliers: 3.5x, 10x
    /(?:₹|\$|INR|USD)\s*[\d,]+(?:\.\d+)?[kKmMbB]?/gi, // Currency: ₹10L, $50k
    /\b\d+\s*(?:ms|sec|seconds|mins|minutes|hours|days|weeks|months)\b/gi, // Latency/Time: 200ms, 4 weeks
    /\b\d{1,3}(?:,\d{3})+\b|\b\d+[kKmM]\b/g, // Scale: 10,000, 50k, 1M users
  ];

  const foundMetrics = [];
  for (const regex of metricRegexes) {
    const matches = text.match(regex) || [];
    foundMetrics.push(...matches);
  }

  const uniqueMetrics = [...new Set(foundMetrics)].slice(0, 10);
  const metricDensity = uniqueMetrics.length >= 4 ? 'High (Proven ROI)' : uniqueMetrics.length >= 2 ? 'Moderate' : 'Low (Theoretical)';

  return {
    metricsFound: uniqueMetrics,
    count: uniqueMetrics.length,
    density: metricDensity,
    score: Math.min(uniqueMetrics.length * 25, 100)
  };
};

// ─── Company & Seniority Detection ───────────────────────────────────────────
const detectCompanies = (text) => {
  const companyPatterns = [
    /(?:at|@|for)\s+([A-Z][a-zA-Z0-9\s&.,]+(?:Pvt\.?\s*Ltd\.?|Limited|Inc\.?|Corp\.?|Technologies|Tech|Solutions|Systems|Digital|Labs|Agency|Studio)?)/g,
    /^([A-Z][a-zA-Z0-9\s&.,]+(?:Pvt\.?\s*Ltd\.?|Limited|Inc\.?|Corp\.?|Technologies|Tech|Solutions|Systems|Digital|Labs|Agency|Studio))\s*[|–\-]/gm,
  ];

  const companies = new Set();
  for (const pattern of companyPatterns) {
    let match;
    const regex = new RegExp(pattern.source, pattern.flags);
    while ((match = regex.exec(text)) !== null) {
      const name = match[1].trim();
      if (name.length > 2 && name.length < 50 && !/^(Education|Experience|Projects|Skills|Summary|Objective)/i.test(name)) {
        companies.add(name);
      }
    }
  }
  return [...companies].slice(0, 4);
};

const detectSeniorityLevel = (text) => {
  const lower = text.toLowerCase();
  if (/senior|lead|principal|architect|head\s+of|director|manager|vp\s+of/i.test(text)) {
    return { level: 'Senior / Lead', yearsEstimate: '4+ Years' };
  }
  if (/junior|jr\.|fresher|trainee|intern|internship|entry[- ]level|graduate/i.test(lower)) {
    return { level: 'Fresher / Entry', yearsEstimate: '0–1 Years' };
  }
  const yearMatches = text.match(/\b(20[1-2][0-9])\b/g) || [];
  const uniqueYears = [...new Set(yearMatches.map(Number))].sort();
  if (uniqueYears.length >= 2) {
    const span = uniqueYears[uniqueYears.length - 1] - uniqueYears[0];
    if (span >= 3) return { level: 'Mid-Level', yearsEstimate: `${span}+ Years` };
    if (span >= 1) return { level: 'Early Career', yearsEstimate: `${span}–${span + 1} Years` };
  }
  return { level: 'Entry / SDE-1 Candidate', yearsEstimate: '0–2 Years' };
};

const detectCandidateName = (text) => {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 2 && l.length < 40);
  for (const line of lines.slice(0, 5)) {
    if (/^[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3}$/.test(line) && !/^(Resume|Curriculum|Profile|Contact|About|Summary|Objective|Technical)/i.test(line)) {
      return line;
    }
  }
  return null;
};

// ─── Format & Readability Hygiene ─────────────────────────────────────────────
const evaluateFormatHealth = (text, sections, urls, email, phone) => {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const bulletCount = (text.match(/[•\-\*\u2022\u2023\u25E6\u2043\u2219]/g) || []).length;
  
  const issues = [];
  if (!email) issues.push('Missing direct email address header');
  if (!phone) issues.push('Missing contact phone number');
  if (urls.length === 0) issues.push('Zero live clickable URLs or portfolio links');
  if (!sections.projects || sections.projects.length === 0) issues.push('Missing dedicated "Projects" section');
  if (!sections.skills || sections.skills.length === 0) issues.push('Missing dedicated "Skills / Tech Stack" section');
  if (wordCount < 140) issues.push('Resume word count is low (<140 words) for full ATS parsing');
  if (wordCount > 950) issues.push('Resume exceeds 950 words — consider condensing for recruiter scan speed');
  if (bulletCount < 4) issues.push('Low bullet point count — recruiters prefer scannable action bullets');

  const hygieneScore = Math.max(15, 100 - (issues.length * 14));

  return {
    wordCount,
    readingTimeSec: Math.round(wordCount / 3.5),
    bulletCount,
    hasEmail: !!email,
    hasPhone: !!phone,
    hasProjectsSection: !!sections.projects,
    hasSkillsSection: !!sections.skills,
    hasExperienceSection: !!sections.experience,
    issues,
    hygieneScore
  };
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

        const urls = extractUrls(rawText);
        const email = extractEmail(rawText);
        const phone = extractPhone(rawText);
        const sections = detectSections(rawText);
        const companies = detectCompanies(rawText);
        const seniority = detectSeniorityLevel(rawText);
        const candidateName = detectCandidateName(rawText);
        const actionVerbs = scanActionVerbs(rawText);
        const metrics = scanQuantifiableMetrics(rawText);
        const formatHealth = evaluateFormatHealth(rawText, sections, urls, email, phone);

        // Comprehensive All-domain skill dictionary
        const allSkills = [
          // Web & Full Stack
          'react', 'reactjs', 'react.js', 'next.js', 'nextjs', 'node.js', 'nodejs', 'express', 'express.js',
          'javascript', 'typescript', 'html5', 'html', 'css3', 'css', 'tailwind', 'tailwindcss',
          'mongodb', 'mongoose', 'supabase', 'postgresql', 'postgres', 'mysql', 'sqlite', 'redis',
          'python', 'django', 'fastapi', 'flask', 'rest api', 'restful', 'graphql', 'api',
          'docker', 'aws', 'gcp', 'azure', 'vercel', 'netlify', 'firebase',
          'git', 'github', 'gitlab', 'ci/cd', 'jest', 'vitest', 'cypress', 'redux', 'zustand', 'prisma',
          'vue', 'angular', 'svelte', 'vite', 'webpack',
          // Growth & Marketing
          'meta ads', 'facebook ads', 'instagram ads', 'google ads', 'google adwords', 'sem',
          'seo', 'search engine optimization', 'copywriting', 'content marketing',
          'funnel', 'sales funnel', 'landing page', 'conversion rate', 'conversion rate optimization', 'cro',
          'roas', 'cac', 'ctr', 'cpa', 'analytics', 'google analytics', 'ga4',
          'meta pixel', 'facebook pixel', 'retargeting', 'remarketing',
          'custom audience', 'lookalike audience', 'a/b testing', 'split testing',
          'email marketing', 'klaviyo', 'mailchimp', 'hubspot', 'crm',
          'lead generation', 'drip campaign', 'whatsapp marketing', 'performance marketing',
          // Design & UI/UX
          'figma', 'adobe xd', 'sketch', 'invision', 'zeplin',
          'photoshop', 'illustrator', 'indesign', 'after effects', 'premiere',
          'ui/ux', 'ux research', 'user research', 'usability testing',
          'wireframe', 'wireframing', 'prototyping', 'prototype',
          'design system', 'component library', 'design tokens', 'auto layout',
          'typography', 'color theory', 'branding', 'brand identity',
          'behance', 'dribbble', 'canva', 'framer', 'lottie',
          'responsive design', 'mobile design', 'user flow', 'information architecture',
          // AI Workflows & Modern DX
          'cursor', 'chatgpt', 'claude', 'v0.dev', 'ai tools', 'prompt engineering', 'copilot'
        ];

        const detectedSkills = [...new Set(
          allSkills.filter(s => hasKeywordMatch(rawText, s))
        )];

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
          actionVerbs,
          metrics,
          formatHealth,
          detectedSkills: detectedSkills.map(s => s.toLowerCase()),
        });
      } catch (err) {
        console.error('Resume parsing error:', err);
        resolve({
          success: false,
          fileName: file.name,
          rawText: '',
          urlsFound: [],
          detectedSkills: [],
          sections: {},
          companies: [],
          seniority: { level: 'Entry', yearsEstimate: '0–1' },
          candidateName: null,
          email: null,
          phone: null,
          actionVerbs: { powerVerbs: [], weakVerbs: [], powerScore: 20, ratioVerdict: 'Unverified' },
          metrics: { metricsFound: [], count: 0, density: 'Low', score: 20 },
          formatHealth: { wordCount: 0, readingTimeSec: 0, bulletCount: 0, issues: ['File parsing failed.'], hygieneScore: 30 }
        });
      }
    };

    reader.onerror = () => resolve({
      success: false,
      fileName: file.name,
      rawText: '',
      urlsFound: [],
      detectedSkills: [],
      sections: {},
      companies: [],
      seniority: { level: 'Entry', yearsEstimate: '0–1' },
      candidateName: null,
      email: null,
      phone: null,
      actionVerbs: { powerVerbs: [], weakVerbs: [], powerScore: 0, ratioVerdict: 'Unverified' },
      metrics: { metricsFound: [], count: 0, density: 'Low', score: 0 },
      formatHealth: { wordCount: 0, readingTimeSec: 0, bulletCount: 0, issues: ['File read error'], hygieneScore: 0 }
    });

    reader.readAsArrayBuffer(file);
  });
};
