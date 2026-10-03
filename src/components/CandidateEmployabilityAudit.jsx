import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Activity,
  Upload,
  CheckSquare,
  Square,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Zap,
  ExternalLink,
  Sparkles,
  Code2,
  TrendingUp,
  Palette,
  Download,
  RefreshCw,
  Target,
  FileSearch,
  Briefcase,
  Copy,
  Check,
  ChevronRight,
  Layers,
  AlertCircle,
  BarChart3,
  Cpu,
  Flame,
  Award,
  Clock,
  Printer
} from 'lucide-react';
import { parseResumeFile } from '../lib/resumeParser';
import { computeAuditScoring, DOMAIN_PROFILES, SAMPLE_RESUMES } from '../lib/resumeAnalyzerEngine';
import { trackLeadSubmission } from '../lib/analytics';
import { sendLeadToGoogleSheets } from '../lib/webhook';

const CandidateEmployabilityAudit = ({ onOpenScholarship }) => {
  const [domain, setDomain] = useState('web'); // 'web' | 'marketing' | 'design'
  const [targetRoleId, setTargetRoleId] = useState('fullstack');
  const [auditMode, setAuditMode] = useState('upload'); // 'upload' | 'checklist'
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'jd_match' | 'bullets' | 'roadmap' | 'hygiene'
  
  // Custom Job Description State
  const [customJobDesc, setCustomJobDesc] = useState('');

  // Candidate Contact & Lead Capture
  const [candidateName, setCandidateName] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [candidateCity, setCandidateCity] = useState('');
  const [copiedBulletIndex, setCopiedBulletIndex] = useState(null);

  // File Upload & Scan State
  const [resumeFile, setResumeFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [auditReport, setAuditReport] = useState(null);
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

  // Synchronize target role when domain changes
  useEffect(() => {
    const profile = DOMAIN_PROFILES[domain] || DOMAIN_PROFILES.web;
    if (profile && profile.roles.length > 0) {
      setTargetRoleId(profile.roles[0].id);
    }
  }, [domain]);

  // Recalculate audit report when parsedData, domain, targetRoleId, or customJobDesc changes
  useEffect(() => {
    if (parsedData) {
      const report = computeAuditScoring(parsedData, domain, targetRoleId, customJobDesc);
      setAuditReport(report);

      // Auto-populate candidate details from parsed resume if empty
      if (parsedData.candidateName && !candidateName) setCandidateName(parsedData.candidateName);
      if (parsedData.phone && !candidatePhone) setCandidatePhone(parsedData.phone);
    } else {
      setAuditReport(null);
    }
  }, [parsedData, domain, targetRoleId, customJobDesc]);

  // Handle File Upload
  const handleFileSelect = async (file) => {
    setUploadError('');
    if (!file) return;

    const allowedExtensions = ['pdf', 'doc', 'docx', 'txt'];
    const extension = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      setUploadError('Invalid format. Please upload a PDF (.pdf), Word (.docx), or Text (.txt) file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds 10MB. Please upload a smaller resume document.');
      return;
    }

    setResumeFile(file);
    setIsScanning(true);

    try {
      const parsed = await parseResumeFile(file);
      setParsedData(parsed);
    } catch (err) {
      console.error('Resume parsing failed:', err);
      setUploadError('Could not process resume text. Please upload a standard PDF or Word document.');
    } finally {
      setTimeout(() => {
        setIsScanning(false);
      }, 450);
    }
  };

  // 1-Click Sample Test Loader
  const handleLoadSample = (sampleKey) => {
    setUploadError('');
    setIsScanning(true);
    setDomain(sampleKey);

    setTimeout(async () => {
      const sample = SAMPLE_RESUMES[sampleKey] || SAMPLE_RESUMES.web;
      const fakeFile = new Blob([sample.rawText], { type: 'text/plain' });
      fakeFile.name = sample.fileName;

      const parsed = await parseResumeFile(fakeFile);
      parsed.fileName = sample.fileName;
      parsed.rawText = sample.rawText;
      parsed.candidateName = sample.title;

      setResumeFile({ name: sample.fileName, size: 24500 });
      setParsedData(parsed);
      setIsScanning(false);
    }, 400);
  };

  // Drag and drop handlers
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

  // Checklist score calculation: 0 if nothing selected, 20% per checked pillar
  const checkedChecklistCount = Object.values(checklistAnswers).filter(Boolean).length;
  const checklistScore = checkedChecklistCount * 20;

  // Dynamic live readiness state
  const isAssessed = auditMode === 'upload' ? !!auditReport : checkedChecklistCount > 0;
  const liveScore = auditMode === 'upload' ? (auditReport ? auditReport.totalScore : 0) : checklistScore;

  // Copy bullet upgrade helper
  const handleCopyBullet = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIndex(index);
    setTimeout(() => setCopiedBulletIndex(null), 2000);
  };

  // Print / Save PDF Audit Report
  const handleDownloadReport = () => {
    if (!auditReport) return;
    window.print();
  };

  // Connect with HR Lead & Lead Tracking
  const handleConnectHR = (e) => {
    e?.preventDefault();

    if (!isAssessed) {
      if (auditMode === 'upload') {
        fileInputRef.current?.click();
      }
      return;
    }

    const auditLead = {
      name: candidateName || 'Candidate',
      phone: candidatePhone || '',
      city: candidateCity || 'Indore',
      track: domain.toUpperCase(),
      targetRole: auditReport?.selectedRole?.label || (domain === 'web' ? 'Full-Stack Developer' : domain === 'marketing' ? 'Performance Marketer' : 'UI/UX Designer'),
      score: liveScore,
      auditMode,
      resumeAttached: !!resumeFile,
      resumeName: resumeFile?.name || 'Manual 5-Pillar Checklist',
      linksFoundCount: auditReport?.extractedUrls?.length || 0,
      skillsFoundCount: auditReport?.detectedSkills?.length || 0,
      timestamp: new Date().toISOString()
    };

    trackLeadSubmission(auditLead);
    sendLeadToGoogleSheets(auditLead);

    confetti({
      particleCount: 130,
      spread: 90,
      origin: { y: 0.6 }
    });

    setIsSubmitted(true);

    const resumeNote = resumeFile ? `\n📄 *Resume:* ${resumeFile.name}` : '';
    const gapsNote = auditReport?.gaps?.length ? `\n⚠️ *Top Gap:* ${auditReport.gaps[0].title}` : '';
    const valuationNote = auditReport?.valuation ? `\n💰 *Target Valuation:* ${auditReport.valuation.target}` : '';

    const whatsappText = `Hi NatureXpress Talent Lead! I just audited my profile on the Hub.\n\n📊 *Employability Readiness:* ${liveScore}/100\n🎯 *Target Track:* ${domain.toUpperCase()} (${auditReport?.selectedRole?.label || 'General'})${resumeNote}${gapsNote}${valuationNote}\n👤 *Candidate:* ${candidateName || 'Candidate'}\n📍 *City:* ${candidateCity || 'Indore'}\n\nI want to schedule my Free 1-on-1 ATS Optimization & Sprint Roadmap call!`;

    const whatsappUrl = `https://wa.me/918077170715?text=${encodeURIComponent(whatsappText)}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 700);
  };

  // 5-Point Manual Checklist Data
  const domainChecklists = {
    web: {
      title: "Web & Software Engineering Diagnostic",
      items: [
        { id: 'item1', title: 'Live Production Deployed URLs (Vercel / AWS / Netlify)', desc: 'Do you have 2+ live deployed full-stack web applications with SSL and active database schemas?' },
        { id: 'item2', title: '90-Day Active GitHub Commit History', desc: 'Is your GitHub commit graph active with regular code reviews, clean branches, and daily contributions?' },
        { id: 'item3', title: 'Full-Stack Integrations (Auth + DB + Payment Webhooks)', desc: 'Have you built applications with user auth (Supabase/JWT), payment gateways (Razorpay/Stripe), and REST/GraphQL APIs?' },
        { id: 'item4', title: 'Verified Tech Lab / Production Experience Letter', desc: 'Do you have verified proof of contributing to active production codebases under senior mentorship?' },
        { id: 'item5', title: 'System Architecture & Modern AI-Accelerated DX', desc: 'Can you confidently defend database indexing, state management, and modern AI coding workflows (Cursor/Claude)?' }
      ]
    },
    marketing: {
      title: "Growth & Performance Digital Marketing Diagnostic",
      items: [
        { id: 'item1', title: 'Live Meta & Google Ads Campaign Manager Proof', desc: 'Have you configured real ad sets, custom audiences, pixel tracking, and custom conversion events?' },
        { id: 'item2', title: 'Documented ROAS & CAC Analytics Dashboards', desc: 'Do you have verified dashboard proof of Return on Ad Spend (3x+ ROAS) and customer acquisition cost?' },
        { id: 'item3', title: 'High-Converting Direct-Response Funnel Architecture', desc: 'Have you built complete landing page funnels with direct-response copywriting and lead magnet hooks?' },
        { id: 'item4', title: 'A/B Testing & Data-Driven Creative Testing', desc: 'Can you demonstrate data-driven creative testing (hook variations, angle testing, audience splits)?' },
        { id: 'item5', title: 'Verified Brand / Agency Ad Spend Experience', desc: 'Do you have experience managing active monthly ad budgets with verified experience letters?' }
      ]
    },
    design: {
      title: "UI/UX & Brand Graphic Design Diagnostic",
      items: [
        { id: 'item1', title: 'Interactive Figma Prototype & Tokenized Design System', desc: 'Do you have a live Behance/Figma portfolio with responsive mobile/desktop components, tokens, and auto-layout?' },
        { id: 'item2', title: 'High-CTR Ad Creatives & Viral Marketing Assets', desc: 'Have you designed social media ad creatives, carousels, and banners engineered for high CTR?' },
        { id: 'item3', title: 'Real Brand Guidelines & Typography Rules', desc: 'Can you present comprehensive brand identity kits (color tokens, font hierarchies, logo specs)?' },
        { id: 'item4', title: 'Developer Design Handoff & Organized Specs', desc: 'Are your Figma files organized with proper layer names, design tokens, and export specs for developers?' },
        { id: 'item5', title: 'Live Client Case Studies with Conversion Impact', desc: 'Do you have visual before-and-after redesign case studies with documented user engagement metrics?' }
      ]
    }
  };

  const activeDomainProfile = DOMAIN_PROFILES[domain] || DOMAIN_PROFILES.web;

  return (
    <section id="assessment" className="py-20 md:py-28 px-4 md:px-10 bg-gradient-to-b from-white via-slate-50/70 to-white text-slate-900 relative overflow-hidden border-y border-slate-200/80">
      
      {/* Background Soft Glow Accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-100/40 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[250px] bg-sky-100/30 blur-[110px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/90 text-indigo-700 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>INSTITUTIONAL ATS & PROOF-OF-WORK AUDIT SUITE</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Find Out Why Recruiters & Clients <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600">
              Skip 85% of Resumes in 6 Seconds
            </span>
          </h2>
          
          <p className="text-slate-600 text-sm md:text-base font-normal max-w-2xl mx-auto mt-3.5 leading-relaxed">
            Scan your profile against real enterprise ATS parsing algorithms, keyword density matrices, production deployment signals, and recruiter screening criteria.
          </p>
        </div>

        {/* Main Terminal Window (Clean White SaaS Card) */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl shadow-slate-200/50 relative overflow-hidden">
          
          {/* Domain Track Selection Bar */}
          <div className="mb-8 pb-6 border-b border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" />
                <span>1. SELECT YOUR DOMAIN TRACK:</span>
              </span>

              {/* 1-Click Quick Samples */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-mono text-slate-400 font-bold mr-1">QUICK TEST SAMPLES:</span>
                <button
                  type="button"
                  onClick={() => handleLoadSample('web')}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-[11px] font-mono font-bold text-indigo-700 border border-indigo-200 transition cursor-pointer"
                >
                  ⚡ SDE-1 Sample
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSample('marketing')}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-[11px] font-mono font-bold text-indigo-700 border border-indigo-200 transition cursor-pointer"
                >
                  ⚡ Marketer Sample
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSample('design')}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-[11px] font-mono font-bold text-indigo-700 border border-indigo-200 transition cursor-pointer"
                >
                  ⚡ UI/UX Sample
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setDomain('web')}
                className={`p-4 rounded-2xl border text-xs font-black transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                  domain === 'web'
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Web & Software Dev</span>
              </button>

              <button
                type="button"
                onClick={() => setDomain('marketing')}
                className={`p-4 rounded-2xl border text-xs font-black transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                  domain === 'marketing'
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Growth Digital Marketing</span>
              </button>

              <button
                type="button"
                onClick={() => setDomain('design')}
                className={`p-4 rounded-2xl border text-xs font-black transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                  domain === 'design'
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Graphic & UI/UX Design</span>
              </button>
            </div>
          </div>

          {/* Mode Selector: Upload File vs Checklist */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => setAuditMode('upload')}
              className={`w-full sm:w-1/2 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                auditMode === 'upload'
                  ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Deep ATS Scanner (PDF / Word / TXT)</span>
            </button>

            <button
              type="button"
              onClick={() => setAuditMode('checklist')}
              className={`w-full sm:w-1/2 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                auditMode === 'checklist'
                  ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>5-Pillar Employability Diagnostic</span>
            </button>
          </div>

          {/* ════════════════════════════════════════════════════════════════════
              MODE A: FILE UPLOAD & REAL-TIME ATS SCANNER
             ════════════════════════════════════════════════════════════════════ */}
          {auditMode === 'upload' && (
            <div className="space-y-6 mb-8">
              
              {/* Dropzone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all relative overflow-hidden ${
                  isDragging
                    ? 'border-indigo-500 bg-indigo-50/70'
                    : resumeFile
                    ? 'border-emerald-400 bg-emerald-50/40'
                    : 'border-slate-300 hover:border-indigo-400 bg-slate-50/60 hover:bg-slate-50'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                />

                {isScanning ? (
                  <div className="py-6 text-center">
                    <div className="w-10 h-10 rounded-full border-3 border-indigo-600 border-t-transparent animate-spin mx-auto mb-3" />
                    <p className="text-sm font-black text-indigo-700">
                      Executing 5-Pillar ATS Parse & Production Density Scan...
                    </p>
                    <p className="text-xs text-slate-500 font-mono mt-1">
                      Extracting keywords, live URLs, action verbs & metric density
                    </p>
                  </div>
                ) : resumeFile ? (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center font-bold text-xl shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{resumeFile.name}</p>
                        <p className="text-xs text-slate-500 font-mono">
                          {resumeFile.size ? `${(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Scanned Successfully` : 'Sample Loaded'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="text-xs font-mono font-bold text-slate-700 hover:text-slate-900 px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition shadow-xs"
                      >
                        Change File
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setResumeFile(null);
                          setParsedData(null);
                          setAuditReport(null);
                        }}
                        className="text-xs font-mono font-bold text-rose-600 hover:text-rose-700 px-3 py-2 bg-rose-50 border border-rose-200 rounded-xl transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 mx-auto mb-3 flex items-center justify-center text-2xl shadow-xs">
                      <Upload className="w-7 h-7" />
                    </div>
                    <p className="text-base font-bold text-slate-800">
                      Click to upload or drag & drop your resume file here
                    </p>
                    <p className="text-xs text-slate-500 font-mono mt-1">
                      Supports PDF (.pdf), Word (.docx), or Text (.txt) up to 10MB
                    </p>
                  </div>
                )}
              </div>

              {uploadError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* ════════════════════════════════════════════════════════════════
                  AUDIT RESULTS DASHBOARD (CLEAN WHITE / SLATE UI)
                 ════════════════════════════════════════════════════════════════ */}
              {auditReport && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl bg-slate-50/70 border border-slate-200/90 text-left shadow-lg overflow-hidden"
                >
                  
                  {/* Top Score Banner */}
                  <div className="p-6 md:p-8 bg-white border-b border-slate-200">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      
                      {/* Left Title & Metadata */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700">
                            NATUREXPRESS TALENT DIAGNOSTICS
                          </span>
                          <span className={`text-[10px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-md border ${
                            auditReport.statusColor === 'emerald'
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                              : auditReport.statusColor === 'indigo'
                              ? 'bg-sky-50 border-sky-300 text-sky-800'
                              : auditReport.statusColor === 'amber'
                              ? 'bg-amber-50 border-amber-300 text-amber-800'
                              : 'bg-rose-50 border-rose-300 text-rose-800'
                          }`}>
                            {auditReport.badgeLabel}
                          </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
                          {auditReport.atsStatus}
                        </h3>

                        {/* Metadata Pills */}
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          {auditReport.candidateName && (
                            <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                              👤 {auditReport.candidateName}
                            </span>
                          )}
                          <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-800 px-2.5 py-1 rounded-lg border border-indigo-200">
                            🎯 {auditReport.seniority?.level || 'SDE-1 / Entry'} (~{auditReport.seniority?.yearsEstimate || '0–1 yrs'})
                          </span>
                          <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                            🔗 {auditReport.extractedUrls.length} Live Links Found
                          </span>
                          <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                            🛠️ {auditReport.detectedSkills.length} Keywords Verified
                          </span>
                        </div>
                      </div>

                      {/* Right Radial Gauge & Grade */}
                      <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-4 rounded-2xl shrink-0 shadow-xs">
                        
                        {/* Circular Progress Gauge */}
                        <div className="relative w-20 h-20 flex items-center justify-center">
                          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              className="text-slate-200"
                              strokeWidth="3.5"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className={
                                auditReport.totalScore >= 75
                                  ? 'text-emerald-500'
                                  : auditReport.totalScore >= 55
                                  ? 'text-sky-500'
                                  : auditReport.totalScore >= 40
                                  ? 'text-amber-500'
                                  : 'text-rose-500'
                              }
                              strokeDasharray={`${auditReport.totalScore}, 100`}
                              strokeWidth="3.5"
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center">
                            <span className="text-xl font-black text-slate-900">{auditReport.totalScore}</span>
                            <span className="text-[9px] font-mono text-slate-500">/100</span>
                          </div>
                        </div>

                        <div className="text-left">
                          <span className="text-[10px] font-mono font-bold text-slate-500 block uppercase">ATS Grade</span>
                          <span className={`text-2xl font-black ${
                            auditReport.totalScore >= 75
                              ? 'text-emerald-600'
                              : auditReport.totalScore >= 55
                              ? 'text-sky-600'
                              : auditReport.totalScore >= 40
                              ? 'text-amber-600'
                              : 'text-rose-600'
                          }`}>
                            {auditReport.grade}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 block">Proof Index</span>
                        </div>

                      </div>

                    </div>
                  </div>

                  {/* 5 Pillars Quick Visual Breakdown */}
                  <div className="p-6 md:px-8 border-b border-slate-200 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                      {auditReport.pillars.map((pillar) => (
                        <div key={pillar.key} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono font-bold text-slate-600 uppercase truncate">
                              {pillar.label.split('&')[0]}
                            </span>
                            <span className="text-[11px] font-mono font-extrabold text-slate-900">
                              {pillar.earned}/{pillar.max}
                            </span>
                          </div>
                          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mb-1.5">
                            <div
                              className={`h-full rounded-full ${
                                pillar.pct >= 70
                                  ? 'bg-emerald-500'
                                  : pillar.pct >= 45
                                  ? 'bg-sky-500'
                                  : pillar.pct >= 30
                                  ? 'bg-amber-500'
                                  : 'bg-rose-500'
                              }`}
                              style={{ width: `${Math.max(pillar.pct, 5)}%` }}
                            />
                          </div>
                          <p className="text-[10px] text-slate-500 truncate font-medium">{pillar.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Sub-Tabs Navigation (Mobile Horizontal Scrollable) */}
                  <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-100/80 px-4 sm:px-6 pt-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('overview')}
                      className={`pb-3 px-3.5 text-xs font-mono font-bold border-b-2 transition shrink-0 cursor-pointer flex items-center gap-1.5 ${
                        activeTab === 'overview'
                          ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-xl shadow-xs'
                          : 'border-transparent text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      <span>Critical Gaps & Red Flags</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('jd_match')}
                      className={`pb-3 px-3.5 text-xs font-mono font-bold border-b-2 transition shrink-0 cursor-pointer flex items-center gap-1.5 ${
                        activeTab === 'jd_match'
                          ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-xl shadow-xs'
                          : 'border-transparent text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Target className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Role & JD Keyword Matcher</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('bullets')}
                      className={`pb-3 px-3.5 text-xs font-mono font-bold border-b-2 transition shrink-0 cursor-pointer flex items-center gap-1.5 ${
                        activeTab === 'bullets'
                          ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-xl shadow-xs'
                          : 'border-transparent text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Impact Verbs & Bullet Upgrades</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('roadmap')}
                      className={`pb-3 px-3.5 text-xs font-mono font-bold border-b-2 transition shrink-0 cursor-pointer flex items-center gap-1.5 ${
                        activeTab === 'roadmap'
                          ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-xl shadow-xs'
                          : 'border-transparent text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Proof Roadmap & Valuation</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('hygiene')}
                      className={`pb-3 px-3.5 text-xs font-mono font-bold border-b-2 transition shrink-0 cursor-pointer flex items-center gap-1.5 ${
                        activeTab === 'hygiene'
                          ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-xl shadow-xs'
                          : 'border-transparent text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <FileSearch className="w-3.5 h-3.5 text-sky-600" />
                      <span>Format Hygiene & Text</span>
                    </button>
                  </div>

                  {/* Sub-Tab Content Area */}
                  <div className="p-5 sm:p-7 md:p-8 space-y-6 bg-slate-50/50">

                    {/* ── TAB 1: OVERVIEW & CRITICAL GAPS ── */}
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        {/* Red Flags Alert Box */}
                        <div>
                          <h4 className="text-xs font-mono font-bold text-rose-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-rose-600" />
                            <span>CRITICAL REJECTION SIGNALS IDENTIFIED BY HIRING MANAGERS:</span>
                          </h4>

                          <div className="space-y-3">
                            {auditReport.gaps.map((gap, i) => (
                              <div
                                key={i}
                                className="p-4 rounded-2xl bg-white border border-rose-200 text-left shadow-xs"
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                                    {gap.severity}
                                  </span>
                                  <span className="text-xs font-mono text-slate-500 font-bold">{gap.pillar}</span>
                                </div>
                                <p className="text-xs md:text-sm font-bold text-slate-900 mt-1">{gap.title}</p>
                                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-normal">{gap.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Verified Strengths */}
                        <div>
                          <h4 className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>VERIFIED STRENGTHS DETECTED IN RESUME:</span>
                          </h4>

                          <div className="space-y-2">
                            {auditReport.strengths.map((strength, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-emerald-200/90 text-xs text-slate-800 shadow-xs"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{strength}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── TAB 2: ROLE & JD KEYWORD MATCHER ── */}
                    {activeTab === 'jd_match' && (
                      <div className="space-y-6">
                        
                        {/* Target Role Selector */}
                        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                          <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                            SELECT TARGET JOB ROLE BENCHMARK:
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {activeDomainProfile.roles.map((r) => (
                              <button
                                key={r.id}
                                type="button"
                                onClick={() => setTargetRoleId(r.id)}
                                className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer text-left ${
                                  targetRoleId === r.id
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                              >
                                {r.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Mandatory ATS Keywords Grid */}
                        <div className="grid md:grid-cols-2 gap-4">
                          
                          {/* Matched Keywords */}
                          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                            <h5 className="text-xs font-mono font-bold text-emerald-700 uppercase mb-3 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Verified Keywords ({auditReport.keywordBreakdown.matchedTier1.length}):</span>
                            </h5>

                            {auditReport.keywordBreakdown.matchedTier1.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5">
                                {auditReport.keywordBreakdown.matchedTier1.map((kw, i) => (
                                  <span key={i} className="text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg">
                                    ✓ {kw}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-slate-500">Zero core keywords found for this role profile.</p>
                            )}
                          </div>

                          {/* Missing High-Priority Keywords */}
                          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                            <h5 className="text-xs font-mono font-bold text-rose-700 uppercase mb-3 flex items-center gap-1.5">
                              <AlertCircle className="w-4 h-4 text-rose-600" />
                              <span>Missing Mandatory Keywords ({auditReport.keywordBreakdown.missingTier1.length}):</span>
                            </h5>

                            {auditReport.keywordBreakdown.missingTier1.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5">
                                {auditReport.keywordBreakdown.missingTier1.map((kw, i) => (
                                  <span key={i} className="text-xs font-mono font-bold bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-lg">
                                    ✕ {kw}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-emerald-700 font-mono font-bold">All primary target keywords detected!</p>
                            )}
                          </div>
                        </div>

                        {/* Custom Job Description Paste Tool */}
                        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                          <h5 className="text-xs font-mono font-bold text-indigo-700 uppercase mb-2 flex items-center gap-2">
                            <FileSearch className="w-4 h-4 text-indigo-600" />
                            <span>PASTE CUSTOM JOB DESCRIPTION FOR INSTANT ATS MATCH:</span>
                          </h5>
                          
                          <textarea
                            rows={3}
                            placeholder="Paste any job description from LinkedIn, Naukri, or AngelList here to check your exact keyword match %..."
                            value={customJobDesc}
                            onChange={(e) => setCustomJobDesc(e.target.value)}
                            className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 font-mono"
                          />

                          {auditReport.customJdMatch && (
                            <div className="mt-4 p-4 rounded-xl bg-indigo-50/50 border border-indigo-200">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-mono font-bold text-slate-900">Custom JD Keyword Match:</span>
                                <span className={`text-sm font-black font-mono ${
                                  auditReport.customJdMatch.matchPercentage >= 70 ? 'text-emerald-700' : 'text-amber-700'
                                }`}>
                                  {auditReport.customJdMatch.matchPercentage}% Match
                                </span>
                              </div>

                              <div className="grid md:grid-cols-2 gap-3 text-xs">
                                <div>
                                  <span className="text-[10px] font-mono font-bold text-emerald-700 block mb-1">FOUND IN YOUR RESUME:</span>
                                  <p className="text-slate-800 font-mono">{auditReport.customJdMatch.foundInResume.join(', ') || 'None'}</p>
                                </div>
                                <div>
                                  <span className="text-[10px] font-mono font-bold text-rose-700 block mb-1">MISSING FROM RESUME:</span>
                                  <p className="text-slate-800 font-mono">{auditReport.customJdMatch.missingFromResume.join(', ') || 'None'}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    )}

                    {/* ── TAB 3: POWER VERBS & BULLET UPGRADES ── */}
                    {activeTab === 'bullets' && (
                      <div className="space-y-6">
                        
                        {/* Power Verbs vs Weak Verbs Status */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase block mb-1">
                              POWER IMPACT VERBS DETECTED ({auditReport.actionVerbs.powerVerbs.length})
                            </span>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {auditReport.actionVerbs.powerVerbs.length > 0 ? (
                                auditReport.actionVerbs.powerVerbs.map((v, i) => (
                                  <span key={i} className="text-xs font-mono bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                                    {v}
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs text-slate-500 font-mono">No strong action verbs found.</span>
                              )}
                            </div>
                          </div>

                          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                            <span className="text-[10px] font-mono font-bold text-amber-700 uppercase block mb-1">
                              WEAK / PASSIVE VERBS FLAGGED ({auditReport.actionVerbs.weakVerbs.length})
                            </span>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {auditReport.actionVerbs.weakVerbs.length > 0 ? (
                                auditReport.actionVerbs.weakVerbs.map((v, i) => (
                                  <span key={i} className="text-xs font-mono bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                                    ⚠️ {v}
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs text-emerald-700 font-mono font-bold">No weak passive verbs detected!</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Bullet Point Transformer (Before vs After) */}
                        <div>
                          <h4 className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-indigo-600" />
                            <span>SENIOR RECRUITER BULLET POINT TRANSFORMATIONS:</span>
                          </h4>

                          <div className="space-y-3">
                            {auditReport.bulletUpgrades.map((item, idx) => (
                              <div key={idx} className="p-4.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                                <div className="space-y-2.5">
                                  <div className="flex items-start gap-2 text-xs text-rose-700 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                                    <span className="font-mono font-bold text-rose-800 shrink-0">❌ BEFORE:</span>
                                    <span className="italic text-slate-700">{item.before}</span>
                                  </div>

                                  <div className="flex items-start justify-between gap-2 text-xs text-emerald-900 bg-emerald-50/80 p-3 rounded-xl border border-emerald-200">
                                    <div className="flex items-start gap-2">
                                      <span className="font-mono font-bold text-emerald-700 shrink-0">✓ AFTER:</span>
                                      <span className="font-medium text-slate-900">{item.after}</span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleCopyBullet(item.after, idx)}
                                      className="text-xs text-slate-500 hover:text-slate-900 shrink-0 p-1.5 rounded-lg hover:bg-emerald-100 transition cursor-pointer"
                                      title="Copy upgraded bullet"
                                    >
                                      {copiedBulletIndex === idx ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}

                    {/* ── TAB 4: PROOF ROADMAP & SALARY VALUATION ── */}
                    {activeTab === 'roadmap' && (
                      <div className="space-y-6">
                        
                        {/* Valuation Comparison Bar */}
                        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-white to-indigo-50/40 border border-indigo-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
                          <div>
                            <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block mb-1">
                              CURRENT MARKET VALUATION (UNVERIFIED PROOF)
                            </span>
                            <span className="text-base font-black text-rose-600">{auditReport.valuation.current}</span>
                          </div>

                          <ArrowRight className="w-6 h-6 text-indigo-600 hidden md:block" />

                          <div className="text-right">
                            <span className="text-[10px] font-mono text-emerald-700 uppercase font-bold block mb-1">
                              POST-SPRINT TARGET VALUATION (VERIFIED PRODUCTION ECOSYSTEM)
                            </span>
                            <span className="text-xl font-black text-emerald-700">{auditReport.valuation.target}</span>
                          </div>
                        </div>

                        {/* 4-Phase Step-by-Step Blueprint */}
                        <div>
                          <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-3">
                            4-PHASE PROOF-OF-WORK SPRINT BLUEPRINT:
                          </h4>

                          <div className="space-y-3">
                            {auditReport.roadmap.map((step, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-4 p-4.5 rounded-2xl bg-white border border-slate-200 shadow-xs"
                              >
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono font-black text-xs flex flex-col items-center justify-center shrink-0">
                                  <span>{step.phase.split(' ')[1]}</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <h5 className="text-xs md:text-sm font-bold text-slate-900">{step.title}</h5>
                                    <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 font-bold">
                                      {step.duration}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{step.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}

                    {/* ── TAB 5: FORMAT HYGIENE & TEXT ── */}
                    {activeTab === 'hygiene' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                            <span className="text-[10px] font-mono text-slate-500 block">Word Count</span>
                            <span className="text-base font-black text-slate-900">{auditReport.formatHealth.wordCount}</span>
                          </div>
                          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                            <span className="text-[10px] font-mono text-slate-500 block">Est. Reading Time</span>
                            <span className="text-base font-black text-slate-900">{auditReport.formatHealth.readingTimeSec}s</span>
                          </div>
                          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                            <span className="text-[10px] font-mono text-slate-500 block">Bullet Points</span>
                            <span className="text-base font-black text-slate-900">{auditReport.formatHealth.bulletCount}</span>
                          </div>
                          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                            <span className="text-[10px] font-mono text-slate-500 block">Hygiene Score</span>
                            <span className="text-base font-black text-emerald-700">{auditReport.formatHealth.hygieneScore}/100</span>
                          </div>
                        </div>

                        {auditReport.formatHealth.issues.length > 0 && (
                          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                            <h5 className="text-xs font-mono font-bold text-amber-800 uppercase mb-2">FORMAT NOTICES:</h5>
                            <ul className="text-xs text-slate-700 space-y-1 font-mono list-disc list-inside">
                              {auditReport.formatHealth.issues.map((iss, i) => (
                                <li key={i}>{iss}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                  </div>

                </motion.div>
              )}

            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              MODE B: 5-POINT MANUAL CHECKLIST DIAGNOSTIC
             ════════════════════════════════════════════════════════════════════ */}
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
                      ? 'bg-indigo-50/80 border-indigo-300 text-slate-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/60'
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
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              CANDIDATE CONTACT DETAILS
             ════════════════════════════════════════════════════════════════════ */}
          <div className="grid md:grid-cols-3 gap-4 mb-8 pt-6 border-t border-slate-200">
            <div>
              <label className="block text-xs font-mono text-slate-500 font-bold mb-1.5 uppercase">CANDIDATE NAME</label>
              <input 
                type="text" 
                placeholder="e.g. Alex Sharma" 
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-500 font-bold mb-1.5 uppercase">WHATSAPP NUMBER</label>
              <input 
                type="text" 
                placeholder="e.g. 9876543210" 
                value={candidatePhone}
                onChange={(e) => setCandidatePhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-500 font-bold mb-1.5 uppercase">CITY / LOCATION</label>
              <input 
                type="text" 
                placeholder="e.g. Indore / Online" 
                value={candidateCity}
                onChange={(e) => setCandidateCity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════════════
              HIGH-CONVERSION CLEVER ACTION BAR (100% ACCURATE & DYNAMIC)
             ════════════════════════════════════════════════════════════════════ */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 flex flex-col lg:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-lg ${
                !isAssessed
                  ? 'bg-slate-200 text-slate-600 shadow-slate-200/40'
                  : liveScore >= 75
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                  : liveScore >= 50
                  ? 'bg-sky-600 text-white shadow-sky-600/20'
                  : liveScore >= 30
                  ? 'bg-amber-600 text-white shadow-amber-600/20'
                  : 'bg-rose-600 text-white shadow-rose-600/20'
              }`}>
                <span className="text-xl font-black">{isAssessed ? `${liveScore}%` : '--'}</span>
                <span className="text-[9px] font-mono uppercase font-bold">
                  {isAssessed ? 'Readiness' : 'Pending'}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block">
                  {isAssessed ? 'DIAGNOSTIC VERDICT' : 'DIAGNOSTIC STATUS'}
                </span>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border mt-0.5 ${
                  !isAssessed
                    ? 'bg-slate-100 text-slate-700 border-slate-300'
                    : liveScore >= 75
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : liveScore >= 50
                    ? 'bg-sky-50 text-sky-800 border-sky-300'
                    : liveScore >= 30
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : 'bg-rose-50 text-rose-800 border-rose-300'
                }`}>
                  {auditMode === 'upload'
                    ? (auditReport ? auditReport.atsStatus : 'Upload Resume Above or Select a Quick Test Sample')
                    : (checkedChecklistCount > 0
                        ? `${checkedChecklistCount}/5 Pillars Met (${checklistScore}% Readiness)`
                        : 'Select Checkpoints Above to Calculate Score')}
                </span>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {auditReport?.valuation
                    ? `Estimated Post-Sprint Target: ${auditReport.valuation.target}`
                    : isAssessed
                    ? `Domain: ${domain.toUpperCase()} Track • Ready for HR Sprint Roadmap`
                    : 'Upload your resume document to get your exact ATS score & 4-phase proof roadmap.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              
              {/* PDF Download Button */}
              {auditReport && (
                <button
                  type="button"
                  onClick={handleDownloadReport}
                  className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-mono font-bold text-xs transition border border-slate-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  title="Print or Save PDF"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Audit PDF</span>
                </button>
              )}

              {/* Action Button */}
              <button
                type="button"
                onClick={handleConnectHR}
                className="flex-1 sm:flex-initial px-7 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs md:text-sm transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-indigo-200" />
                <span>
                  {isAssessed
                    ? 'Claim Free 1-on-1 ATS Optimization & Sprint Plan →'
                    : 'Upload Resume to Run Live Audit →'}
                </span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CandidateEmployabilityAudit;
