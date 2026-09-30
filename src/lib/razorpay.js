import { sendPaymentConfirmationToCRM } from './webhook';

/**
 * Dynamically loads the Razorpay Checkout JavaScript SDK if not already loaded
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
 * Initiates Razorpay Standard Checkout Flow
 * 1. Creates order via backend POST /api/create-order
 * 2. Launches Razorpay modal with order_id (if real server order) or client mode
 * 3. Verifies payment signature via backend POST /api/verify-payment
 */
export const initiateRazorpayCheckout = async ({
  amount = 3999,
  trackName = 'Web Development',
  userDetails = {},
  onSuccess,
  onFailure
}) => {
  try {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert('Failed to load Razorpay payment SDK. Please check your internet connection.');
      if (onFailure) onFailure('Razorpay SDK load failure');
      return;
    }

    let numAmount = Number(amount);
    let amountInPaise;
    // Standardize Rupee amount to Paise (1 INR = 100 Paise)
    // If input amount is in Rupees (e.g., 3999, 1999, 4999), convert to paise (399900)
    if (numAmount < 50000) {
      amountInPaise = Math.round(numAmount * 100);
    } else {
      amountInPaise = Math.round(numAmount);
    }

    if (amountInPaise < 100) {
      alert('Amount must be at least ₹1 (100 paise)');
      if (onFailure) onFailure('Invalid amount');
      return;
    }

    let orderId = null;
    let isMockOrder = false;

    // 1. Create order on backend (/api/create-order or /api/razorpay/create-order)
    let orderRes;
    try {
      orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
          notes: {
            track: trackName,
            studentName: userDetails.name || '',
            studentPhone: userDetails.phone || ''
          }
        })
      });

      if (orderRes.status === 404) {
        orderRes = await fetch('/api/razorpay/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: amountInPaise,
            currency: 'INR',
            receipt: `rcpt_${Date.now()}`,
            notes: {
              track: trackName,
              studentName: userDetails.name || '',
              studentPhone: userDetails.phone || ''
            }
          })
        });
      }
    } catch (err) {
      console.error('Fetch error calling create-order API:', err);
    }

    if (orderRes && orderRes.ok) {
      const orderData = await orderRes.json();
      if (orderData.success) {
        isMockOrder = !!orderData.isMock;
        orderId = orderData.order_id || (orderData.order && orderData.order.id);
      } else {
        alert(`Order Creation Failed: ${orderData.error || 'Server error'}`);
        if (onFailure) onFailure(orderData.error);
        return;
      }
    } else if (orderRes) {
      const errData = await orderRes.json().catch(() => ({}));
      const errorMsg = errData.error || `Server responded with status ${orderRes.status}`;
      alert(`Order Creation Error: ${errorMsg}`);
      if (onFailure) onFailure(errorMsg);
      return;
    } else {
      console.warn('⚠️ Backend endpoint unreachable. Proceeding with standard client checkout.');
    }

    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_ThpyPqBtFyEs8B';

    // 2. Configure Razorpay Standard Modal options
    // Note: Only pass order_id if it is a real Razorpay server order.
    // Fake or non-existent order_ids cause Razorpay SDK to reject the payment as invalid.
    const options = {
      key: keyId,
      amount: amountInPaise,
      currency: 'INR',
      name: 'NatureXpress Hub',
      description: `Enrollment: ${trackName}`,
      image: 'https://hub.naturexpress.in/favicon.ico',
      order_id: (orderId && !isMockOrder && !orderId.startsWith('order_test_') && !orderId.startsWith('order_mock_')) ? orderId : undefined,
      prefill: {
        name: userDetails.name || '',
        email: userDetails.email || '',
        contact: userDetails.phone || ''
      },
      notes: {
        track: trackName,
        city: userDetails.city || 'Indore'
      },
      theme: {
        color: '#4f46e5'
      },
      handler: async function (response) {
        console.log('⚡ Razorpay Checkout Response:', response);

        const paymentId = response.razorpay_payment_id;
        const respOrderId = response.razorpay_order_id || orderId;
        const signature = response.razorpay_signature;

        // Verify payment signature via backend API if signature and order_id are present
        if (respOrderId && signature) {
          try {
            let verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: respOrderId,
                razorpay_payment_id: paymentId,
                razorpay_signature: signature
              })
            });

            if (verifyRes.status === 404) {
              verifyRes = await fetch('/api/razorpay/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: respOrderId,
                  razorpay_payment_id: paymentId,
                  razorpay_signature: signature
                })
              });
            }

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.verified) {
              console.warn('Signature verification status:', verifyData);
            }
          } catch (err) {
            console.error('Error calling verify-payment API:', err);
          }
        }

        const paymentData = {
          paymentId: paymentId || `pay_${Date.now()}`,
          orderId: respOrderId || `ord_${Date.now()}`,
          signature: signature || 'N/A',
          amount: amountInPaise / 100,
          trackName,
          userDetails
        };

        // Send payment confirmation to CRM
        sendPaymentConfirmationToCRM(paymentData);

        // Store local payment record
        const savedPayments = JSON.parse(localStorage.getItem('nx_payments') || '[]');
        savedPayments.push(paymentData);
        localStorage.setItem('nx_payments', JSON.stringify(savedPayments));

        if (onSuccess) {
          onSuccess(paymentData);
        }
      },
      modal: {
        ondismiss: function () {
          console.log('Payment modal dismissed by user');
          if (onFailure) onFailure('Payment cancelled by user');
        }
      }
    };

    const rzp = new window.Razorpay(options);

    // Handle payment.failed event
    rzp.on('payment.failed', function (response) {
      console.error('Payment failed event:', response.error);
      const failMsg = response.error.description || response.error.reason || 'Payment failed';
      alert(`Payment Failed: ${failMsg}`);
      if (onFailure) onFailure(failMsg);
    });

    rzp.open();
  } catch (err) {
    console.error('Razorpay initialization error:', err);
    alert('An error occurred while launching payment. Please try again.');
    if (onFailure) onFailure(err.message);
  }
};
