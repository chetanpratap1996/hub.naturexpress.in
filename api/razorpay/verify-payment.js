/**
 * Vercel Serverless Function: Verify Razorpay Payment Signature
 * Endpoint: POST /api/razorpay/verify-payment
 */

import crypto from 'crypto';

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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userDetails, trackName, amount } = req.body || {};

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      console.warn('⚠️ RAZORPAY_KEY_SECRET missing in environment. Verification passing in mock mode.');
      return res.status(200).json({
        success: true,
        verified: true,
        isMock: true,
        message: 'Payment verified (Dev Mock Mode)'
      });
    }

    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      console.error('❌ Razorpay Signature Verification Failed');
      return res.status(400).json({
        success: false,
        verified: false,
        error: 'Invalid payment signature'
      });
    }

    // Trigger external notification / webhook if needed
    console.log('✅ Payment signature verified successfully:', {
      razorpay_payment_id,
      razorpay_order_id,
      trackName,
      amount,
      userDetails
    });

    return res.status(200).json({
      success: true,
      verified: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      message: 'Payment signature verified successfully'
    });
  } catch (error) {
    console.error('Server error verifying payment:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
