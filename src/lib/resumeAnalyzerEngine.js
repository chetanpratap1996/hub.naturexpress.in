/**
 * Deep Resume Analyzer Engine & Gemini API Integration
 * Conducts multi-point ATS screening, proof density analysis, gap identification,
 * and market compensation estimation for Web Dev, Digital Marketing, and UI/UX Design candidates.
 */

export const analyzeResumeContent = async (fileText, fileName, selectedDomain = 'web') => {
  const lowercaseText = fileText.toLowerCase();

  // 1. Extract Links & Portfolios
  const urlRegex = /(https?:\/\/[^\s"'>]+|github\.com\/[^\s"'>]+|figma\.com\/[^\s"'>]+|behance\.net\/[^\s"'>]+|[a-zA-Z0-9-]+\.(vercel|netlify)\.app)/gi;
  const rawUrls = fileText.match(urlRegex) || [];
  const uniqueUrls = [...new Set(rawUrls)].map(u => u.replace(/[.,;)]$/, ''));

  // 2. Domain-Specific Skill Dictionaries
  const domainSkills = {
    web: [
      'react', 'node', 'express', 'javascript', 'typescript', 'tailwind', 'css',
      'html', 'mongodb', 'supabase', 'postgresql', 'sql', 'next.js', 'nextjs',
      'python', 'django', 'fastapi', 'rest api', 'graphql', 'docker', 'aws',
      'git', 'github', 'vercel', 'jest', 'ci/cd', 'redux', 'prisma'
    ],
    marketing: [
      'meta ads', 'facebook ads', 'google ads', 'seo', 'copywriting', 'funnel',
      'roas', 'cac', 'analytics', 'pixel', 'custom audience', 'retargeting',
      'landing page', 'email marketing', 'klaviyo', 'google analytics', 'ga4',
      'conversion rate', 'a/b testing', 'cpa', 'ctr', 'lead generation'
    ],
    design: [
      'figma', 'ui/ux', 'photoshop', 'illustrator', 'auto layout', 'design system',
      'design tokens', 'wireframing', 'prototyping', 'behance', 'dribbble',
      'typography', 'branding', 'ad creatives', 'user research', 'component library',
      'user flows', 'mobile design', 'responsive design'
    ]
  };

  const currentDomainSkills = domainSkills[selectedDomain] || domainSkills.web;
  const detectedSkills = currentDomainSkills.filter(skill => lowercaseText.includes(skill));

  // Also check cross-domain skills
  const allSkills = [...domainSkills.web, ...domainSkills.marketing, ...domainSkills.design];
  const totalDetectedAll = [...new Set(allSkills.filter(skill => lowercaseText.includes(skill)))];

  // 3. Compute Deep Metrics
  const hasLiveUrls = uniqueUrls.length > 0;
  const urlCount = uniqueUrls.length;
  const skillCount = detectedSkills.length;

  // Proof Density Score (0 - 100)
  let proofScore = 30;
  if (urlCount >= 3) proofScore += 35;
  else if (urlCount >= 1) proofScore += 20;

  if (skillCount >= 6) proofScore += 35;
  else if (skillCount >= 3) proofScore += 20;
  else proofScore += 10;

  proofScore = Math.min(proofScore, 98);

  // 4. Identify Specific Candidate Strengths
  const strengths = [];
  if (urlCount > 0) strengths.push(`Found ${urlCount} Live Portfolio / Deployed URLs (${uniqueUrls[0]})`);
  if (skillCount >= 4) strengths.push(`Strong core stack match: ${detectedSkills.slice(0, 4).map(s => s.toUpperCase()).join(', ')}`);
  if (lowercaseText.includes('git') || lowercaseText.includes('figma') || lowercaseText.includes('ads')) {
    strengths.push("Demonstrates familiarity with modern industry tools");
  }
  if (fileText.length > 1500) strengths.push("Comprehensive documentation of past projects & responsibilities");

  if (strengths.length === 0) strengths.push("Basic resume structure present");

  // 5. Identify Critical Employability Gaps (Why HR / Clients Reject)
  const gaps = [];
  if (urlCount === 0) {
    gaps.push("CRITICAL GAP: Zero live deployed URLs or portfolio links found. ATS filters flag this as 'unverified theory'.");
  } else if (urlCount === 1) {
    gaps.push("MODERATE GAP: Only 1 live link detected. Top tech leads look for 3+ production deploys.");
  }

  if (selectedDomain === 'web' && !lowercaseText.includes('git') && !lowercaseText.includes('github')) {
    gaps.push("MISSING PILLAR: No Git / GitHub commit history mentioned. Required for engineering screening.");
  }

  if (selectedDomain === 'marketing' && !lowercaseText.includes('roas') && !lowercaseText.includes('cac')) {
    gaps.push("MISSING PILLAR: No verified ROAS or CAC metric proof. Growth directors reject resumes without conversion data.");
  }

  if (selectedDomain === 'design' && !lowercaseText.includes('figma') && !lowercaseText.includes('design system')) {
    gaps.push("MISSING PILLAR: No Figma design system or component library tokens referenced.");
  }

  if (skillCount < 4) {
    gaps.push("KEYWORD DENSITY: Low technical keyword density. Risk of getting filtered out by automated ATS scanners.");
  }

  // 6. Market Valuation & Potential Estimate
  let currentValuation = "₹3L – ₹4.5L / yr";
  let targetValuation = "₹8L – ₹14L+ / yr";

  if (proofScore >= 75) {
    currentValuation = "₹6L – ₹8L / yr";
    targetValuation = "₹12L – ₹18L+ / yr";
  } else if (proofScore < 40) {
    currentValuation = "Unverified / High Rejection Risk";
    targetValuation = "₹6L – ₹10L / yr (with 30-Day Sprint)";
  }

  // 7. Custom 4-Step Action Plan
  const actionPlan = [
    { step: "01", title: "Deploy Live Production Assets", desc: selectedDomain === 'web' ? "Deploy 3 full-stack apps with DB & Auth to Vercel/AWS" : selectedDomain === 'marketing' ? "Configure live Meta/Google ad campaigns with pixel tracking" : "Build Figma component systems with interactive prototypes" },
    { step: "02", title: "Establish 90-Day Proof History", desc: selectedDomain === 'web' ? "Maintain daily green Git commits and submit PR reviews" : selectedDomain === 'marketing' ? "Build direct-response landing page funnels with ROAS proof" : "Design high-CTR social media ad graphics and carousels" },
    { step: "03", title: "Obtain Verified Experience Letter", desc: "Get peer-reviewed code/design audits from active NatureXpress Labs leads" },
    { step: "04", title: "Direct Referral Placement", desc: "Fast-track application to hiring partners and high-ticket client contracts" }
  ];

  return {
    success: true,
    fileName,
    domain: selectedDomain,
    proofScore,
    atsRating: proofScore >= 75 ? "Verified High-Proof Candidate" : proofScore >= 45 ? "Practitioner with Market Gaps" : "High ATS Rejection Risk",
    extractedUrls: uniqueUrls,
    detectedSkills: detectedSkills.map(s => s.toUpperCase()),
    totalSkillsFound: totalDetectedAll.length,
    strengths,
    gaps,
    currentValuation,
    targetValuation,
    actionPlan
  };
};

/**
 * Optional Google Gemini API Deep Resume Analysis Call
 */
export const analyzeWithGeminiAPI = async (resumeText, domain = 'web', apiKey = '') => {
  if (!apiKey) return null;

  try {
    const prompt = `You are a Senior Tech Hiring Lead & Recruiter auditing a candidate's resume for ${domain.toUpperCase()}. 
Analyze this resume text and return a JSON object ONLY:
{
  "proofScore": number (0-100),
  "atsRating": "Verified High-Proof Candidate" | "Practitioner with Market Gaps" | "High ATS Rejection Risk",
  "strengths": ["string"],
  "gaps": ["string"],
  "currentValuation": "string",
  "targetValuation": "string",
  "actionPlan": [{"step": "01", "title": "string", "desc": "string"}]
}
Resume Text: ${resumeText.slice(0, 3000)}`;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await res.json();
    const resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (resultText) {
      const jsonMatch = resultText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    }
  } catch (err) {
    console.error('Gemini API call failed, falling back to deep internal engine:', err);
  }
  return null;
};
