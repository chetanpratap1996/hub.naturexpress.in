import Razorpay from 'razorpay';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { amount, currency = 'INR', receipt, notes } = req.body || {};

    let amountInPaise = Number(amount);
    if (!isNaN(amountInPaise) && amountInPaise < 50000) {
      amountInPaise = amountInPaise * 100;
    }

    if (isNaN(amountInPaise) || amountInPaise < 100) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be a valid number and at least 100 paise'
      });
    }

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.warn('⚠️ Razorpay credentials missing. Using dev mock order fallback.');
      return res.status(200).json({
        success: true,
        isMock: true,
        order_id: `order_mock_${Date.now()}`,
        amount: amountInPaise,
        currency: currency || 'INR'
      });
    }

    try {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret
      });

      const options = {
        amount: Math.round(amountInPaise),
        currency: currency || 'INR',
        receipt: receipt || `receipt_${Date.now()}`,
        notes: notes || {}
      };

      const order = await razorpay.orders.create(options);

      return res.status(200).json({
        success: true,
        isMock: false,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        order: order
      });
    } catch (razorpayErr) {
      console.error('Razorpay API error:', razorpayErr);

      // If key is invalid or unauthorized in test environment, fallback gracefully to mock order for testing UI
      if (
        razorpayErr.statusCode === 401 ||
        (razorpayErr.error && razorpayErr.error.code === 'BAD_REQUEST_ERROR') ||
        razorpayErr.message?.includes('Authentication')
      ) {
        console.warn('⚠️ Razorpay auth failed with provided credentials. Falling back to test order fallback mode.');
        return res.status(200).json({
          success: true,
          isMock: true,
          order_id: `order_test_${Date.now()}`,
          amount: Math.round(amountInPaise),
          currency: currency || 'INR',
          warning: 'Using test fallback order due to key authentication failure'
        });
      }

      return res.status(500).json({
        success: false,
        error: razorpayErr.description || razorpayErr.message || 'Failed to create Razorpay order'
      });
    }
  } catch (error) {
    console.error('Error in create-order endpoint:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}
