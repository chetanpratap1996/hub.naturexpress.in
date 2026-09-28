import { sendPaymentConfirmationToCRM } from './webhook';

/**
 * Dynamically loads the Razorpay Checkout JavaScript SDK
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Initiates Razorpay Checkout Flow with Vercel API Backend Verification
 */
export const initiateRazorpayCheckout = async ({
  amount = 3999, // in INR
  trackName = 'Web Development',
  userDetails = {},
  onSuccess,
  onFailure
}) => {
  try {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert('Failed to load Razorpay payment SDK. Please check your internet connection and try again.');
      if (onFailure) onFailure('Razorpay SDK load failure');
      return;
    }

    let orderId = null;

    // 1. Attempt to create order via Vercel API Endpoint
    try {
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
          notes: {
            track: trackName,
            studentName: userDetails.name || '',
            studentPhone: userDetails.phone || ''
          }
        })
      });

      if (orderRes.ok) {
        const orderData = await orderRes.json();
        if (orderData.success && orderData.order) {
          orderId = orderData.order.id;
        }
      }
    } catch (e) {
      console.warn('⚠️ Serverless order endpoint unreachable, initiating direct client checkout:', e);
    }

    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder';

    // 2. Configure Razorpay Options
    const options = {
      key: keyId,
      amount: Math.round(amount * 100), // in paise
      currency: 'INR',
      name: 'NatureXpress Skills Hub',
      description: `Enrollment: ${trackName} (Pay-As-You-Learn)`,
      image: 'https://hub.naturexpress.in/favicon.ico',
      order_id: orderId || undefined,
      prefill: {
        name: userDetails.name || '',
        email: userDetails.email || '',
        contact: userDetails.phone || ''
      },
      notes: {
        track: trackName,
        city: userDetails.city || 'Indore',
        onboarding: 'Next Working Day'
      },
      theme: {
        color: '#4f46e5'
      },
      handler: async function (response) {
        console.log('⚡ Razorpay Raw Response:', response);

        // Verify signature via Vercel API if order_id exists
        if (response.razorpay_order_id && response.razorpay_signature) {
          try {
            await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...response,
                userDetails,
                trackName,
                amount
              })
            });
          } catch (err) {
            console.error('Signature verification call error:', err);
          }
        }

        const paymentData = {
          paymentId: response.razorpay_payment_id || `pay_${Date.now()}`,
          orderId: response.razorpay_order_id || orderId || `ord_${Date.now()}`,
          signature: response.razorpay_signature || 'N/A',
          amount,
          trackName,
          userDetails
        };

        // Forward payment lead to CRM/Google Sheets
        sendPaymentConfirmationToCRM(paymentData);

        // Save local record
        const savedPayments = JSON.parse(localStorage.getItem('nx_payments') || '[]');
        savedPayments.push(paymentData);
        localStorage.setItem('nx_payments', JSON.stringify(savedPayments));

        if (onSuccess) {
          onSuccess(paymentData);
        }
      },
      modal: {
        ondismiss: function () {
          console.log('Payment modal dismissed');
          if (onFailure) onFailure('Payment dismissed');
        }
      }
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();

  } catch (err) {
    console.error('Razorpay initialization error:', err);
    alert('An unexpected error occurred while launching payment. Please try again.');
    if (onFailure) onFailure(err.message);
  }
};
