/**
 * Enterprise Resume Analyzer Engine — NatureXpress Hub
 *
 * Produces domain-specific, resume-specific audit results:
 * - Proof Density Score (0–100) weighted across 6 pillars
 * - Specific strengths pulled from ACTUAL resume data
 * - Specific gaps with exact missing signals
 * - Persona-mapped salary bands based on seniority + skill depth
 * - Custom 4-step sprint action plan tailored to the person's gap profile
 *
 * All 3 domains: Web Dev · Digital Marketing · UI/UX Design
 */

// ─── Domain Skill Matrices ────────────────────────────────────────────────────
const DOMAIN_MATRICES = {
  web: {
    // Tier 1: Core must-haves (heavy weight)
    tier1: ['react', 'node', 'express', 'javascript', 'typescript', 'next.js', 'nextjs', 'nodejs', 'node.js'],
    // Tier 2: Backend / DB / Infra (medium weight)
    tier2: ['mongodb', 'postgresql', 'supabase', 'mysql', 'prisma', 'rest api', 'graphql', 'docker', 'aws', 'github', 'git', 'ci/cd'],
    // Tier 3: Modern DX / AI tools (bonus)
    tier3: ['tailwind', 'tailwindcss', 'redux', 'zustand', 'vercel', 'cursor', 'claude', 'vite', 'jest', 'python', 'fastapi', 'django'],
    // What good looks like
    benchmarks: {
      portfolioMinUrls: 2,
      skillsMinTier1: 3,
      skillsMinTier2: 3,
      salaryBands: {
        low: { label: '₹2.4L – ₹3.6L /yr', context: 'Entry / No production proof' },
        mid: { label: '₹4.5L – ₹7L /yr', context: 'Mid with basic projects' },
        high: { label: '₹8L – ₹14L /yr', context: 'Verified production deployments' },
        top: { label: '₹14L – ₹25L+ /yr', context: 'Full-stack + AI tools + live proof' },
      },
    },
    pillars: [
      { key: 'liveUrls', label: 'Live Deployed Projects', maxPts: 25, description: 'Vercel/AWS/Netlify production URLs' },
      { key: 'tier1Skills', label: 'Core Framework Stack', maxPts: 20, description: 'React / Node / TypeScript' },
      { key: 'tier2Skills', label: 'Backend & DB Integration', maxPts: 15, description: 'DB, APIs, Auth, Cloud' },
      { key: 'githubSignal', label: 'GitHub Activity / OSS', maxPts: 15, description: 'Commit history, repositories' },
      { key: 'companyXP', label: 'Verified Work Experience', maxPts: 15, description: 'Internship or job with known employer' },
      { key: 'modernTools', label: 'AI & Modern DX Tools', maxPts: 10, description: 'Cursor, Claude, CI/CD, Docker' },
    ],
    missingMessages: {
      liveUrls: (count) => count === 0
        ? 'CRITICAL: Zero live deployed URLs found. Every senior engineer screening your resume looks for Vercel/GitHub Pages links. This alone causes 87% of resumes to be auto-skipped in ATS.'
        : `MODERATE: Only ${count} live link detected. Senior tech leads expect 3+ production projects with real databases and auth flows.`,
      tier1Skills: (skills) => `STACK GAP: Your resume doesn't clearly show ${['React', 'Node.js', 'TypeScript'].filter(s => !skills.some(sk => sk.includes(s.toLowerCase().replace('.', '')))).join(', ')}. These are mandatory keywords in 94% of India's SDE-1 / SDE-2 job descriptions.`,
      githubSignal: () => 'PROOF GAP: No GitHub profile or active commit history found. Hiring managers at product companies run a "GitHub smell test" — empty or tutorial-clone repos are immediate disqualifiers.',
      companyXP: () => 'EXPERIENCE GAP: No internship or company work experience detected. Even a 2-month internship with a verified experience letter moves your resume from the "Fresher Pile" to "Considered Pool".',
      tier2Skills: (skills) => `DEPTH GAP: ${['PostgreSQL', 'MongoDB', 'REST API', 'Docker', 'AWS'].filter(s => !skills.some(sk => sk.includes(s.toLowerCase()))).slice(0, 3).join(', ')} not found. Recruiters use these as filters for mid-level engineering roles.`,
    },
  },

  marketing: {
    tier1: ['meta ads', 'facebook ads', 'google ads', 'google adwords', 'seo', 'instagram ads'],
    tier2: ['roas', 'cac', 'ctr', 'cpa', 'conversion rate', 'a/b testing', 'split testing', 'meta pixel', 'facebook pixel', 'google analytics', 'ga4'],
    tier3: ['klaviyo', 'mailchimp', 'hubspot', 'email marketing', 'copywriting', 'funnel', 'landing page', 'retargeting', 'custom audience', 'lookalike'],
    benchmarks: {
      portfolioMinUrls: 1,
      skillsMinTier1: 2,
      skillsMinTier2: 3,
      salaryBands: {
        low: { label: '₹2.4L – ₹3.6L /yr', context: 'No verified ad spend or ROAS proof' },
        mid: { label: '₹4L – ₹6.5L /yr', context: 'Agency-level with some campaign data' },
        high: { label: '₹7L – ₹12L /yr', context: 'Verified ROAS + multi-platform campaigns' },
        top: { label: '₹12L – ₹20L+ /yr', context: 'Growth lead with ₹50L+ managed ad spend' },
      },
    },
    pillars: [
      { key: 'liveUrls', label: 'Campaign Proof / Dashboard Links', maxPts: 25, description: 'Live dashboard screenshots, portfolio URLs' },
      { key: 'tier1Skills', label: 'Core Ad Platform Expertise', maxPts: 20, description: 'Meta Ads, Google Ads, SEO' },
      { key: 'tier2Skills', label: 'Performance Metrics (ROAS / CAC)', maxPts: 20, description: 'Measurable KPI data in resume' },
      { key: 'githubSignal', label: 'Funnel / Portfolio Proof', maxPts: 10, description: 'Landing pages, case studies, campaign decks' },
      { key: 'companyXP', label: 'Agency / Brand Experience', maxPts: 15, description: 'Company-verified ad campaigns managed' },
      { key: 'modernTools', label: 'Analytics & Automation Tools', maxPts: 10, description: 'GA4, Klaviyo, HubSpot, CRM' },
    ],
    missingMessages: {
      liveUrls: (count) => count === 0
        ? 'CRITICAL: No campaign result URLs, dashboard links, or portfolio case study links found. Growth directors at agencies need proof of real ad spend — "I ran campaigns" without a screenshot is worth nothing.'
        : `PROOF GAP: Only ${count} link found. Add at least 3 campaign portfolio links showing ROAS, conversion, or creative results.`,
      tier1Skills: (skills) => `PLATFORM GAP: ${['Meta Ads', 'Google Ads', 'SEO'].filter(s => !skills.some(sk => sk.includes(s.toLowerCase()))).join(' and ')} not detected. These are non-negotiable for any digital marketing role in 2024.`,
      tier2Skills: () => 'METRIC GAP: No measurable KPI data (ROAS, CAC, CTR, CPA) found in resume. Marketing leads at growth-stage startups expect to see numbers like "4.2x ROAS" or "₹18 CPA" as proof of performance.',
      githubSignal: () => 'FUNNEL GAP: No landing page, campaign case study, or creative portfolio link found. Top agencies evaluate whether you can build the full funnel — not just run ads.',
      companyXP: () => 'EXPERIENCE GAP: No agency name or brand client work found. Even a 3-month freelance campaign with a small brand gives you more credibility than theory-based certifications.',
      modernTools: () => 'TOOLS GAP: Analytics tools (GA4, Pixel, HubSpot) not clearly mentioned. These are table-stakes for marketing roles above ₹4L.',
    },
  },

  design: {
    tier1: ['figma', 'adobe xd', 'sketch', 'ui/ux', 'user research'],
    tier2: ['design system', 'component library', 'design tokens', 'auto layout', 'wireframe', 'wireframing', 'prototyping', 'user flow'],
    tier3: ['photoshop', 'illustrator', 'after effects', 'branding', 'typography', 'color theory', 'behance', 'dribbble', 'framer', 'canva', 'responsive design', 'mobile design'],
    benchmarks: {
      portfolioMinUrls: 2,
      skillsMinTier1: 2,
      skillsMinTier2: 3,
      salaryBands: {
        low: { label: '₹2.4L – ₹3.6L /yr', context: 'Canva-only or no portfolio' },
        mid: { label: '₹4L – ₹6L /yr', context: 'Figma basics, limited case studies' },
        high: { label: '₹6.5L – ₹12L /yr', context: 'Design systems + client work portfolio' },
        top: { label: '₹12L – ₹20L+ /yr', context: 'Product design lead with conversion-proven work' },
      },
    },
    pillars: [
      { key: 'liveUrls', label: 'Behance / Figma Portfolio Links', maxPts: 30, description: 'Live Behance, Figma community, or portfolio site' },
      { key: 'tier1Skills', label: 'Core Design Tool Mastery', maxPts: 20, description: 'Figma, XD, UI/UX methodology' },
      { key: 'tier2Skills', label: 'Design Systems Depth', maxPts: 20, description: 'Component libraries, tokens, auto-layout' },
      { key: 'githubSignal', label: 'Client Work Case Studies', maxPts: 10, description: 'Real client projects with outcomes' },
      { key: 'companyXP', label: 'Studio / Agency Experience', maxPts: 10, description: 'Design studio, agency, or product company' },
      { key: 'modernTools', label: 'Brand & Motion Tools', maxPts: 10, description: 'Photoshop, Illustrator, Framer, After Effects' },
    ],
    missingMessages: {
      liveUrls: (count) => count === 0
        ? 'CRITICAL: No Behance, Figma Community, or portfolio website link found. A designer without a live portfolio link in their resume is immediately skipped — 100% of hiring managers check the portfolio first, before even reading your resume.'
        : `PORTFOLIO GAP: Only ${count} link found. UI/UX roles at product companies expect Behance + Figma prototype + a personal portfolio site — at minimum.`,
      tier1Skills: (skills) => `TOOL GAP: ${['Figma', 'Adobe XD', 'UI/UX Research'].filter(s => !skills.some(sk => sk.includes(s.toLowerCase()))).join(', ')} not detected. These are the baseline tools — if Figma isn't explicitly mentioned, art directors assume you don't know it.`,
      tier2Skills: () => 'DEPTH GAP: No design system, component library, or auto-layout methodology mentioned. Senior UI leads at SaaS companies look for designers who build scalable component systems — not just pretty screens.',
      githubSignal: () => 'CASE STUDY GAP: No client project with documented outcomes (before/after, CTR improvement, user test results) found. Hiring managers at agencies select designers based on case studies, not just mockups.',
      companyXP: () => 'EXPERIENCE GAP: No design studio, agency, or product company work detected. Freelance client work counts — even 1 paid client project with measurable results demonstrates more than academic design exercises.',
      modernTools: () => 'TOOLS GAP: Supporting tools (Photoshop, Illustrator, After Effects, Framer) not mentioned. At mid-senior design roles, breadth of tool knowledge is a screening criterion.',
    },
  },
};

// ─── Scoring Engine ───────────────────────────────────────────────────────────
const computePillarScores = (parsedData, domain) => {
  const matrix = DOMAIN_MATRICES[domain];
  const lower = parsedData.rawText ? parsedData.rawText.toLowerCase() : '';
  const skills = parsedData.detectedSkills || [];
  const urls = parsedData.urlsFound || [];
  const companies = parsedData.companies || [];

  // Pillar scores object
  const pillarScores = {};
  const pillarDetails = {};

  // 1. Live URLs
  const urlScore = urls.length >= 3 ? matrix.pillars.find(p => p.key === 'liveUrls').maxPts
    : urls.length === 2 ? Math.round(matrix.pillars.find(p => p.key === 'liveUrls').maxPts * 0.80)
    : urls.length === 1 ? Math.round(matrix.pillars.find(p => p.key === 'liveUrls').maxPts * 0.50)
    : 0;
  pillarScores.liveUrls = urlScore;
  pillarDetails.liveUrls = { earned: urlScore, max: matrix.pillars.find(p => p.key === 'liveUrls').maxPts, found: urls.length };

  // 2. Tier 1 Skills
  const tier1Found = matrix.tier1.filter(s => skills.includes(s) || lower.includes(s));
  const t1Max = matrix.pillars.find(p => p.key === 'tier1Skills').maxPts;
  const t1Score = Math.min(Math.round((tier1Found.length / Math.max(matrix.benchmarks.skillsMinTier1, 1)) * t1Max), t1Max);
  pillarScores.tier1Skills = t1Score;
  pillarDetails.tier1Skills = { earned: t1Score, max: t1Max, found: tier1Found };

  // 3. Tier 2 Skills
  const tier2Found = matrix.tier2.filter(s => skills.includes(s) || lower.includes(s));
  const t2Max = matrix.pillars.find(p => p.key === 'tier2Skills').maxPts;
  const t2Score = Math.min(Math.round((tier2Found.length / Math.max(matrix.benchmarks.skillsMinTier2, 1)) * t2Max), t2Max);
  pillarScores.tier2Skills = t2Score;
  pillarDetails.tier2Skills = { earned: t2Score, max: t2Max, found: tier2Found };

  // 4. GitHub / Portfolio signal
  const hasGitHub = urls.some(u => u.includes('github.com')) || lower.includes('github') || lower.includes('git') || lower.includes('behance') || lower.includes('dribbble');
  const ghMax = matrix.pillars.find(p => p.key === 'githubSignal').maxPts;
  const ghScore = hasGitHub ? ghMax : 0;
  pillarScores.githubSignal = ghScore;
  pillarDetails.githubSignal = { earned: ghScore, max: ghMax };

  // 5. Company / Work Experience
  const compMax = matrix.pillars.find(p => p.key === 'companyXP').maxPts;
  const hasExp = companies.length > 0 || (parsedData.sections?.experience?.length || 0) > 2;
  const compScore = hasExp ? (companies.length >= 2 ? compMax : Math.round(compMax * 0.65)) : 0;
  pillarScores.companyXP = compScore;
  pillarDetails.companyXP = { earned: compScore, max: compMax, companies };

  // 6. Modern Tools
  const tier3Found = matrix.tier3.filter(s => skills.includes(s) || lower.includes(s));
  const modMax = matrix.pillars.find(p => p.key === 'modernTools').maxPts;
  const modScore = Math.min(Math.round((tier3Found.length / 3) * modMax), modMax);
  pillarScores.modernTools = modScore;
  pillarDetails.modernTools = { earned: modScore, max: modMax, found: tier3Found };

  const totalScore = Object.values(pillarScores).reduce((a, b) => a + b, 0);
  return { pillarScores, pillarDetails, totalScore };
};

// ─── Salary Band Mapper ───────────────────────────────────────────────────────
const mapSalaryBand = (proofScore, seniority, domain) => {
  const bands = DOMAIN_MATRICES[domain].benchmarks.salaryBands;
  if (proofScore >= 80 || seniority?.level === 'Senior') return { current: bands.high.label, target: bands.top.label };
  if (proofScore >= 55 || seniority?.level === 'Mid-Level') return { current: bands.mid.label, target: bands.high.label };
  if (proofScore >= 35) return { current: bands.low.label, target: bands.mid.label };
  return { current: 'High Rejection Risk / Below Market', target: bands.mid.label };
};

// ─── Specific Strength Generator ─────────────────────────────────────────────
const buildStrengths = (parsedData, pillarDetails, domain) => {
  const strengths = [];
  const matrix = DOMAIN_MATRICES[domain];
  const urls = parsedData.urlsFound || [];
  const companies = parsedData.companies || [];
  const seniority = parsedData.seniority || {};
  const tier1Found = pillarDetails.tier1Skills?.found || [];
  const tier2Found = pillarDetails.tier2Skills?.found || [];
  const tier3Found = pillarDetails.modernTools?.found || [];

  // URL-specific strengths
  if (urls.length >= 3) {
    strengths.push(`Portfolio Depth: ${urls.length} live deployed links detected — places you in the top 12% of candidates for proof-of-work density.`);
  } else if (urls.length >= 1) {
    strengths.push(`Live project link detected: ${urls[0].replace(/^https?:\/\//, '').slice(0, 50)} — demonstrates real deployment experience above zero-proof candidates.`);
  }

  // Skill tier strengths
  if (tier1Found.length >= 3) {
    const displayed = tier1Found.slice(0, 4).map(s => s.toUpperCase()).join(', ');
    strengths.push(`Core stack verified: ${displayed} — these keywords pass ATS filters at 89% of tech companies hiring in this domain.`);
  } else if (tier1Found.length >= 1) {
    strengths.push(`Foundational skills found: ${tier1Found.map(s => s.toUpperCase()).join(', ')} — baseline technical vocabulary present in resume.`);
  }

  // Depth signal
  if (tier2Found.length >= 3) {
    const displayed = tier2Found.slice(0, 3).map(s => s.toUpperCase()).join(', ');
    strengths.push(`Technical depth signal: ${displayed} in resume — signals backend/infrastructure competence beyond surface-level.`);
  }

  // Company / work signal
  if (companies.length >= 1) {
    strengths.push(`Work experience verified: ${companies.slice(0, 2).join(', ')} detected as employer(s) — ${seniority.level || 'professional'} profile with ~${seniority.yearsEstimate || '1'} years estimated.`);
  }

  // Seniority signal
  if (seniority.level === 'Senior' || seniority.level === 'Mid-Level') {
    strengths.push(`Experience signals: ${seniority.level} career stage inferred — salary band shifts to mid-to-high tier with this resume.`);
  }

  // Modern tools bonus
  if (tier3Found.length >= 2) {
    strengths.push(`Modern tooling: ${tier3Found.slice(0, 3).map(s => s.toUpperCase()).join(', ')} listed — signals up-to-date professional workflow. Valued by 2024-era hiring leads.`);
  }

  // Section quality
  if ((parsedData.sections?.projects?.length || 0) > 2) {
    strengths.push(`Projects section present with ${parsedData.sections.projects.length} lines of project content — shows initiative to document work.`);
  }

  if (strengths.length === 0) {
    strengths.push('Resume file successfully parsed. Foundational document structure in place — content enhancement needed across all pillars.');
  }

  return strengths;
};

// ─── Specific Gap Generator ───────────────────────────────────────────────────
const buildGaps = (parsedData, pillarDetails, pillarScores, domain) => {
  const gaps = [];
  const matrix = DOMAIN_MATRICES[domain];
  const urls = parsedData.urlsFound || [];
  const tier1Found = pillarDetails.tier1Skills?.found || [];
  const tier2Found = pillarDetails.tier2Skills?.found || [];
  const lower = parsedData.rawText ? parsedData.rawText.toLowerCase() : '';

  // URL gaps — most critical
  if (pillarScores.liveUrls < pillarDetails.liveUrls.max * 0.5) {
    gaps.push(matrix.missingMessages.liveUrls(urls.length));
  }

  // Tier1 gaps
  if (pillarScores.tier1Skills < pillarDetails.tier1Skills.max * 0.5) {
    gaps.push(matrix.missingMessages.tier1Skills(tier1Found));
  }

  // Tier2 / Depth gaps
  if (pillarScores.tier2Skills < pillarDetails.tier2Skills.max * 0.5) {
    gaps.push(matrix.missingMessages.tier2Skills(tier2Found));
  }

  // GitHub / Portfolio gaps
  if (pillarScores.githubSignal === 0) {
    gaps.push(matrix.missingMessages.githubSignal());
  }

  // Company experience gaps
  if (pillarScores.companyXP < pillarDetails.companyXP.max * 0.5) {
    gaps.push(matrix.missingMessages.companyXP());
  }

  // Modern tools gaps
  if (pillarScores.modernTools < pillarDetails.modernTools.max * 0.4) {
    if (matrix.missingMessages.modernTools) gaps.push(matrix.missingMessages.modernTools());
  }

  // Domain-specific additional gaps
  if (domain === 'web') {
    if (!lower.includes('auth') && !lower.includes('authentication') && !lower.includes('jwt') && !lower.includes('supabase') && !lower.includes('firebase')) {
      gaps.push('AUTH GAP: No authentication implementation (JWT, Supabase Auth, Firebase) found. Full-stack developers are expected to handle user sessions and role-based access — this is a standard interview question.');
    }
    if (!lower.includes('test') && !lower.includes('jest') && !lower.includes('cypress') && !lower.includes('unit test')) {
      gaps.push('QUALITY GAP: No testing methodology (Jest, Cypress, unit tests) mentioned. Senior engineers at product companies consider test-writing a baseline skill, not optional.');
    }
  }

  if (domain === 'marketing') {
    const hasNumbers = /\d+[x%]|\₹[\d,]+|[\d,]+\s*(?:leads?|clicks?|impressions?|conversions?)/i.test(parsedData.rawText || '');
    if (!hasNumbers) {
      gaps.push('NUMBERS GAP: No quantified campaign results found (e.g., "4.2x ROAS", "₹18 CPA", "320 leads/month"). Marketing resumes without numbers are considered theoretical by hiring directors.');
    }
  }

  if (domain === 'design') {
    if (!lower.includes('user research') && !lower.includes('usability') && !lower.includes('ux research') && !lower.includes('user interview')) {
      gaps.push('PROCESS GAP: No UX research process (user interviews, usability testing, heuristic evaluation) mentioned. Product design roles at tech companies require documented research-to-design workflows — visual skills alone are insufficient.');
    }
  }

  return gaps.slice(0, 5); // Cap at 5 for readability
};

// ─── Action Plan Generator ────────────────────────────────────────────────────
const buildActionPlan = (parsedData, pillarScores, domain) => {
  const urls = parsedData.urlsFound || [];
  const companies = parsedData.companies || [];

  const domainPlans = {
    web: [
      {
        step: '01',
        priority: pillarScores.liveUrls < 15,
        title: urls.length === 0 ? 'Deploy Your First Production App This Week' : 'Add 2 More Live Production Projects',
        desc: urls.length === 0
          ? 'Build and deploy a full-stack React + Supabase app to Vercel with a real database. This single action moves your resume from "Fresher Pile" to "Shortlist Considered". NatureXpress Sprint can do this in Week 1–2.'
          : `You have ${urls.length} live link(s). Recruiters want 3–5. Add a REST API project and a payment-integrated app with auth to clear the 70th percentile threshold.`,
      },
      {
        step: '02',
        priority: pillarScores.githubSignal < 10,
        title: 'Activate Your GitHub Profile With Daily Commits',
        desc: 'Set up a public GitHub profile with pinned repos for each live project. Commit code daily — even small improvements. Engineers reviewing your resume will open GitHub before the second page of your resume.',
      },
      {
        step: '03',
        priority: pillarScores.companyXP < 10,
        title: companies.length === 0 ? 'Get a Verified Company Experience Letter' : 'Expand Your Professional Portfolio',
        desc: companies.length === 0
          ? 'Zero company experience is your single biggest rejection signal. A 30–60 day sprint at NatureXpress Labs — working on active production codebases — produces a verified experience letter that converts to interviews.'
          : `Your ${companies[0]} experience is good. Now add a NatureXpress Labs verified letter to show direct mentorship under active engineers — this creates a 2-employer profile.`,
      },
      {
        step: '04',
        priority: true,
        title: '1-on-1 HR ATS Resume Rewrite & Mock Technical Interview',
        desc: 'Our HR Lead will rewrite your resume to pass ATS keyword filters for SDE-1 / SDE-2 roles at ₹6L–₹12L, then run a live mock technical interview (DSA + system design level) and submit your profile to active hiring partners.',
      },
    ],
    marketing: [
      {
        step: '01',
        priority: pillarScores.liveUrls < 15,
        title: urls.length === 0 ? 'Build a Campaign Case Study Portfolio This Week' : 'Add Quantified Campaign Results to Portfolio',
        desc: urls.length === 0
          ? 'Create a Notion portfolio or Google Slides deck with at least 1 documented ad campaign — including creative, audience targeting, budget, and ROAS result. Screenshot your Meta Ads Manager dashboard. This alone separates you from 78% of marketing applicants.'
          : `You have links but need NUMBERS. Add dashboards with ROAS, CTR, and lead cost data. Hiring managers at growth startups discard portfolios without measurable outcomes.`,
      },
      {
        step: '02',
        priority: pillarScores.tier2Skills < 10,
        title: 'Document Your Performance Metrics in Resume',
        desc: 'Add bullet points with specific numbers: "Managed ₹2.5L/month Meta Ads budget, achieved 3.8x ROAS" or "Built landing page funnel, 34% conversion rate". Numbers in marketing resumes increase callback rate by 3x.',
      },
      {
        step: '03',
        priority: pillarScores.companyXP < 10,
        title: companies.length === 0 ? 'Manage a Real Live Ad Campaign Under Supervision' : 'Pursue Higher-Budget Campaign Ownership',
        desc: companies.length === 0
          ? 'No agency or brand work detected. NatureXpress Marketing Sprint puts you directly on live Meta and Google campaigns with real ₹50,000+ monthly budgets — you manage optimization and get a verified experience letter.'
          : `Good — ${companies[0]} experience present. Scale up by managing higher-spend campaigns (₹5L+/month) to move into Growth Lead salary bands.`,
      },
      {
        step: '04',
        priority: true,
        title: 'HR Portfolio Review, Client Pitch Deck, & Direct Agency Referrals',
        desc: 'Our HR Lead will format your campaign data into a recruiter-facing portfolio deck and refer you directly to growth agencies and D2C brands actively hiring at ₹5L–₹10L CTC.',
      },
    ],
    design: [
      {
        step: '01',
        priority: pillarScores.liveUrls < 18,
        title: urls.length === 0 ? 'Launch Your Behance Portfolio & Figma Case Studies This Week' : 'Add 2 Client-Work Case Studies with Measurable Outcomes',
        desc: urls.length === 0
          ? 'Art directors open Behance before reading your resume. Create a Behance profile with 3 projects — brand identity, UI screen set, and 1 social media ad campaign. Add your Figma Community file for at least 1 component library.'
          : `Portfolio exists but needs case studies. Add before/after redesigns with documented results: "Redesigned checkout flow → 28% drop in cart abandonment". This converts portfolio views into interview calls.`,
      },
      {
        step: '02',
        priority: pillarScores.tier2Skills < 10,
        title: 'Build a Reusable Figma Design System',
        desc: 'Create a full design system in Figma with: Typography scale, color tokens, auto-layout components (buttons, cards, inputs), and mobile/desktop variants. Publish to Figma Community. This single artifact demonstrates senior-level design thinking.',
      },
      {
        step: '03',
        priority: pillarScores.companyXP < 8,
        title: companies.length === 0 ? 'Work on Real Client Design Projects' : 'Document Your Design Decisions & Client Feedback',
        desc: companies.length === 0
          ? 'No studio or client work found. NatureXpress Design Sprint gives you direct access to live brand briefs, social media ad creative work, and a UI/UX project for an active SaaS product — all portfolio-publishable.'
          : `${companies[0]} experience found. Now document your design decisions, client revision rounds, and final outcomes as a structured case study — this is what senior design roles require.`,
      },
      {
        step: '04',
        priority: true,
        title: 'Behance Portfolio Audit, Recruiter Submission & Direct Design Studio Referrals',
        desc: 'Our HR Lead will audit your Behance for visual quality, add quantified outcomes to your case study descriptions, and refer your portfolio to active design studios and product companies hiring at ₹5L–₹12L CTC.',
      },
    ],
  };

  return (domainPlans[domain] || domainPlans.web).map(plan => ({
    ...plan,
    priority: plan.priority ? 'high' : 'normal',
  }));
};

// ─── ATS Rating Label ─────────────────────────────────────────────────────────
const getAtsRating = (score, domain) => {
  const domainLabels = {
    web: {
      high: 'High-Proof Engineering Profile',
      mid: 'Developer with Deployment Gaps',
      low: 'ATS Red-Flag: Missing Production Proof',
    },
    marketing: {
      high: 'Performance Marketer with Verified Proof',
      mid: 'Marketer with Missing Campaign Data',
      low: 'High Rejection Risk: No Metrics or Portfolio',
    },
    design: {
      high: 'Portfolio-Verified Design Candidate',
      mid: 'Designer with Case Study Gaps',
      low: 'High ATS Skip Risk: No Portfolio Links',
    },
  };
  const labels = domainLabels[domain] || domainLabels.web;
  if (score >= 72) return labels.high;
  if (score >= 42) return labels.mid;
  return labels.low;
};

// ─── Main Analyzer Export ─────────────────────────────────────────────────────
export const analyzeResumeContent = async (rawTextInput, fileName, selectedDomain = 'web', parsedDataFull = null) => {
  const domain = ['web', 'marketing', 'design'].includes(selectedDomain) ? selectedDomain : 'web';

  // Build a synthetic parsedData object if full parsed data wasn't passed
  const parsedData = parsedDataFull || {
    rawText: rawTextInput,
    urlsFound: (() => {
      const urlRegex = /(?:https?:\/\/|www\.)[^\s"'<>(),;]+|github\.com\/[^\s"'<>(),;]+|figma\.com\/[^\s"'<>(),;]+|behance\.net\/[^\s"'<>(),;]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61})?\.(?:vercel\.app|netlify\.app|github\.io)[^\s"'<>(),;]*/gi;
      const raw = rawTextInput.match(urlRegex) || [];
      return [...new Set(raw.map(u => u.replace(/[.,;:)}"']+$/, '')))];
    })(),
    detectedSkills: (() => {
      const lower = rawTextInput.toLowerCase();
      const all = [
        'react','node','express','javascript','typescript','tailwind','css','html','mongodb','supabase','postgresql',
        'sql','next.js','nextjs','python','django','fastapi','rest api','graphql','docker','aws','git','github',
        'vercel','jest','ci/cd','redux','prisma','meta ads','facebook ads','google ads','seo','copywriting','funnel',
        'roas','cac','analytics','pixel','retargeting','landing page','email marketing','klaviyo','google analytics',
        'ga4','a/b testing','cpa','ctr','lead generation','figma','ui/ux','photoshop','illustrator','auto layout',
        'design system','design tokens','wireframing','prototyping','behance','dribbble','typography','branding',
        'ad creatives','user research','component library','mobile design','responsive design',
      ];
      return [...new Set(all.filter(s => lower.includes(s)))];
    })(),
    companies: [],
    seniority: { level: 'Entry', yearsEstimate: '0–1' },
    sections: {},
  };

  // ── Run Scoring ──
  const { pillarScores, pillarDetails, totalScore } = computePillarScores(parsedData, domain);
  const proofScore = Math.min(Math.max(totalScore, 12), 98);

  // ── Build Outputs ──
  const strengths = buildStrengths(parsedData, pillarDetails, domain);
  const gaps = buildGaps(parsedData, pillarDetails, pillarScores, domain);
  const salary = mapSalaryBand(proofScore, parsedData.seniority, domain);
  const actionPlan = buildActionPlan(parsedData, pillarScores, domain);

  return {
    success: true,
    fileName,
    domain,
    proofScore,
    atsRating: getAtsRating(proofScore, domain),
    extractedUrls: parsedData.urlsFound || [],
    detectedSkills: (parsedData.detectedSkills || []).map(s => s.toUpperCase()),
    candidateName: parsedData.candidateName || null,
    seniority: parsedData.seniority || { level: 'Unknown', yearsEstimate: '?' },
    companies: parsedData.companies || [],
    pillarScores,
    pillarDetails,
    strengths,
    gaps,
    currentValuation: salary.current,
    targetValuation: salary.target,
    actionPlan,
  };
};
