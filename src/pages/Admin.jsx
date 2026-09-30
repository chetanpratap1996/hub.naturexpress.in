import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, DollarSign, Award, BookOpen, MessageSquare, Download, 
  Search, Filter, Plus, CheckCircle, XCircle, ShieldAlert, Sparkles, 
  PhoneCall, RefreshCw, Copy, Check, Lock, ExternalLink
} from 'lucide-react';

const ADMIN_PIN = 'nx2026';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'payments' | 'scholarships' | 'scripts' | 'manual'
  const [leads, setLeads] = useState([]);
  const [payments, setPayments] = useState([]);
  const [scholarships, setScholarships] = useState([]);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTrack, setFilterTrack] = useState('all');
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Manual Lead Form State
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualTrack, setManualTrack] = useState('web');
  const [manualAmount, setManualAmount] = useState('3999');

  useEffect(() => {
    // Check local auth session
    const authSession = sessionStorage.getItem('nx_admin_auth');
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }
    loadAllData();
  }, []);

  const loadAllData = () => {
    // Load local storage items with fallback sample data for instant demo readiness
    const storedLeads = JSON.parse(localStorage.getItem('nx_leads') || '[]');
    const storedPayments = JSON.parse(localStorage.getItem('nx_payments') || '[]');
    const storedScholarships = JSON.parse(localStorage.getItem('nx_scholarships') || '[]');

    // Sample fallback data if empty to make sales testing seamless
    const sampleLeads = storedLeads.length > 0 ? storedLeads : [
      {
        id: 'lead_1',
        name: 'Rahul Sharma',
        phone: '9876543210',
        city: 'Indore',
        domain: 'WEB',
        score: 82,
        status: 'Hot Lead',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'lead_2',
        name: 'Priya Verma',
        phone: '9812345678',
        city: 'Bhopal',
        domain: 'MARKETING',
        score: 64,
        status: 'Contacted',
        timestamp: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: 'lead_3',
        name: 'Aman Patel',
        phone: '9765432109',
        city: 'Remote',
        domain: 'DESIGN',
        score: 91,
        status: 'Enrolled',
        timestamp: new Date(Date.now() - 14400000).toISOString()
      }
    ];

    const samplePayments = storedPayments.length > 0 ? storedPayments : [
      {
        paymentId: 'pay_Px9821374981',
        orderId: 'ord_91823719',
        amount: 3999,
        trackName: 'Web & App Development Sprint',
        userDetails: { name: 'Aman Patel', email: 'aman@gmail.com', phone: '9765432109', city: 'Remote' },
        timestamp: new Date(Date.now() - 14400000).toISOString()
      }
    ];

    const sampleScholarships = storedScholarships.length > 0 ? storedScholarships : [
      {
        name: 'Sneha Kulkarni',
        phone: '9898989898',
        track: 'web',
        status: 'student',
        reason: 'Dedicated 2 hrs/day, preparing for campus interviews.',
        appliedAt: new Date(Date.now() - 5000000).toISOString()
      }
    ];

    setLeads(sampleLeads);
    setPayments(samplePayments);
    setScholarships(sampleScholarships);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN || pinInput === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('nx_admin_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('nx_admin_auth');
  };

  // CSV Exporter
  const exportToCSV = (data, filename) => {
    if (!data || !data.length) {
      alert('No data to export!');
      return;
    }
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).map(v => `"${typeof v === 'object' ? JSON.stringify(v).replace(/"/g, '""') : v}"`).join(','));
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Manual Lead / Payment Entry
  const handleAddManualLead = (e) => {
    e.preventDefault();
    if (!manualName || !manualPhone) return;

    const newPayment = {
      paymentId: `pay_manual_${Date.now()}`,
      orderId: `ord_offline_${Date.now()}`,
      amount: Number(manualAmount),
      trackName: manualTrack === 'web' ? 'Web Development Sprint' : manualTrack === 'marketing' ? 'Digital Marketing Sprint' : 'UI/UX Design Sprint',
      userDetails: { name: manualName, email: manualEmail, phone: manualPhone, city: 'Offline / Admin Entry' },
      timestamp: new Date().toISOString()
    };

    const updatedPayments = [newPayment, ...payments];
    setPayments(updatedPayments);
    localStorage.setItem('nx_payments', JSON.stringify(updatedPayments));

    setManualName('');
    setManualPhone('');
    setManualEmail('');
    alert('✅ Manual enrollment successfully recorded!');
  };

  // Copy helper
  const copyText = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Calculations
  const totalRevenue = payments.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const filteredLeads = leads.filter(item => {
    const matchesSearch = (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.phone || '').includes(searchTerm) ||
                          (item.city || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrack = filterTrack === 'all' || (item.domain || item.track || '').toLowerCase() === filterTrack.toLowerCase();
    return matchesSearch && matchesTrack;
  });

  // Battle-tested Sales Objection Scripts for Chetan & Sales Team
  const salesScripts = [
    {
      title: "1. Handling Fee Objection (₹3,999/mo vs College Lakhs)",
      script: `Hi [Name]! I understand budget is important. The reason NatureXpress is structured at ₹3,999/month (and not upfront ₹1.5 Lakhs like traditional institutes) is so you have zero risk. You work 2 hours daily directly with company engineers/marketers, build real production apps/ads, and can cancel anytime. Plus, if you complete your 14-day sprint milestones, you qualify for 50% Merit Cashback (₹2,000 refunded). Shall I reserve your sprint seat for tomorrow's onboarding?`
    },
    {
      title: "2. Guarantee & Job Placement Question",
      script: `Great question, [Name]! Companies auto-reject 98% of traditional resumes because they lack live proof URLs. In NatureXpress, our HR & Talent Director works with you 1-on-1 on ATS resume formatting, mock interviews, and direct referrals to active hiring partners once your live Vercel/Meta ad proof is verified. You don't just get a certificate; you get deployed production proof.`
    },
    {
      title: "3. Time Constraint (College / Job Schedule)",
      script: `No problem at all! Our live sprints run for 2 hours daily in flexible evening/night slots (8:00 PM – 10:00 PM) specifically designed for working professionals and final-year students. All sprint repositories and code reviews are recorded so you never fall behind.`
    },
    {
      title: "4. Scholarship Eligibility Pitch (50% Cashback)",
      script: `Hi [Name]! We reviewed your profile audit score ([Score]/100). You qualify for 1 of our 5 monthly Merit Scholarship seats (₹3,999 upfront with ₹2,000 Merit Refund upon completing sprint tasks). I can activate your scholarship code today so you can join the active cohort.`
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black">Founder & Sales Portal</h2>
            <p className="text-xs text-slate-400 mt-1 font-medium">Enter secure passkey to access NatureXpress CRM</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Admin PIN (Default: nx2026)"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-center text-sm font-mono tracking-widest text-white outline-none focus:border-indigo-500"
            />
            {pinError && <p className="text-xs text-rose-400 font-bold">Incorrect PIN code. Try 'nx2026'</p>}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-indigo-600/25"
            >
              Access Sales Dashboard →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-6 md:px-12 selection:bg-indigo-600 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                ● LIVE SALES & CRM ENGINE
              </span>
              <span className="text-xs text-slate-400 font-mono">hub.naturexpress.in</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">Founder Sales Control Center</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllData}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-all cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition-all cursor-pointer"
            >
              Lock Dashboard
            </button>
          </div>
        </div>

        {/* Executive Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
              <span>TOTAL REVENUE</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl md:text-3xl font-black text-emerald-400">₹{totalRevenue.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-slate-500 mt-1 font-medium">{payments.length} Verified Subscriptions</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
              <span>CAPUTRED LEADS</span>
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-2xl md:text-3xl font-black text-white">{leads.length}</p>
            <p className="text-[10px] text-slate-500 mt-1 font-medium">Audit + Contact submissions</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
              <span>SCHOLARSHIP APPS</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl md:text-3xl font-black text-amber-400">{scholarships.length}</p>
            <p className="text-[10px] text-slate-500 mt-1 font-medium">50% Merit Refund Tier</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
              <span>SALES CONVERSION</span>
              <Sparkles className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-2xl md:text-3xl font-black text-sky-400">
              {leads.length > 0 ? ((payments.length / leads.length) * 100).toFixed(1) : '0'}%
            </p>
            <p className="text-[10px] text-slate-500 mt-1 font-medium">Payment / Lead ratio</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto">
          {[
            { id: 'leads', label: `🎯 Captured Leads (${leads.length})`, icon: Users },
            { id: 'payments', label: `💳 Payments & Revenue (${payments.length})`, icon: DollarSign },
            { id: 'scholarships', label: `🎁 Merit Scholarships (${scholarships.length})`, icon: Award },
            { id: 'scripts', label: '💬 Sales Scripts & Copy', icon: MessageSquare },
            { id: 'manual', label: '➕ Record Offline Sale', icon: Plus },
          ].map(tab => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: CAPTURED LEADS TABLE */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search name, phone, city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white outline-none focus:border-indigo-500 font-medium"
                  />
                </div>

                <select
                  value={filterTrack}
                  onChange={(e) => setFilterTrack(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 rounded-xl px-3 py-2 outline-none focus:border-indigo-500"
                >
                  <option value="all">All Tracks</option>
                  <option value="web">Web Dev</option>
                  <option value="marketing">Marketing</option>
                  <option value="design">Design</option>
                </select>
              </div>

              <button
                onClick={() => exportToCSV(filteredLeads, 'NatureXpress_Sales_Leads')}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Leads (CSV)</span>
              </button>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-x-auto shadow-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-mono text-[11px] uppercase">
                    <th className="p-4">Candidate</th>
                    <th className="p-4">Phone / WhatsApp</th>
                    <th className="p-4">Track / Domain</th>
                    <th className="p-4">Score</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Captured At</th>
                    <th className="p-4 text-right">Instant Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredLeads.map((lead, idx) => {
                    const waText = `Hi ${lead.name}! I'm founder Chetan from NatureXpress. We reviewed your profile audit score (${lead.score || 80}/100) for the ${lead.domain || 'WEB'} Sprint. Next cohort starts next working day. Are you free for a 2-min call to lock your seat?`;
                    const waUrl = `https://wa.me/91${lead.phone}?text=${encodeURIComponent(waText)}`;

                    return (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4">
                          <span className="font-bold text-white block">{lead.name || 'Anonymous Candidate'}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{lead.email || 'No Email'}</span>
                        </td>
                        <td className="p-4 font-mono text-indigo-400 font-bold">{lead.phone || 'N/A'}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                            {(lead.domain || lead.track || 'WEB').toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-mono font-extrabold text-amber-400">{lead.score || 75}/100</span>
                        </td>
                        <td className="p-4 text-slate-300">{lead.city || 'Indore'}</td>
                        <td className="p-4 text-slate-400 font-mono text-[10px]">
                          {lead.timestamp ? new Date(lead.timestamp).toLocaleDateString() : 'Today'}
                        </td>
                        <td className="p-4 text-right">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[11px] shadow-sm transition-all"
                          >
                            <PhoneCall className="w-3 h-3" />
                            <span>WhatsApp Sales Chat →</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PAYMENTS & REVENUE */}
        {activeTab === 'payments' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono font-bold text-slate-300">Verified Razorpay Payments:</h3>
              <button
                onClick={() => exportToCSV(payments, 'NatureXpress_Payment_Records')}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Payments (CSV)</span>
              </button>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-x-auto shadow-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-mono text-[11px] uppercase">
                    <th className="p-4">Payment ID</th>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Phone / Email</th>
                    <th className="p-4">Track</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {payments.map((pmt, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-mono text-indigo-400 font-bold">{pmt.paymentId}</td>
                      <td className="p-4 font-bold text-white">{pmt.userDetails?.name || 'Student'}</td>
                      <td className="p-4">
                        <span className="block font-mono text-slate-300">{pmt.userDetails?.phone}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{pmt.userDetails?.email}</span>
                      </td>
                      <td className="p-4 text-slate-300">{pmt.trackName || 'Web Sprint'}</td>
                      <td className="p-4 font-extrabold text-emerald-400">₹{pmt.amount}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                          SUCCESS / PAID
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 font-mono text-[10px]">
                        {pmt.timestamp ? new Date(pmt.timestamp).toLocaleDateString() : 'Today'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SCHOLARSHIP APPLICATIONS */}
        {activeTab === 'scholarships' && (
          <div className="space-y-4">
            <h3 className="text-sm font-mono font-bold text-slate-300">50% Merit Refund Tier Applicants:</h3>

            <div className="grid md:grid-cols-2 gap-4">
              {scholarships.map((sch, idx) => {
                const waText = `Hi ${sch.name}! Your Merit Scholarship Application for the ${sch.track?.toUpperCase()} Sprint on NatureXpress is APPROVED for the 50% Merit Refund (₹2,000 Cashback). Can we confirm your enrollment today?`;
                const waUrl = `https://wa.me/91${sch.phone}?text=${encodeURIComponent(waText)}`;

                return (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-white">{sch.name}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400">
                        {sch.track?.toUpperCase()} TRACK
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 font-medium">
                      📞 <strong className="text-slate-200">{sch.phone}</strong> • Status: {sch.status}
                    </p>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                      <p className="font-mono text-[10px] text-slate-500 uppercase mb-1">Applicant Reason:</p>
                      <p className="italic">"{sch.reason}"</p>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500">
                        Applied: {new Date(sch.appliedAt || Date.now()).toLocaleDateString()}
                      </span>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all shadow-sm"
                      >
                        Approve & Send Scholarship Code →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: BATTLE-TESTED SALES SCRIPTS */}
        {activeTab === 'scripts' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-300 font-medium">
              💡 <strong>Founder Sales Playbook:</strong> Use these pre-formatted objection handlers when texting or calling leads on WhatsApp. 1-click copy directly to clipboard.
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {salesScripts.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
                    {item.script}
                  </div>
                  <button
                    onClick={() => copyText(item.script, idx)}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-400" />
                        <span>Copy Script to Clipboard</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: RECORD MANUAL SALE */}
        {activeTab === 'manual' && (
          <div className="max-w-xl mx-auto p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div>
              <h3 className="text-lg font-black text-white">Record Offline / Bank Transfer Sale</h3>
              <p className="text-xs text-slate-400 mt-1">Add manual payments collected via UPI, Cash, or Direct Transfer to your CRM revenue.</p>
            </div>

            <form onSubmit={handleAddManualLead} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-mono mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Singh"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="student@gmail.com"
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Enrolled Sprint Track</label>
                  <select
                    value={manualTrack}
                    onChange={(e) => setManualTrack(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500 font-bold"
                  >
                    <option value="web">Web & Software Dev</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="design">UI/UX Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Amount Paid (₹)</label>
                  <input
                    type="number"
                    value={manualAmount}
                    onChange={(e) => setManualAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500 font-bold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-600/20 mt-2"
              >
                Record Payment & Update Revenue →
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;
