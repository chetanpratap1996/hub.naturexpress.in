/**
 * Enterprise ATS Resume & Employability Analyzer Engine — NatureXpress Hub
 *
 * Provides institutional-grade audit metrics:
 * - 5-Pillar ATS & Recruiter Score Breakdown (0–100)
 * - Real-time Job Description (JD) & Target Role Keyword Matcher
 * - Measurable Business Impact & Power Action Verbs Diagnostics
 * - Critical Red Flags & Shortlist Signals
 * - Power Verb / Bullet Point Upgrades (Before vs After)
 * - Institutional Market Valuation Trajectory (Current vs Post-Proof)
 * - Personalized 4-Phase Proof-of-Work Action Plan
 */

import { hasKeywordMatch } from './resumeParser';

// ─── Domain Matrices & Target Roles ──────────────────────────────────────────
export const DOMAIN_PROFILES = {
  web: {
    name: 'Web & Software Engineering',
    roles: [
      { id: 'fullstack', label: 'Full-Stack Web Engineer (React + Node + DB)', tier1: ['react', 'node', 'express', 'javascript', 'typescript', 'supabase', 'mongodb', 'postgresql', 'tailwind'], tier2: ['rest api', 'jwt', 'docker', 'aws', 'git', 'github', 'vercel', 'next.js', 'prisma'] },
      { id: 'frontend', label: 'Modern Frontend Engineer (React + Next.js + UI)', tier1: ['react', 'next.js', 'typescript', 'javascript', 'tailwind', 'redux', 'zustand', 'css', 'html'], tier2: ['vite', 'responsive design', 'framer-motion', 'jest', 'rest api', 'git', 'github', 'vercel'] },
      { id: 'backend', label: 'Backend & API Engineer (Node + SQL/NoSQL + Microservices)', tier1: ['node', 'express', 'postgresql', 'mongodb', 'rest api', 'graphql', 'typescript', 'python'], tier2: ['docker', 'aws', 'redis', 'prisma', 'ci/cd', 'jwt', 'git', 'github'] },
    ],
    tier1: ['react', 'node', 'express', 'javascript', 'typescript', 'next.js', 'supabase', 'mongodb', 'postgresql'],
    tier2: ['rest api', 'graphql', 'docker', 'aws', 'git', 'github', 'ci/cd', 'tailwind', 'redux', 'zustand', 'vercel', 'prisma', 'jwt'],
    tier3: ['cursor', 'claude', 'v0.dev', 'ai tools', 'vite', 'jest', 'python', 'fastapi'],
    salaryBands: {
      unverified: { label: '₹2.4L – ₹3.6L /yr', subtitle: 'Fresher / Tutorial Clones / Zero Live Deployments' },
      moderate: { label: '₹4.5L – ₹7.0L /yr', subtitle: 'Basic Projects / Standard Framework Knowledge' },
      verified: { label: '₹8.0L – ₹14.0L /yr', subtitle: 'Verified Live Deployments + Real DB Auth + Production Subdomains' },
      elite: { label: '₹14.0L – ₹25.0L+ /yr', subtitle: 'Full-Stack Architecture + AI-Accelerated DX + Production Ecosystem PRs' },
    },
    bulletUpgrades: [
      {
        before: "Worked on creating user interface using React and CSS.",
        after: "Architected responsive React 19 SPA with Tailwind CSS, reducing bundle load time by 42% and supporting 10,000+ monthly active sessions on Vercel."
      },
      {
        before: "Helped with backend APIs and connected MongoDB database.",
        after: "Engineered scalable RESTful API suite in Node.js/Express with Supabase Auth & PostgreSQL schema indexing, maintaining <80ms response latency."
      },
      {
        before: "Added payment gateway in project.",
        after: "Implemented secure Razorpay webhook architecture with idempotent transaction validation and automated email receipts, processing 100% test-verified checkouts."
      }
    ]
  },

  marketing: {
    name: 'Growth & Performance Digital Marketing',
    roles: [
      { id: 'performance', label: 'Performance Marketer / Media Buyer (Meta & Google Ads)', tier1: ['meta ads', 'facebook ads', 'google ads', 'roas', 'cac', 'ctr', 'cpa', 'meta pixel', 'retargeting'], tier2: ['google analytics', 'ga4', 'custom audience', 'lookalike audience', 'a/b testing', 'landing page', 'conversion rate', 'funnel'] },
      { id: 'growth', label: 'Growth & Funnel Strategist (CRO + Lead Gen + CRM)', tier1: ['funnel', 'landing page', 'conversion rate', 'copywriting', 'lead generation', 'email marketing', 'klaviyo', 'hubspot'], tier2: ['a/b testing', 'meta ads', 'google analytics', 'seo', 'crm', 'retargeting', 'whatsapp marketing', 'cpa'] },
      { id: 'seo_content', label: 'SEO & Content Growth Specialist', tier1: ['seo', 'search engine optimization', 'google analytics', 'ga4', 'keyword research', 'content marketing', 'copywriting'], tier2: ['backlinks', 'technical seo', 'landing page', 'cro', 'sem', 'wordpress', 'cms', 'organic growth'] },
    ],
    tier1: ['meta ads', 'facebook ads', 'google ads', 'seo', 'instagram ads', 'roas', 'cac', 'ctr', 'cpa', 'meta pixel'],
    tier2: ['google analytics', 'ga4', 'a/b testing', 'conversion rate', 'cro', 'retargeting', 'custom audience', 'lookalike audience', 'funnel', 'landing page', 'copywriting'],
    tier3: ['klaviyo', 'mailchimp', 'hubspot', 'crm', 'email marketing', 'whatsapp marketing', 'lead generation'],
    salaryBands: {
      unverified: { label: '₹2.4L – ₹3.6L /yr', subtitle: 'Theory Certifications / Zero Managed Ad Budget' },
      moderate: { label: '₹4.0L – ₹6.5L /yr', subtitle: 'Basic Social Media / Unverified Campaign ROAS' },
      verified: { label: '₹7.0L – ₹12.0L /yr', subtitle: 'Verified Live Ad Spend + Dashboard ROAS Data + Funnel Tracking' },
      elite: { label: '₹12.0L – ₹20.0L+ /yr', subtitle: 'Growth Director Level with ₹50L+ Managed Ad Spend & Multi-channel CRO' },
    },
    bulletUpgrades: [
      {
        before: "Handled Facebook and Instagram ads for brand awareness.",
        after: "Spearheaded Meta Ads campaigns across Advantage+ and retargeting funnels, generating ₹14.5L revenue at 3.8x ROAS with a 24% reduction in CAC."
      },
      {
        before: "Created landing pages and wrote marketing copy.",
        after: "Engineered high-converting direct-response landing page funnels with A/B headline testing, increasing lead conversion rate from 3.2% to 8.7%."
      },
      {
        before: "Managed Google Analytics and monitored traffic.",
        after: "Configured GA4 custom conversion events and Meta Pixel server-side tracking, capturing 99.4% attribution accuracy across 50,000+ monthly visitors."
      }
    ]
  },

  design: {
    name: 'UI/UX & Brand Design',
    roles: [
      { id: 'uiux', label: 'UI/UX Product Designer (Figma + Systems + Prototyping)', tier1: ['figma', 'ui/ux', 'design system', 'auto layout', 'wireframe', 'prototyping', 'user research', 'user flow'], tier2: ['responsive design', 'mobile design', 'component library', 'design tokens', 'usability testing', 'information architecture', 'behance'] },
      { id: 'brand_ad', label: 'Brand & Performance Creative Designer', tier1: ['photoshop', 'illustrator', 'branding', 'brand identity', 'typography', 'color theory', 'ad creatives', 'figma'], tier2: ['after effects', 'social media design', 'carousels', 'banners', 'visual design', 'canva', 'behance', 'dribbble'] },
      { id: 'design_sys', label: 'Design Systems & Interactive Specialist', tier1: ['design system', 'component library', 'design tokens', 'auto layout', 'figma', 'framer', 'ui/ux'], tier2: ['responsive design', 'prototyping', 'user research'] },
    ],
    tier1: ['figma', 'adobe xd', 'sketch', 'ui/ux', 'user research', 'design system', 'component library', 'design tokens', 'auto layout', 'prototyping'],
    tier2: ['wireframe', 'wireframing', 'user flow', 'information architecture', 'usability testing', 'photoshop', 'illustrator', 'branding', 'typography', 'responsive design'],
    tier3: ['after effects', 'framer', 'behance', 'dribbble', 'ad creatives', 'color theory', 'mobile design'],
    salaryBands: {
      unverified: { label: '₹2.4L – ₹3.6L /yr', subtitle: 'Canva Mockups / Static Screens / No Design System Tokens' },
      moderate: { label: '₹4.0L – ₹6.0L /yr', subtitle: 'Basic Figma Screens / Missing Measurable Client Case Studies' },
      verified: { label: '₹6.5L – ₹12.0L /yr', subtitle: 'Verified Figma Component Systems + Live Behance Case Studies + UX Metrics' },
      elite: { label: '₹12.0L – ₹20.0L+ /yr', subtitle: 'Lead Product Designer with Production SaaS Design Systems & High-CTR Ad Assets' },
    },
    bulletUpgrades: [
      {
        before: "Designed screens for mobile application in Figma.",
        after: "Architected end-to-end 32-screen mobile SaaS application in Figma with responsive auto-layout, interactive prototype, and tokenized design system."
      },
      {
        before: "Made social media posters and graphics.",
        after: "Crafted 40+ performance ad creatives and viral carousels, driving a 34% lift in click-through rate (CTR) and ₹18 cost-per-lead for brand clients."
      },
      {
        before: "Worked with developers on design handoff.",
        after: "Structured scalable Figma component library with variants, state properties, and developer documentation, cutting sprint design-to-code time by 50%."
      }
    ]
  }
};

// ─── 1-Click Sample Resumes for Quick Testing ─────────────────────────────────
export const SAMPLE_RESUMES = {
  web: {
    title: "Aman Verma (SDE-1 Fresher)",
    fileName: "Aman_Verma_SDE1_Resume.pdf",
    rawText: `AMAN VERMA
Email: aman.verma@example.com | Phone: +91 9876543210
Location: Indore, Madhya Pradesh | LinkedIn: linkedin.com/in/amanverma

OBJECTIVE
Motivated Computer Science graduate looking for an entry-level software developer role in a reputed company where I can apply my programming skills.

EDUCATION
B.Tech in Computer Science & Engineering (2020 - 2024) - RGPV University - CGPA: 7.8/10

TECHNICAL SKILLS
- Languages: JavaScript, HTML5, CSS3, C++, Java Basics
- Frameworks & Libraries: React, Express, Node.js basics
- Databases: MongoDB, MySQL
- Tools: Git, VS Code, Postman

PROJECTS
1. E-Commerce Clone Project
- Worked on frontend using React and CSS.
- Helped with backend APIs and connected MongoDB database.
- Created product catalog and user login page.

2. Weather Forecast Web App
- Built a weather web app using HTML, CSS, and Vanilla JavaScript.
- Fetched data from free OpenWeatherMap public API.
- Displayed temperature and weather conditions for searched cities.

3. Todo List Application
- Developed a Todo application with React state hooks.
- Implemented add, delete, and mark-as-complete tasks stored in localStorage.

EXPERIENCE
Academic Projects & College Coding Club Member (2023 - 2024)
- Participated in college hackathons and assisted with web development workshops.`,
  },

  marketing: {
    title: "Priya Sharma (Growth Marketer)",
    fileName: "Priya_Sharma_Marketing_Resume.pdf",
    rawText: `PRIYA SHARMA
Email: priya.sharma@example.com | Phone: +91 9823456789
Location: Bhopal, MP | LinkedIn: linkedin.com/in/priyasharma

CAREER SUMMARY
Enthusiastic digital marketing executive with certified skills in social media and online advertising. Looking to drive brand engagement for growing startups.

CORE SKILLS
- Digital Marketing, Social Media Marketing, Content Creation, SEO basics
- Meta Ads, Facebook Ads Manager, Instagram Growth
- Google Analytics, Canva, Mailchimp, Copywriting

CERTIFICATIONS
- Google Digital Garage Certification
- HubSpot Inbound Marketing Certified
- Meta Certified Digital Marketing Associate

PROJECTS & EXPERIENCE
Digital Marketing Intern - Local Retail Brand (3 Months)
- Handled Facebook and Instagram ads for brand awareness.
- Created social media posters and graphics using Canva.
- Managed social media calendar and monitored engagement.
- Created landing pages and wrote marketing copy for promotional offers.

College Event Marketing Lead
- Promoted annual college fest on Instagram and WhatsApp groups.
- Assisted in increasing event registrations through social media posts.`,
  },

  design: {
    title: "Rohan Mehta (UI/UX Designer)",
    fileName: "Rohan_Mehta_UIUX_Resume.pdf",
    rawText: `ROHAN MEHTA
Email: rohan.design@example.com | Phone: +91 9912345678
Location: Indore, India | Portfolio: rohanmehta.myportfolio.com

PROFESSIONAL SUMMARY
Creative UI/UX & Graphic Designer passionate about crafting visually appealing user interfaces, mobile apps, and brand marketing creatives.

SKILLS
- UI/UX Design, Wireframing, Prototyping
- Figma, Adobe XD, Adobe Photoshop, Adobe Illustrator, Canva
- Responsive Web Design, Mobile App UI, Typography, Color Palette Selection

EXPERIENCE & PROJECTS
Freelance Graphic Designer (2023 - Present)
- Designed posters, banners, and social media graphics for small local businesses.
- Created logo and brand assets for a local food delivery startup.

Food Delivery App UI Concept (Figma)
- Designed screens for mobile application in Figma.
- Created wireframes, typography guide, and interactive screen transitions.
- Designed checkout screen and order confirmation modal.

Gym Fitness Landing Page
- Designed responsive desktop and mobile landing page concept.
- Worked with developers on design handoff and asset exports.`,
  }
};

// ─── 5-Pillar Scoring Calculation ─────────────────────────────────────────────
export const computeAuditScoring = (parsedData, domain = 'web', targetRoleId = null, customJobDesc = '') => {
  const profile = DOMAIN_PROFILES[domain] || DOMAIN_PROFILES.web;
  const rawText = parsedData.rawText || '';
  const lower = rawText.toLowerCase();
  const urls = parsedData.urlsFound || [];
  const skills = parsedData.detectedSkills || [];
  const companies = parsedData.companies || [];
  const actionVerbs = parsedData.actionVerbs || { powerVerbs: [], weakVerbs: [], powerScore: 30 };
  const metrics = parsedData.metrics || { metricsFound: [], count: 0, score: 20 };
  const formatHealth = parsedData.formatHealth || { hygieneScore: 50, issues: [] };

  // Determine active target role
  const selectedRole = profile.roles.find(r => r.id === targetRoleId) || profile.roles[0];
  const targetTier1 = selectedRole.tier1;
  const targetTier2 = selectedRole.tier2;

  // ── Pillar 1: Production Proof & Live Deployment Density (Max 30 Pts) ──
  let p1Earned = 0;
  const p1Max = 30;
  const liveDeploymentUrls = urls.filter(u => 
    /vercel\.app|netlify\.app|github\.io|web\.app|aws|behance\.net|figma\.com|dribbble\.com/i.test(u) ||
    (!u.includes('linkedin.com') && !u.includes('mailto:'))
  );
  
  if (liveDeploymentUrls.length >= 3) p1Earned += 20;
  else if (liveDeploymentUrls.length === 2) p1Earned += 14;
  else if (liveDeploymentUrls.length === 1) p1Earned += 8;
  else p1Earned += 0; // ZERO PROOF CRITICAL GAP

  const hasGitHub = urls.some(u => u.includes('github.com')) || hasKeywordMatch(rawText, 'github') || hasKeywordMatch(rawText, 'git');
  const hasFigmaOrBehance = urls.some(u => u.includes('figma.com') || u.includes('behance.net')) || hasKeywordMatch(rawText, 'behance') || hasKeywordMatch(rawText, 'figma');
  const hasLiveProof = domain === 'web' ? hasGitHub : domain === 'design' ? hasFigmaOrBehance : (urls.length >= 1 || hasKeywordMatch(rawText, 'dashboard') || hasKeywordMatch(rawText, 'roas'));
  if (hasLiveProof) p1Earned += 10;

  // ── Pillar 2: Core Stack & ATS Keyword Match (Max 25 Pts) ──
  const p2Max = 25;
  const matchedTier1 = targetTier1.filter(k => skills.includes(k) || hasKeywordMatch(rawText, k));
  const missingTier1 = targetTier1.filter(k => !matchedTier1.includes(k));
  const matchedTier2 = targetTier2.filter(k => skills.includes(k) || hasKeywordMatch(rawText, k));
  const missingTier2 = targetTier2.filter(k => !matchedTier2.includes(k));

  const t1Ratio = matchedTier1.length / Math.max(targetTier1.length, 1);
  const t2Ratio = matchedTier2.length / Math.max(targetTier2.length, 1);
  const p2Earned = Math.min(Math.round((t1Ratio * 16) + (t2Ratio * 9)), p2Max);

  // ── Pillar 3: Measurable Business Impact & ROI Metrics (Max 15 Pts) ──
  const p3Max = 15;
  let p3Earned = 0;
  if (metrics.count >= 4) p3Earned = 15;
  else if (metrics.count >= 2) p3Earned = 10;
  else if (metrics.count >= 1) p3Earned = 5;
  else p3Earned = 2;

  // ── Pillar 4: Action & Power Verb Strength (Max 15 Pts) ──
  const p4Max = 15;
  const p4Earned = Math.min(Math.round((actionVerbs.powerScore / 100) * p4Max), p4Max);

  // ── Pillar 5: ATS Formatting & Document Hygiene (Max 15 Pts) ──
  const p5Max = 15;
  const p5Earned = Math.min(Math.round((formatHealth.hygieneScore / 100) * p5Max), p5Max);

  // Total Score
  const totalScore = Math.min(Math.max(p1Earned + p2Earned + p3Earned + p4Earned + p5Earned, 14), 98);

  // Custom Job Description Keyword Matcher
  let customJdMatch = null;
  if (customJobDesc && customJobDesc.trim().length > 30) {
    const allDomainKeywords = [...targetTier1, ...targetTier2, ...profile.tier3];
    const extractedJdKeywords = [...new Set(allDomainKeywords.filter(k => hasKeywordMatch(customJobDesc, k)))];
    
    if (extractedJdKeywords.length > 0) {
      const foundInResume = extractedJdKeywords.filter(k => hasKeywordMatch(rawText, k) || skills.includes(k));
      const missingFromResume = extractedJdKeywords.filter(k => !foundInResume.includes(k));
      const matchPercentage = Math.round((foundInResume.length / extractedJdKeywords.length) * 100);
      
      customJdMatch = {
        totalJdKeywordsCount: extractedJdKeywords.length,
        matchPercentage,
        foundInResume,
        missingFromResume
      };
    }
  }

  // ── Grade & Verdict ──
  let grade = 'D';
  let atsStatus = 'High Rejection Risk (<40% ATS Pass Rate)';
  let statusColor = 'rose';
  let badgeLabel = 'Critical Proof Gap';

  if (totalScore >= 80) {
    grade = 'A+';
    atsStatus = 'Top 5% Recruiter Shortlist Ready';
    statusColor = 'emerald';
    badgeLabel = 'Production Verified';
  } else if (totalScore >= 65) {
    grade = 'B+';
    atsStatus = 'Moderate Shortlist Probability (Requires Deployment Polish)';
    statusColor = 'indigo';
    badgeLabel = 'Competitive Profile';
  } else if (totalScore >= 45) {
    grade = 'C';
    atsStatus = 'ATS Red-Flag: Missing Production Proof & Metrics';
    statusColor = 'amber';
    badgeLabel = 'Needs Proof Overhaul';
  }

  // ── Critical Gaps & Red Flags ──
  const gaps = [];
  if (p1Earned < 15) {
    gaps.push({
      pillar: 'Proof Density',
      severity: 'CRITICAL',
      title: 'Zero Live Production Deployed Subdomains',
      desc: 'Tech directors and hiring managers screening resumes skip 88% of applicants who do not have live Vercel/AWS URLs with functional backend databases.'
    });
  }
  if (missingTier1.length >= 2) {
    gaps.push({
      pillar: 'ATS Keywords',
      severity: 'HIGH',
      title: `Missing Core Mandatory Stack: ${missingTier1.slice(0, 4).join(', ').toUpperCase()}`,
      desc: `Automated ATS screening filters for "${selectedRole.label}" require exact matches for these primary industry tools.`
    });
  }
  if (metrics.count < 2) {
    gaps.push({
      pillar: 'ROI & Impact',
      severity: 'HIGH',
      title: 'Zero Quantified Outcomes or Business Metrics',
      desc: 'Bullet points without measurable proof (%, ₹/$, scale, speed, ROAS) read like generic job descriptions rather than verified engineering/marketing achievements.'
    });
  }
  if (actionVerbs.weakVerbs.length > 0) {
    gaps.push({
      pillar: 'Action Verbs',
      severity: 'MEDIUM',
      title: `Passive Phrasing Detected: "${actionVerbs.weakVerbs.slice(0, 3).join('", "')}"`,
      desc: 'Replace passive phrases like "worked on" or "helped with" with high-impact power verbs like "Architected", "Spearheaded", or "Optimized".'
    });
  }
  if (companies.length === 0 && (parsedData.sections?.experience?.length || 0) < 2) {
    gaps.push({
      pillar: 'Experience Credential',
      severity: 'CRITICAL',
      title: 'No Verified Tech Lab / Company Experience Letter',
      desc: 'Having a verified experience letter from an active production codebase moves your application out of the 10,000+ unverified fresher pile.'
    });
  }

  // ── Profile Strengths ──
  const strengths = [];
  if (liveDeploymentUrls.length >= 1) {
    strengths.push(`Live production link detected: ${liveDeploymentUrls[0].replace(/^https?:\/\//, '').slice(0, 45)} — demonstrates real deployment experience above zero-proof applicants.`);
  }
  if (matchedTier1.length >= 2) {
    strengths.push(`Core stack keywords verified: ${matchedTier1.slice(0, 5).join(', ').toUpperCase()} matches standard ATS job taxonomy.`);
  }
  if (metrics.count >= 2) {
    strengths.push(`Quantifiable metric signals found: "${metrics.metricsFound.slice(0, 3).join('", "')}" provides tangible outcome proof.`);
  }
  if (actionVerbs.powerVerbs.length >= 3) {
    strengths.push(`Strong action verb orientation: ${actionVerbs.powerVerbs.slice(0, 4).join(', ')} creates scannable recruiter momentum.`);
  }
  if (formatHealth.hasProjectsSection && formatHealth.hasSkillsSection) {
    strengths.push(`Clean structural hierarchy: Dedicated Projects & Skills sections detected.`);
  }
  if (strengths.length === 0) {
    strengths.push(`Document successfully parsed. Ready for 4-phase proof-of-work enhancement.`);
  }

  // ── Valuation ──
  const valuation = totalScore >= 75
    ? { current: profile.salaryBands.verified.label, target: profile.salaryBands.elite.label }
    : totalScore >= 50
    ? { current: profile.salaryBands.moderate.label, target: profile.salaryBands.verified.label }
    : { current: profile.salaryBands.unverified.label, target: profile.salaryBands.verified.label };

  // ── 4-Phase Action Roadmap ──
  const roadmap = [
    {
      phase: 'Phase 01',
      duration: 'Week 1-2',
      title: domain === 'web' ? 'Deploy 2+ Live Full-Stack Production Systems' : domain === 'marketing' ? 'Launch Verified Live Ad Campaign with ROAS Dashboard' : 'Publish Figma Tokenized Design System & Behance Case Study',
      desc: domain === 'web'
        ? 'Build and deploy real apps to custom subdomains with Supabase Auth, PostgreSQL schema, and Tailwind UI. This immediately resolves your #1 ATS rejection risk.'
        : domain === 'marketing'
        ? 'Configure live Meta & Google Ads campaigns with server-side Pixel tracking, custom conversion events, and documented ROAS proof.'
        : 'Create a reusable design system in Figma with auto-layout tokens and publish interactive Behance case studies with documented conversion impacts.'
    },
    {
      phase: 'Phase 02',
      duration: 'Week 3-4',
      title: domain === 'web' ? 'Integrate Database Auth, Payment Webhooks & AI Tooling' : domain === 'marketing' ? 'Architect High-Converting Direct-Response Funnels' : 'Build Multi-Screen SaaS Product Flow & Ad Creatives',
      desc: domain === 'web'
        ? 'Master AI workflows (Cursor, Claude) to code 5x faster, add Razorpay payment gates, and achieve <100ms API response latency.'
        : domain === 'marketing'
        ? 'Write direct-response psychological copy, A/B test hook variations, and configure GA4 funnel analytics.'
        : 'Design high-CTR viral carousels, responsive mobile application screens, and structured developer handoff specs.'
    },
    {
      phase: 'Phase 03',
      duration: 'Week 5-6',
      title: 'Ecosystem Production PRs & Verified Experience Credential',
      desc: 'Contribute verified pull requests (PRs) to active ecosystem codebases and receive a verified Experience Letter from NatureXpress Tech Labs.'
    },
    {
      phase: 'Phase 04',
      duration: 'Week 7-8',
      title: '1-on-1 HR ATS Resume Overhaul & Direct Talent Referrals',
      desc: 'Our Talent Director personally rewrites your resume for 95%+ ATS keyword density, conducts live mock technical interviews, and routes your verified portfolio directly to hiring partners.'
    }
  ];

  return {
    totalScore,
    grade,
    atsStatus,
    statusColor,
    badgeLabel,
    domain,
    selectedRole,
    allRoles: profile.roles,
    pillars: [
      { key: 'proof', label: 'Production Proof & Live Deployments', earned: p1Earned, max: p1Max, pct: Math.round((p1Earned / p1Max) * 100), desc: `${liveDeploymentUrls.length} live deployed links detected` },
      { key: 'keywords', label: 'Mandatory ATS Tech Stack Keywords', earned: p2Earned, max: p2Max, pct: Math.round((p2Earned / p2Max) * 100), desc: `${matchedTier1.length}/${targetTier1.length} core keywords present` },
      { key: 'metrics', label: 'Measurable ROI & Quantified Impact', earned: p3Earned, max: p3Max, pct: Math.round((p3Earned / p3Max) * 100), desc: `${metrics.count} measurable metric signals found` },
      { key: 'verbs', label: 'Action & Impact Power Verbs', earned: p4Earned, max: p4Max, pct: Math.round((p4Earned / p4Max) * 100), desc: `${actionVerbs.powerVerbs.length} power action verbs detected` },
      { key: 'hygiene', label: 'ATS Parseability & Format Hygiene', earned: p5Earned, max: p5Max, pct: Math.round((p5Earned / p5Max) * 100), desc: `${formatHealth.wordCount} words · ${formatHealth.issues.length} format warnings` },
    ],
    keywordBreakdown: {
      matchedTier1: matchedTier1.map(k => k.toUpperCase()),
      missingTier1: missingTier1.map(k => k.toUpperCase()),
      matchedTier2: matchedTier2.map(k => k.toUpperCase()),
      missingTier2: missingTier2.map(k => k.toUpperCase()),
    },
    customJdMatch,
    gaps,
    strengths,
    bulletUpgrades: profile.bulletUpgrades,
    valuation,
    roadmap,
    extractedUrls: urls,
    detectedSkills: skills.map(s => s.toUpperCase()),
    candidateName: parsedData.candidateName,
    candidateEmail: parsedData.email,
    candidatePhone: parsedData.phone,
    seniority: parsedData.seniority,
    companies: parsedData.companies,
    formatHealth,
    actionVerbs,
  };
};
