import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import { Parser } from 'json2csv';
import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Twilio Setup
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

// Temporary in-memory OTP store
const otpStore = {};

// Data storage file
const dataFile = join(__dirname, 'memberships.json');

// Initialize data file if it doesn't exist
async function initializeDataFile() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify([]));
  }
}

// Helper function to read memberships
async function readMemberships() {
  try {
    const data = await fs.readFile(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading memberships:', error);
    return [];
  }
}

// Helper function to write memberships
async function writeMemberships(memberships) {
  try {
    await fs.writeFile(dataFile, JSON.stringify(memberships, null, 2));
  } catch (error) {
    console.error('Error writing memberships:', error);
    throw error;
  }
}

// Google Sheets integration (placeholder)
async function submitToGoogleSheets(membershipData) {
  console.log('Submitting to Google Sheets:', membershipData);
  return true;
}

// ---------------------------
// 🚀 OTP Routes
// ---------------------------

// Send OTP
app.post('/api/otp/send', async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[phone] = { otp, createdAt: Date.now() };

  try {
    await twilioClient.messages.create({
      body: `Your OTP is ${otp}`,
      from: twilioPhone,
      to: phone,
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
});

// Verify OTP
app.post('/api/otp/verify', (req, res) => {
  const { phone, otp } = req.body;

  const record = otpStore[phone];

  if (!record) {
    return res.status(400).json({ message: 'No OTP request found for this phone number' });
  }

  const now = Date.now();
  const isExpired = now - record.createdAt > 5 * 60 * 1000; // 5 minutes

  if (isExpired) {
    delete otpStore[phone];
    return res.status(400).json({ message: 'OTP has expired' });
  }

  if (record.otp === otp) {
    delete otpStore[phone]; // OTP is single-use
    return res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    return res.status(400).json({ message: 'Invalid OTP' });
  }
});

// ---------------------------
// Membership Routes
// ---------------------------

// Submit membership application
app.post('/api/membership', async (req, res) => {
  try {
    const membershipData = {
      id: Date.now().toString(),
      ...req.body,
      submittedAt: new Date().toISOString(),
    };

    const memberships = await readMemberships();
    memberships.push(membershipData);
    await writeMemberships(memberships);

    await submitToGoogleSheets(membershipData);

    res.status(201).json({
      message: 'Membership application submitted successfully',
      id: membershipData.id,
    });
  } catch (error) {
    console.error('Error submitting membership:', error);
    res.status(500).json({ error: 'Failed to submit membership application' });
  }
});

// Get all memberships
app.get('/api/memberships', async (req, res) => {
  try {
    const memberships = await readMemberships();
    res.json(memberships);
  } catch (error) {
    console.error('Error fetching memberships:', error);
    res.status(500).json({ error: 'Failed to fetch memberships' });
  }
});

// Export memberships as CSV
app.get('/api/memberships/export', async (req, res) => {
  try {
    const memberships = await readMemberships();

    const fields = [
      'name',
      'email',
      'phone',
      'college',
      'department',
      'year',
      'interestArea',
      'whyJoin',
      'experience',
      'expectations',
      'submittedAt',
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(memberships);

    res.header('Content-Type', 'text/csv');
    res.attachment('sepnoty-memberships.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error exporting memberships:', error);
    res.status(500).json({ error: 'Failed to export memberships' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ---------------------------
// Start Server
// ---------------------------
async function startServer() {
  await initializeDataFile();

  app.listen(PORT, () => {
    console.log(`Sepnoty Membership API running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
}

startServer().catch(console.error);
