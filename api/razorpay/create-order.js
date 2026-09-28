/**
 * Vercel Serverless Function: Create Razorpay Order
 * Endpoint: POST /api/razorpay/create-order
 */

export default async function handler(req, res) {
  // CORS setup
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

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.warn('⚠️ Razorpay credentials missing in environment variables. Falling back to test payload mode.');
      // In dev fallback, generate a mock order
      return res.status(200).json({
        success: true,
        isMock: true,
        order: {
          id: `order_mock_${Date.now()}`,
          amount: (amount || 3999) * 100,
          currency: 'INR',
          receipt: receipt || `receipt_${Date.now()}`
        }
      });
    }

    const authHeader = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`;

    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Amount in paise
        currency,
        receipt: receipt || `rec_${Date.now()}`,
        notes: notes || {}
      })
    });

    const orderData = await razorpayResponse.json();

    if (!razorpayResponse.ok) {
      console.error('Razorpay API error:', orderData);
      return res.status(razorpayResponse.status).json({
        success: false,
        error: orderData.error?.description || 'Failed to create Razorpay order'
      });
    }

    return res.status(200).json({
      success: true,
      isMock: false,
      order: orderData
    });
  } catch (error) {
    console.error('Server error creating order:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
