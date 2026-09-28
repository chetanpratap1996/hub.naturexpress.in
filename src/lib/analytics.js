/**
 * Analytics & Conversion Tracking Helper (GA4 + Meta / Facebook Pixel)
 * Triggers conversion events when students submit audits, apply for scholarships, or open WhatsApp.
 */

// Safe tracking helper for Meta Pixel & Google Analytics 4
export const trackEvent = (eventName, params = {}) => {
  try {
    // 1. Meta (Facebook) Pixel Event Tracking
    if (typeof window !== 'undefined' && window.fbq) {
      if (['Lead', 'CompleteRegistration', 'Contact', 'SubmitApplication'].includes(eventName)) {
        window.fbq('track', eventName, params);
      } else {
        window.fbq('trackCustom', eventName, params);
      }
    }

    // 2. Google Analytics 4 (GA4) Event Tracking
    if (typeof window !== 'undefined' && window.gtag) {
      const gaEventName = eventName === 'Lead' ? 'generate_lead' : eventName.toLowerCase();
      window.gtag('event', gaEventName, params);
    }

    console.log(`📊 [Analytics Event]: ${eventName}`, params);
  } catch (err) {
    console.warn('Analytics tracking warning:', err);
  }
};

// Convenience helpers
export const trackLeadSubmission = (data) => {
  trackEvent('Lead', {
    content_name: 'Audit_Lead_Submission',
    score: data.score,
    track: data.track,
    path: data.path,
    resume_attached: data.resumeAttached || false,
    value: 3999,
    currency: 'INR'
  });
};

export const trackScholarshipApplication = (data) => {
  trackEvent('SubmitApplication', {
    content_name: 'Scholarship_Application',
    track: data.track,
    status: data.status,
    value: 3999,
    currency: 'INR'
  });
};

export const trackWhatsAppContact = (source = 'General') => {
  trackEvent('Contact', {
    method: 'WhatsApp',
    contact_source: source
  });
};
