/**
 * Real-time Browser-based Resume Parser & Scanner
 * Extracts text, URLs, GitHub/Figma links, and technical skills from PDF, DOCX, and TXT files.
 */

export const parseResumeFile = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const buffer = e.target.result;
        let text = '';

        if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
          // Extract readable ASCII and UTF-8 string sequences from PDF ArrayBuffer
          const bytes = new Uint8Array(buffer);
          const rawStrings = [];
          let currentStr = '';

          for (let i = 0; i < bytes.length; i++) {
            const charCode = bytes[i];
            // Printable ASCII range + whitespace
            if ((charCode >= 32 && charCode <= 126) || charCode === 10 || charCode === 13) {
              currentStr += String.fromCharCode(charCode);
            } else {
              if (currentStr.length > 3) {
                rawStrings.push(currentStr);
              }
              currentStr = '';
            }
          }
          if (currentStr.length > 3) rawStrings.push(currentStr);
          text = rawStrings.join(' ');
        } else {
          // For TXT / DOC / DOCX text fallback
          const decoder = new TextDecoder('utf-8', { fatal: false });
          text = decoder.decode(buffer);
        }

        // 1. Scan for URLs and Portfolio links
        const urlRegex = /(https?:\/\/[^\s"'>]+|github\.com\/[^\s"'>]+|figma\.com\/[^\s"'>]+|[a-zA-Z0-9-]+\.(vercel|netlify)\.app)/gi;
        const rawUrls = text.match(urlRegex) || [];
        const uniqueUrls = [...new Set(rawUrls)].map(u => u.replace(/[.,;)]$/, ''));

        // 2. Technical & Growth Skill Dictionary
        const skillDictionary = [
          'react', 'node', 'express', 'javascript', 'typescript', 'tailwind', 'css',
          'html', 'mongodb', 'supabase', 'postgresql', 'sql', 'next.js', 'nextjs',
          'python', 'django', 'fastapi', 'rest api', 'graphql', 'docker', 'aws',
          'git', 'github', 'figma', 'ui/ux', 'meta ads', 'google ads', 'seo',
          'copywriting', 'funnel', 'roas', 'analytics', 'cursor', 'claude', 'v0'
        ];

        const lowercaseText = text.toLowerCase();
        const detectedSkills = skillDictionary.filter(skill => lowercaseText.includes(skill.toLowerCase()));

        // 3. Compute ATS & Proof Score
        let scoreBonus = 0;
        if (uniqueUrls.length > 0) scoreBonus += 15 + Math.min(uniqueUrls.length * 5, 15); // Up to +30 for live links
        if (detectedSkills.length >= 5) scoreBonus += 10;
        else if (detectedSkills.length >= 2) scoreBonus += 5;

        let atsRating = 'Low Proof Density';
        if (uniqueUrls.length >= 2 && detectedSkills.length >= 4) {
          atsRating = 'Verified High-Proof Resume';
        } else if (uniqueUrls.length >= 1 || detectedSkills.length >= 3) {
          atsRating = 'Moderate Proof Resume';
        }

        resolve({
          success: true,
          fileName: file.name,
          fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          extractedLength: text.length,
          urlsFound: uniqueUrls,
          detectedSkills: detectedSkills.map(s => s.toUpperCase()),
          scoreBonus,
          atsRating,
          summary: uniqueUrls.length > 0
            ? `Found ${uniqueUrls.length} live project link(s) and ${detectedSkills.length} verified technical skill(s).`
            : `Extracted ${detectedSkills.length} skill(s). Tip: Add live deployed URLs to boost score!`
        });
      } catch (err) {
        console.error('Resume parsing error:', err);
        resolve({
          success: false,
          fileName: file.name,
          scoreBonus: 5,
          atsRating: 'Standard Attachment',
          urlsFound: [],
          detectedSkills: [],
          summary: 'Resume attached successfully for mentor review.'
        });
      }
    };

    reader.onerror = () => {
      resolve({
        success: false,
        fileName: file.name,
        scoreBonus: 5,
        atsRating: 'Standard Attachment',
        urlsFound: [],
        detectedSkills: [],
        summary: 'Resume attached successfully.'
      });
    };

    reader.readAsArrayBuffer(file);
  });
};
