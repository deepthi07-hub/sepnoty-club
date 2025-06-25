const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const OTP = require('../models/otpModel');
require('dotenv').config();

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// ✅ Send OTP
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Send SMS via Twilio
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    // Remove old OTPs for this phone
    await OTP.deleteMany({ phone });

    // Save OTP in DB
    const newOtp = new OTP({ phone, otp });
    await newOtp.save();

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
});

// ✅ Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ message: 'Phone number and OTP are required' });
  }

  const validOtp = await OTP.findOne({ phone, otp });

  if (validOtp) {
    await OTP.deleteMany({ phone }); // OTP is single-use
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid or expired OTP' });
  }
});

module.exports = router;
