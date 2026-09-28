import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Activity, Upload, CheckSquare, Square, RefreshCw, Award, Code2, TrendingUp, Palette, FileText, CheckCircle2, AlertTriangle, ArrowRight, MessageSquare, ShieldCheck, Zap, ExternalLink, Sparkles, DollarSign } from 'lucide-react';
import { parseResumeFile } from '../lib/resumeParser';
import { analyzeResumeContent } from '../lib/resumeAnalyzerEngine';
import { trackLeadSubmission } from '../lib/analytics';
import { sendLeadToGoogleSheets } from '../lib/webhook';

const CandidateEmployabilityAudit = ({ onOpenScholarship }) => {
  const [domain, setDomain] = useState('web'); // 'web' | 'marketing' | 'design'
  const [auditMode, setAuditMode] = useState('upload'); // 'upload' | 'checklist'
  const [candidateName, setCandidateName] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [candidateCity, setCandidateCity] = useState('');

  // Mode A: Resume File Upload & Deep Analysis State
  const [resumeFile, setResumeFile] = useState(null);
  const [deepAnalysis, setDeepAnalysis] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Mode B: Interactive Checklist State
  const [checklistAnswers, setChecklistAnswers] = useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Domain Checklists
  const domainChecklists = {
    web: {
      title: "Web & Software Engineering Diagnostic",
      items: [
        { id: 'item1', title: 'Live Production Deployed URLs', desc: 'Do you have 2+ live web applications hosted on Vercel/AWS with SSL & real database schemas?' },
        { id: 'item2', title: '90-Day Active GitHub Commit History', desc: 'Is your GitHub commit graph active with continuous daily commits instead of bulk copy-pastes?' },
        { id: 'item3', title: 'Full-Stack Integrations (Auth + DB + Payments)', desc: 'Have you built apps with user auth, Razorpay/Stripe payments, and REST/GraphQL APIs?' },
        { id: 'item4', title: 'Peer-Reviewed Pull Requests (PRs)', desc: 'Do you have code review history or a verified developer experience letter from an active tech lab?' },
        { id: 'item5', title: 'System Architecture & State Management', desc: 'Can you confidently defend database indexing, state management, and API security in a live interview?' }
      ]
    },
    marketing: {
      title: "Growth & Performance Digital Marketing Diagnostic",
      items: [
        { id: 'item1', title: 'Live Meta & Google Ads Campaign Manager', desc: 'Have you configured real ad sets, custom audiences, pixel tracking, and conversion events?' },
        { id: 'item2', title: 'ROAS & CAC Analytics Proof', desc: 'Do you have verified dashboard proof of Return on Ad Spend (ROAS) and Customer Acquisition Cost (CAC)?' },
        { id: 'item3', title: 'High-Converting Copy & Funnel Architecture', desc: 'Have you built complete landing page funnels with direct-response copywriting and lead hooks?' },
        { id: 'item4', title: 'A/B Testing & Creative Iteration Workflow', desc: 'Can you demonstrate data-driven creative testing (hook variations, angle testing, audience splits)?' },
        { id: 'item5', title: 'Verified Agency / Company Ad Spend', desc: 'Do you have experience managing active client/company ad budgets with verified experience letters?' }
      ]
    },
    design: {
      title: "UI/UX & Brand Graphic Design Diagnostic",
      items: [
        { id: 'item1', title: 'Interactive Figma Prototype & Design System', desc: 'Do you have a live Behance/Figma portfolio with responsive mobile/desktop components and auto-layout?' },
        { id: 'item2', title: 'High-CTR Ad Creatives & Marketing Assets', desc: 'Have you designed social media ad creatives, carousels, and banners engineered for high CTR?' },
        { id: 'item3', title: 'Real Brand Guidelines & Typography Rules', desc: 'Can you present comprehensive brand identity kits (color tokens, font hierarchies, logo specs)?' },
        { id: 'item4', title: 'Client Handoff & Developer Design Specs', desc: 'Are your Figma files organized with proper layer names, design tokens, and export specs for developers?' },
        { id: 'item5', title: 'Live Visual Client Case Studies', desc: 'Do you have visual before-and-after redesign case studies with documented conversion impacts?' }
      ]
    }
  };

  // Resume File Selection & Deep Analysis Handler
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
    setIsScanning(true);

    try {
      // 1. Extract text & links from PDF/Word
      const basicParse = await parseResumeFile(file);
      
      // 2. Perform Deep Technical & Employability Analysis
      const analysis = await analyzeResumeContent(basicParse.summary + ' ' + (basicParse.urlsFound.join(' ')) + ' ' + (basicParse.detectedSkills.join(' ')), file.name, domain);
      
      // Merge basic parsed URLs
      if (basicParse.urlsFound && basicParse.urlsFound.length > 0) {
        analysis.extractedUrls = [...new Set([...analysis.extractedUrls, ...basicParse.urlsFound])];
      }

      setDeepAnalysis(analysis);
    } catch (err) {
      console.error("Resume analysis failed:", err);
      setUploadError("Could not parse file. Please try a different PDF or Word document.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const toggleChecklist = (id) => {
    setChecklistAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Overall Score Calculation
  const calculateScore = () => {
    if (auditMode === 'upload' && deepAnalysis) {
      return deepAnalysis.proofScore;
    }
    const trueCount = Object.values(checklistAnswers).filter(Boolean).length;
    return Math.min(20 + trueCount * 16, 98);
  };

  const score = calculateScore();

  const handleConnectHR = (e) => {
    e?.preventDefault();

    const auditLead = {
      name: candidateName || 'Candidate',
      phone: candidatePhone || '',
      city: candidateCity || 'Indore',
      domain: domain.toUpperCase(),
      score,
      auditMode,
      resumeAttached: !!resumeFile,
      timestamp: new Date().toISOString()
    };

    trackLeadSubmission(auditLead);
    sendLeadToGoogleSheets(auditLead);

    confetti({
      particleCount: 130,
      spread: 100,
      origin: { y: 0.6 }
    });

    setIsSubmitted(true);

    const resumeNote = resumeFile ? `\n📄 *Resume File:* ${resumeFile.name}` : '';
    const scanNote = deepAnalysis ? `\n🔗 *Live Portfolio Links Found:* ${deepAnalysis.extractedUrls.length}\n🛠️ *Skills Verified:* ${deepAnalysis.detectedSkills.join(', ') || 'None'}\n⚠️ *Critical Gaps:* ${deepAnalysis.gaps.join('; ')}` : '';

    const whatsappText = `Hi HR Lead! I completed my Candidate Employability Audit on NatureXpress Hub.\n\n📊 *Employability Score:* ${score}/100\n🎯 *Domain:* ${domain.toUpperCase()}${resumeNote}${scanNote}\n👤 *Candidate:* ${candidateName || 'Candidate'}\n📍 *City:* ${candidateCity || 'Indore'}\n\nI want to discuss my Audit Report & get my 8-Week Sprint Plan!`;

    const whatsappUrl = `https://wa.me/918077170715?text=${encodeURIComponent(whatsappText)}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1000);
  };

  return (
    <section id="assessment" className="py-24 px-6 md:px-12 bg-gradient-to-b from-slate-50 via-white to-indigo-50/20 text-slate-900 border-y border-slate-200/80">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header Tag */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-extrabold uppercase tracking-wider mb-3 shadow-xs">
            <Activity className="w-3.5 h-3.5 text-indigo-600" />
            <span>CANDIDATE EMPLOYABILITY AUDIT</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Find Out Why HR & Clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600">Aren't Hiring You Yet</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base font-medium max-w-2xl mx-auto mt-3">
            Upload your resume or complete the diagnostic checklist to evaluate your profile against the 5 critical hiring pillars used by top HR leads and tech directors.
          </p>
        </div>

        {/* Main Card Container */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden">
          
          {/* Domain Selection Bar */}
          <div className="mb-8 pb-6 border-b border-slate-200">
            <span className="block text-xs font-mono text-slate-500 font-bold mb-3 uppercase tracking-wider">SELECT YOUR DOMAIN FOR AUDIT:</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setDomain('web')}
                className={`p-3.5 rounded-2xl border text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  domain === 'web'
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Web & Software Dev</span>
              </button>

              <button
                type="button"
                onClick={() => setDomain('marketing')}
                className={`p-3.5 rounded-2xl border text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  domain === 'marketing'
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Growth Digital Marketing</span>
              </button>

              <button
                type="button"
                onClick={() => setDomain('design')}
                className={`p-3.5 rounded-2xl border text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  domain === 'design'
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Graphic & UI/UX Design</span>
              </button>
            </div>
          </div>

          {/* Mode Selector (Upload Resume vs Manual Checklist) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-slate-50 p-2 rounded-2xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => setAuditMode('upload')}
              className={`w-full sm:w-1/2 py-3 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                auditMode === 'upload'
                  ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Option A: Upload Resume (PDF / Word)</span>
            </button>

            <button
              type="button"
              onClick={() => setAuditMode('checklist')}
              className={`w-full sm:w-1/2 py-3 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                auditMode === 'checklist'
                  ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Option B: 5-Point Screening Checklist</span>
            </button>
          </div>

          {/* MODE A: UPLOAD RESUME WITH DEEP AUDIT DISPLAY */}
          {auditMode === 'upload' && (
            <div className="space-y-6 mb-8">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-indigo-500 bg-indigo-50/70'
                    : resumeFile
                    ? 'border-emerald-400 bg-emerald-50/40'
                    : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />

                {isScanning ? (
                  <div className="py-4 text-center">
                    <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin mx-auto mb-2" />
                    <p className="text-xs font-bold text-indigo-700">Conducting Deep Employability & Proof Density Audit...</p>
                  </div>
                ) : resumeFile ? (
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                        📄
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-900">{resumeFile.name}</p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • File Audited
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setResumeFile(null);
                        setDeepAnalysis(null);
                      }}
                      className="text-xs font-bold text-rose-600 hover:text-rose-800 px-3 py-1.5 bg-rose-50 rounded-lg cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto mb-3 flex items-center justify-center text-xl">
                      ☁️
                    </div>
                    <p className="text-sm font-bold text-slate-800">
                      Click to upload or drag & drop your resume file here
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Supports PDF (.pdf) or Word (.doc, .docx) up to 10MB
                    </p>
                  </div>
                )}
              </div>

              {uploadError && (
                <p className="text-xs font-bold text-rose-600">{uploadError}</p>
              )}

              {/* DEEP EXECUTIVE AUDIT REPORT CARD */}
              {deepAnalysis && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 md:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 text-left space-y-6 shadow-2xl relative overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                        OFFICIAL EMPLOYABILITY AUDIT REPORT
                      </span>
                      <h4 className="text-xl font-black text-white">{deepAnalysis.atsRating}</h4>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-2xl text-right">
                      <span className="text-[10px] text-slate-400 font-mono block">Proof Score</span>
                      <span className="text-2xl font-black text-indigo-400">{deepAnalysis.proofScore}/100</span>
                    </div>
                  </div>

                  {/* Links Found & Skills Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                      <h5 className="text-xs font-mono font-bold text-indigo-400 uppercase mb-2 flex items-center gap-1.5">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Deployed Portfolios Detected:</span>
                      </h5>
                      {deepAnalysis.extractedUrls.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {deepAnalysis.extractedUrls.map((url, i) => (
                            <span key={i} className="text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-800 px-2.5 py-0.5 rounded">
                              {url}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-rose-400 font-mono">❌ 0 Live URLs found. High ATS rejection risk.</p>
                      )}
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                      <h5 className="text-xs font-mono font-bold text-emerald-400 uppercase mb-2 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified Production Stack:</span>
                      </h5>
                      {deepAnalysis.detectedSkills.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {deepAnalysis.detectedSkills.map((sk, i) => (
                            <span key={i} className="text-[10px] font-bold bg-slate-800 text-slate-200 px-2 py-0.5 rounded">
                              {sk}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400">Basic keyword density detected.</p>
                      )}
                    </div>
                  </div>

                  {/* Profile Strengths */}
                  <div>
                    <h5 className="text-xs font-mono font-bold text-slate-400 uppercase mb-2">KEY PROFILE STRENGTHS:</h5>
                    <div className="space-y-2">
                      {deepAnalysis.strengths.map((str, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Critical Employability Gaps Flagged by HR */}
                  <div>
                    <h5 className="text-xs font-mono font-bold text-rose-400 uppercase mb-2">CRITICAL PROFILE GAPS FLAGGED BY RECRUITERS:</h5>
                    <div className="space-y-2">
                      {deepAnalysis.gaps.map((gp, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-rose-300 font-medium p-2.5 rounded-xl bg-rose-950/40 border border-rose-900/50">
                          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>{gp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Compensation Estimate */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950 to-slate-950 border border-indigo-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block">CURRENT MARKET ESTIMATE</span>
                      <span className="text-sm font-bold text-slate-300">{deepAnalysis.currentValuation}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-indigo-400" />
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold block">TARGET SPRINT POTENTIAL</span>
                      <span className="text-base font-black text-emerald-400">{deepAnalysis.targetValuation}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* MODE B: MANUAL CHECKLIST */}
          {auditMode === 'checklist' && (
            <div className="space-y-4 mb-8">
              <h3 className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider mb-2">
                {domainChecklists[domain].title}:
              </h3>

              {domainChecklists[domain].items.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`p-4.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    checklistAnswers[item.id]
                      ? 'bg-indigo-50/70 border-indigo-300 text-slate-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {checklistAnswers[item.id] ? (
                      <CheckSquare className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold mb-0.5 ${checklistAnswers[item.id] ? 'text-slate-900' : 'text-slate-700'}`}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Candidate Contact Inputs */}
          <div className="grid md:grid-cols-3 gap-4 mb-8 pt-6 border-t border-slate-200">
            <div>
              <label className="block text-xs font-mono text-slate-500 font-bold mb-1.5">YOUR NAME</label>
              <input 
                type="text" 
                placeholder="e.g. Alex Sharma" 
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-500 font-bold mb-1.5">WHATSAPP NUMBER</label>
              <input 
                type="text" 
                placeholder="e.g. 9876543210" 
                value={candidatePhone}
                onChange={(e) => setCandidatePhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-500 font-bold mb-1.5">CITY</label>
              <input 
                type="text" 
                placeholder="e.g. Indore / Online" 
                value={candidateCity}
                onChange={(e) => setCandidateCity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* HR ACTION CTA */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5 w-full md:w-auto">
              <div className="w-20 h-20 rounded-2xl bg-indigo-600 text-white flex flex-col items-center justify-center shrink-0 shadow-lg shadow-indigo-600/20">
                <span className="text-2xl font-black">{score}%</span>
                <span className="text-[10px] font-mono text-indigo-200 uppercase font-bold">Proof Score</span>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-500 font-bold block">AUDIT VERDICT</span>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold border mt-1 bg-indigo-50 text-indigo-800 border-indigo-200">
                  {deepAnalysis?.atsRating || 'Employability Diagnostic Completed'}
                </span>
                <p className="text-xs text-slate-600 mt-1.5 font-medium max-w-sm">
                  {deepAnalysis?.targetValuation ? `Target Potential: ${deepAnalysis.targetValuation}` : 'Connect with HR to get your personalized 8-week sprint plan.'}
                </p>
              </div>
            </div>

            <div className="w-full md:w-auto text-right">
              <button
                type="button"
                onClick={handleConnectHR}
                className="w-full md:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs md:text-sm transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-indigo-200" />
                <span>Connect with HR Lead to Fix Gaps & Get Sprint Plan →</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CandidateEmployabilityAudit;
