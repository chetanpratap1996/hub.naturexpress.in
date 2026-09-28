/**
 * Automated Google Sheets / CRM Webhook Integration
 * Forwards audit leads, scholarship applications, and payment confirmations directly to Google Sheets or CRM.
 */

// Google Apps Script Web App URL for Google Sheets CRM
export const GOOGLE_SHEETS_WEBHOOK_URL = 
  import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbxJhwerr_729wJwTw0rkhNgSo5XutZXPs9nL1mZpJ3vsfcLyueu7RMC-DCMspvrO3xC/exec';

/**
 * Send Audit Lead to Google Sheets / Webhook
 */
export const sendLeadToGoogleSheets = async (leadData) => {
  const payload = {
    eventType: 'Audit_Lead',
    timestamp: leadData.timestamp || new Date().toISOString(),
    name: leadData.name,
    phone: leadData.phone,
    city: leadData.city || 'Indore',
    goal: leadData.path === 'job' ? 'High-Paying Job' : 'Freelance Clients',
    track: (leadData.track || '').toUpperCase(),
    score: leadData.score,
    resumeAttached: leadData.resumeAttached ? 'YES' : 'NO',
    resumeName: leadData.resumeName || 'N/A',
    scannedLinksCount: leadData.linksFoundCount || 0,
    scannedSkillsCount: leadData.skillsFoundCount || 0,
    source: 'Skills_Hub_Audit_Engine'
  };

  return sendPayload(payload);
};

/**
 * Send Scholarship Application to Google Sheets / Webhook
 */
export const sendScholarshipToGoogleSheets = async (scholarshipData) => {
  const payload = {
    eventType: 'Scholarship_Application',
    timestamp: scholarshipData.appliedAt || new Date().toISOString(),
    name: scholarshipData.name,
    phone: scholarshipData.phone,
    city: 'N/A',
    goal: 'Scholarship Candidate',
    track: (scholarshipData.track || '').toUpperCase(),
    status: scholarshipData.status,
    reason: scholarshipData.reason || 'Financial support & career transition',
    source: 'Scholarship_Modal'
  };

  return sendPayload(payload);
};

/**
 * Send Payment Confirmation to Google Sheets / CRM Webhook
 */
export const sendPaymentConfirmationToCRM = async (paymentData) => {
  const payload = {
    eventType: 'Payment_Success',
    timestamp: new Date().toISOString(),
    paymentId: paymentData.paymentId,
    orderId: paymentData.orderId || 'DIRECT_PAY',
    amount: paymentData.amount,
    name: paymentData.userDetails?.name || 'N/A',
    email: paymentData.userDetails?.email || 'N/A',
    phone: paymentData.userDetails?.phone || 'N/A',
    city: paymentData.userDetails?.city || 'N/A',
    track: paymentData.trackName || 'Web Development Sprint',
    status: 'PAID',
    source: 'Razorpay_Checkout_Modal'
  };

  return sendPayload(payload);
};

/**
 * Core Fetch Executor (Uses no-cors mode to bypass Google Apps Script CORS restrictions)
 */
const sendPayload = async (payload) => {
  try {
    console.log('🚀 Sending lead to Google Sheets CRM:', payload);

    if (!GOOGLE_SHEETS_WEBHOOK_URL) {
      console.warn('⚠️ Google Sheets Webhook URL not set yet. Lead saved to localStorage.');
      return { success: true, mode: 'local' };
    }

    // Using no-cors allows seamless submission to Google Apps Script Web Apps
    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      mode: 'no-cors',
    });

    console.log('✅ Lead successfully forwarded to Google Sheets Webhook!');
    return { success: true, mode: 'webhook' };
  } catch (err) {
    console.error('❌ Webhook submission error:', err);
    return { success: false, error: err.message };
  }
};
