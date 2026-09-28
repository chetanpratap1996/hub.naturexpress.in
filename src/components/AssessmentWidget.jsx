import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { parseResumeFile } from '../lib/resumeParser';
import { trackLeadSubmission } from '../lib/analytics';
import { sendLeadToGoogleSheets } from '../lib/webhook';

const AssessmentWidget = () => {
  const [step, setStep] = useState(1);
  const [path, setPath] = useState(''); // 'job' or 'freelance'
  const [track, setTrack] = useState(''); // 'web', 'marketing', 'design'
  const [experience, setExperience] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [confidence, setConfidence] = useState('');
  
  // Resume upload & parsing state
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeAnalysis, setResumeAnalysis] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Lead info
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Resume file handler with Real-Time AI Parser
  const handleFileSelect = async (file) => {
    setUploadError('');
    if (!file) return;

    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const extension = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      setUploadError('Invalid format. Please upload a PDF (.pdf) or Word document (.doc, .docx).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds 10MB limit. Please upload a smaller file.');
      return;
    }

    setResumeFile(file);
    setIsParsing(true);

    // Parse resume in browser
    const analysis = await parseResumeFile(file);
    setResumeAnalysis(analysis);
    setIsParsing(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Dynamic Score Calculation including AI Resume Scan
  const calculateScore = () => {
    let score = 30;
    if (experience === '3+') score += 25;
    else if (experience === '1-2') score += 15;
    else score += 5;

    if (portfolio === 'live') score += 25;
    else if (portfolio === 'tutorial') score += 10;
    else score += 0;

    if (confidence === 'high') score += 15;
    else if (confidence === 'medium') score += 10;
    else score += 0;

    // Add Resume Scan Bonus
    if (resumeAnalysis) {
      score += resumeAnalysis.scoreBonus || 10;
    } else if (resumeFile) {
      score += 5;
    }

    return Math.min(score, 98);
  };

  const score = calculateScore();

  const handleNext = () => {
    if (step === 3) {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    const leadData = {
      name,
      phone,
      city: city || 'Indore',
      path,
      track,
      score,
      resumeAttached: !!resumeFile,
      resumeName: resumeFile ? resumeFile.name : null,
      linksFoundCount: resumeAnalysis ? resumeAnalysis.urlsFound.length : 0,
      skillsFoundCount: resumeAnalysis ? resumeAnalysis.detectedSkills.length : 0,
      timestamp: new Date().toISOString()
    };

    console.log('⚡ New Audit Lead Captured:', leadData);
    trackLeadSubmission(leadData);
    sendLeadToGoogleSheets(leadData);

    const existingLeads = JSON.parse(localStorage.getItem('nx_leads') || '[]');
    existingLeads.push(leadData);
    localStorage.setItem('nx_leads', JSON.stringify(existingLeads));

    setIsSubmitted(true);

    confetti({
      particleCount: 130,
      spread: 110,
      origin: { y: 0.5 }
    });

    const resumeNote = resumeFile ? `\n📄 *Resume:* ${resumeFile.name}` : '';
    const scanNote = resumeAnalysis ? `\n🔍 *Live Links Scanned:* ${resumeAnalysis.urlsFound.length}\n🛠️ *Skills Scanned:* ${resumeAnalysis.detectedSkills.join(', ') || 'None'}` : '';
    
    const message = `Hi Chetan! I completed my Automated Resume & Skill Audit on NatureXpress Hub.\n\n📊 *Readiness Score:* ${score}/100\n🎯 *Goal:* ${path === 'job' ? 'Get High-Paying Job' : 'Get Freelance Clients'}\n🚀 *Track:* ${track.toUpperCase()}${resumeNote}${scanNote}\n👤 *Name:* ${name}\n📍 *City:* ${city || 'Indore'}\n\nI want my 8-Week Action Plan & Scholarship details!`;
    const whatsappUrl = `https://wa.me/918077170715?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1200);
  };

  return (
    <div id="assessment" className="w-full max-w-4xl mx-auto my-16 px-4">
      <div className="relative rounded-3xl bg-white border border-slate-200/90 p-6 md:p-12 shadow-xl shadow-slate-200/50 overflow-hidden">
        
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 via-amber-500 to-emerald-500" />

        {/* Title */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-extrabold uppercase tracking-wider">
            🤖 Automated Resume & Skill Audit Engine
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-slate-900 tracking-tight">
            Find Out Why Companies or Clients <span className="text-indigo-600">Aren't Hiring You Yet</span>
          </h2>
          <p className="text-slate-600 text-xs md:text-sm mt-3 max-w-xl mx-auto leading-relaxed font-medium">
            Upload your resume PDF/Word to trigger real-time AI link & keyword scanning, calculate your readiness score, and identify your profile gap.
          </p>
        </div>

        {/* Step Indicator Bar */}
        {!isSubmitted && (
          <div className="flex items-center justify-between mb-10 max-w-xs mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === i
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-110'
                      : step > i
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {step > i ? '✓' : i}
                </div>
                {i < 4 && (
                  <div
                    className={`w-10 md:w-16 h-1 mx-1 rounded-full transition-all ${
                      step > i ? 'bg-indigo-600' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* STEP CONTENT */}
        <AnimatePresence mode="wait">
          
          {/* STEP 1: GOAL SELECT */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <h3 className="text-lg md:text-xl font-bold text-center text-slate-900">
                What is your primary career goal?
              </h3>

              <div className="grid sm:grid-cols-2 gap-5">
                <button
                  type="button"
                  onClick={() => { setPath('job'); handleNext(); }}
                  className={`p-6 rounded-2xl border text-left transition-all ${
                    path === 'job'
                      ? 'bg-indigo-50/70 border-indigo-500 shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-3xl block mb-3">💼</span>
                  <h4 className="text-lg font-bold text-slate-900">Get a High-Paying Job / Internship</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                    Clear technical interview rounds, build a verified proof portfolio, and target ₹4L–₹12L+ salary packages.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => { setPath('freelance'); handleNext(); }}
                  className={`p-6 rounded-2xl border text-left transition-all ${
                    path === 'freelance'
                      ? 'bg-indigo-50/70 border-indigo-500 shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-3xl block mb-3">🚀</span>
                  <h4 className="text-lg font-bold text-slate-900">Get High-Ticket Freelance Clients</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                    Stop working for cheap local rates, acquire premium clients, and achieve consistent ₹50,000+/month retainer income.
                  </p>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: TRACK SELECT */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <h3 className="text-lg md:text-xl font-bold text-center text-slate-900">
                Which skill domain do you want to audit?
              </h3>

              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { id: 'web', title: 'Full-Stack & Web Dev', icon: '💻', desc: 'React, Node, Tailwind, Databases & AI Code' },
                  { id: 'marketing', title: 'Digital Marketing & Growth', icon: '📈', desc: 'Meta Ads, Funnel Building, SEO & Copywriting' },
                  { id: 'design', title: 'UI/UX & Product Design', icon: '🎨', desc: 'Figma Systems, Design Tokens & Code Prototypes' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { setTrack(item.id); handleNext(); }}
                    className={`p-6 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      track === item.id
                        ? 'bg-indigo-50/70 border-indigo-500 shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <span className="text-3xl mb-3 block">{item.icon}</span>
                      <h4 className="text-base font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                    <span className="mt-5 text-xs font-extrabold text-indigo-600">Select Track →</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-colors"
                >
                  ← Back
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: REALITY CHECK & AI RESUME UPLOAD */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <h3 className="text-lg md:text-xl font-bold text-center text-slate-900">
                Reality Check & AI Resume Scanning
              </h3>

              <div className="space-y-5 max-w-2xl mx-auto">

                {/* Resume Upload Dropzone */}
                <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                  <label className="block text-xs font-bold text-slate-900 mb-2">
                    📄 Upload Your Resume for Real-Time AI Link & Proof Scanning
                  </label>
                  
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-indigo-500 bg-indigo-100/50'
                        : resumeFile
                        ? 'border-emerald-400 bg-emerald-50/60'
                        : 'border-slate-300 hover:border-indigo-400 bg-white'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />

                    {isParsing ? (
                      <div className="py-2 text-center">
                        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin mx-auto mb-2" />
                        <p className="text-xs font-bold text-indigo-700">🤖 Scanning Resume text, links & skills...</p>
                      </div>
                    ) : resumeFile ? (
                      <div className="flex items-center justify-between p-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                            📄
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-bold text-slate-900">{resumeFile.name}</p>
                            <p className="text-[11px] text-slate-500 font-medium">
                              {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Scanned & Analyzed
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setResumeFile(null);
                            setResumeAnalysis(null);
                          }}
                          className="text-xs font-bold text-red-500 hover:text-red-700 px-3 py-1 bg-red-50 rounded-lg"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 mx-auto mb-2 flex items-center justify-center text-lg">
                          ☁️
                        </div>
                        <p className="text-xs font-bold text-slate-800">
                          Click to upload or drag & drop your resume here
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Supports PDF (.pdf) or Word (.doc, .docx) up to 10MB
                        </p>
                      </div>
                    )}
                  </div>

                  {uploadError && (
                    <p className="text-xs font-bold text-red-600 mt-2">{uploadError}</p>
                  )}

                  {/* AI Scan Analysis Feedback Box */}
                  {resumeAnalysis && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 rounded-xl bg-white border border-emerald-200 shadow-sm text-left space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-emerald-700 flex items-center gap-1.5">
                          <span>🤖 AI Resume Scan Result:</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">
                            {resumeAnalysis.atsRating}
                          </span>
                        </span>
                        <span className="text-xs font-bold text-indigo-600">
                          +{resumeAnalysis.scoreBonus} Score Points
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 font-medium">{resumeAnalysis.summary}</p>

                      {resumeAnalysis.urlsFound.length > 0 && (
                        <div className="pt-2 border-t border-slate-100">
                          <p className="text-[11px] font-bold text-slate-800 mb-1">🔗 Live Deployed URLs Detected:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {resumeAnalysis.urlsFound.map((url, idx) => (
                              <span key={idx} className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100 font-mono">
                                {url}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {resumeAnalysis.detectedSkills.length > 0 && (
                        <div className="pt-2 border-t border-slate-100">
                          <p className="text-[11px] font-bold text-slate-800 mb-1">🛠️ Production Skills Scanned:</p>
                          <div className="flex flex-wrap gap-1">
                            {resumeAnalysis.detectedSkills.map((skill, idx) => (
                              <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                </div>

                {/* Q1 */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    1. How many live deployed production projects do you have right now?
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none focus:border-indigo-600"
                  >
                    <option value="">-- Select --</option>
                    <option value="0">0 Projects (Only theory / YouTube tutorials)</option>
                    <option value="1-2">1–2 Basic Projects (Not deployed or simple demo)</option>
                    <option value="3+">3+ Live Production Projects with working URLs</option>
                  </select>
                </div>

                {/* Q2 */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    2. When an interviewer or client asks for proof, what do you show?
                  </label>
                  <select
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none focus:border-indigo-600"
                  >
                    <option value="">-- Select --</option>
                    <option value="certificate">Generic College Certificate / Marksheet</option>
                    <option value="tutorial">Clone project copied from YouTube tutorial</option>
                    <option value="live">Live working URL + GitHub/Figma design case study</option>
                  </select>
                </div>

                {/* Q3 */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    3. How confident are you to build/pitch a live task in front of an employer?
                  </label>
                  <select
                    value={confidence}
                    onChange={(e) => setConfidence(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none focus:border-indigo-600"
                  >
                    <option value="">-- Select --</option>
                    <option value="low">Nervous (I freeze under pressure)</option>
                    <option value="medium">Somewhat Confident (Need google / help)</option>
                    <option value="high">100% Confident (I can deliver output live)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between pt-4 max-w-2xl mx-auto">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  disabled={!experience || !portfolio || !confidence}
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-extrabold text-xs hover:bg-indigo-700 disabled:opacity-40 shadow-md shadow-indigo-100 transition-all"
                >
                  Calculate My Market Score →
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: SCORE CARD & LEAD CAPTURE */}
          {step === 4 && !isSubmitted && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Dynamic SVG Score Meter */}
              <div className="p-8 rounded-3xl bg-slate-900 text-white text-center relative overflow-hidden shadow-xl">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Your Calculated Market Readiness Score
                </span>

                <div className="my-6 flex items-center justify-center gap-4">
                  <div className="relative flex items-center justify-center">
                    <svg className="w-28 h-28 transform -rotate-90">
                      <circle
                        cx="56"
                        cy="56"
                        r="48"
                        stroke="currentColor"
                        strokeWidth="10"
                        className="text-slate-800"
                        fill="transparent"
                      />
                      <circle
                        cx="56"
                        cy="56"
                        r="48"
                        stroke="currentColor"
                        strokeWidth="10"
                        className="text-indigo-500 transition-all duration-1000"
                        fill="transparent"
                        strokeDasharray={301.59}
                        strokeDashoffset={301.59 - (301.59 * score) / 100}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-4xl font-extrabold text-white tracking-tighter">
                      {score}
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="text-xl font-extrabold text-slate-400 block">/ 100</span>
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-extrabold border border-amber-500/40 inline-block mt-1">
                      {score < 50 ? '🚨 High Rejection Risk' : score < 75 ? '⚠️ Underpaid Tier' : '🔥 Market Ready'}
                    </span>
                  </div>
                </div>

                {/* Resume AI Scan Summary if present */}
                {resumeAnalysis && (
                  <div className="mb-6 p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
                    <p className="font-bold text-emerald-400">🤖 AI Resume Scan Verified:</p>
                    <p className="text-[11px] mt-1">
                      Scanned <strong>{resumeAnalysis.urlsFound.length} live link(s)</strong> & <strong>{resumeAnalysis.detectedSkills.length} production skill(s)</strong> in {resumeAnalysis.fileName}.
                    </p>
                  </div>
                )}

                {/* Red Flags Identified */}
                <div className="grid sm:grid-cols-3 gap-3 text-left">
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                    <p className="text-[11px] font-bold text-red-400">⚠️ Missing Live URLs</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">Recruiters skip profiles without working deployed code links.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                    <p className="text-[11px] font-bold text-amber-400">⚠️ Copycat Portfolio</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">Tutorial clone projects don't build employer trust.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                    <p className="text-[11px] font-bold text-emerald-400">⚡ Action Needed</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">Need 4 production projects to command top salary.</p>
                  </div>
                </div>
              </div>

              {/* Lead Capture Form */}
              <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-sm font-extrabold text-slate-900 text-center">
                  🎁 Unlock Your 8-Week Action Plan & Scholarship Code (Save up to ₹10,000)
                </h4>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chetan Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">WhatsApp Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">City / Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Indore"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-indigo-600 text-white font-extrabold text-sm hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2"
                >
                  <span>Get My Action Plan & Resume Audit on WhatsApp 🚀</span>
                </button>

                <p className="text-[10px] text-slate-500 text-center font-medium">
                  🔒 100% confidential. Instant WhatsApp report delivery. No spam guaranteed.
                </p>
              </form>
            </motion.div>
          )}

          {/* SUBMITTED SUCCESS STATE */}
          {isSubmitted && (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 text-3xl font-extrabold flex items-center justify-center mx-auto shadow-md">
                ✓
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">AI Resume & Skill Audit Complete!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto font-medium">
                Your Market Score ({score}/100) and custom 8-Week Sprint Plan have been generated.
              </p>
              <p className="text-xs text-indigo-600 font-extrabold animate-pulse">
                Opening WhatsApp to deliver your report...
              </p>

              <div className="pt-4">
                <a
                  href={`https://wa.me/918077170715?text=${encodeURIComponent(`Hi Chetan! I completed my AI Resume & Market Audit on NatureXpress Hub. Score: ${score}/100.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100"
                >
                  <span>Open WhatsApp Directly →</span>
                </a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
};

export default AssessmentWidget;
