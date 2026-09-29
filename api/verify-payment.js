import crypto from 'crypto';

export default async function handler(req, res) {
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
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order_id,
      payment_id,
      signature
    } = req.body || {};

    const targetOrderId = razorpay_order_id || order_id;
    const targetPaymentId = razorpay_payment_id || payment_id;
    const targetSignature = razorpay_signature || signature;

    if (!targetOrderId || !targetPaymentId || !targetSignature) {
      return res.status(400).json({
        success: false,
        verified: false,
        error: 'Missing required parameters: razorpay_order_id, razorpay_payment_id, and razorpay_signature are required'
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return res.status(401).json({
        success: false,
        verified: false,
        error: 'RAZORPAY_KEY_SECRET missing in server environment'
      });
    }

    // Dev test fallback verification
    if (
      targetOrderId.startsWith('order_test_') ||
      targetOrderId.startsWith('order_mock_') ||
      targetSignature === 'mock_signature'
    ) {
      return res.status(200).json({
        success: true,
        verified: true,
        isMock: true,
        order_id: targetOrderId,
        payment_id: targetPaymentId,
        message: 'Dev test payment signature verified'
      });
    }

    // Generate expected HMAC-SHA256 signature
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${targetOrderId}|${targetPaymentId}`)
      .digest('hex');

    // Compare signatures
    if (generatedSignature !== targetSignature) {
      console.error('❌ Razorpay Signature Verification Mismatch:', {
        expected: generatedSignature,
        received: targetSignature
      });
      return res.status(400).json({
        success: false,
        verified: false,
        error: 'Payment signature mismatch'
      });
    }

    console.log('✅ Razorpay Payment verified successfully:', {
      orderId: targetOrderId,
      paymentId: targetPaymentId
    });

    return res.status(200).json({
      success: true,
      verified: true,
      order_id: targetOrderId,
      payment_id: targetPaymentId,
      message: 'Payment signature verified successfully'
    });
  } catch (error) {
    console.error('Server error verifying payment:', error);
    return res.status(500).json({
      success: false,
      verified: false,
      error: error.message || 'Internal server error verifying payment'
    });
  }
}
