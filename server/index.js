const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Route imports
const questionRoutes = require('./routes/questionRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config({ path: path.join(__dirname, '.env') });
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Diagnostic endpoint (remove after debugging)
const mongoose = require('mongoose');
app.get('/api/debug', async (req, res) => {
  const checks = {};
  checks.nodeEnv = process.env.NODE_ENV || 'not set';
  checks.jwtSecretSet = !!process.env.JWT_SECRET;
  checks.mongoUriSet = !!process.env.MONGO_URI;
  checks.mongoState = ['disconnected','connected','connecting','disconnecting'][mongoose.connection.readyState];
  
  // Test bcrypt
  try {
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('test', salt);
    checks.bcrypt = 'ok';
  } catch (e) {
    checks.bcrypt = e.message;
  }

  // Test JWT
  try {
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ test: true }, process.env.JWT_SECRET || 'fallback', { expiresIn: '1m' });
    checks.jwt = 'ok';
  } catch (e) {
    checks.jwt = e.message;
  }

  // Test DB write
  try {
    const User = require('./models/User');
    const count = await User.countDocuments();
    checks.dbRead = `ok (${count} users)`;
  } catch (e) {
    checks.dbRead = e.message;
  }

  res.json(checks);
});

// Test signup (remove after debugging)
app.post('/api/test-signup', async (req, res) => {
  try {
    const User = require('./models/User');
    const jwt = require('jsonwebtoken');
    const { name, email, password } = req.body;
    res.json({ step: 'parsed body', name, email, hasPassword: !!password });
  } catch (e) {
    res.status(500).json({ step: 'failed', error: e.message, stack: e.stack });
  }
});
app.post('/api/test-signup2', async (req, res) => {
  try {
    const User = require('./models/User');
    const jwt = require('jsonwebtoken');
    const { name, email, password } = req.body;
    const user = await User.create({ name, email: email + '.test', password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ step: 'complete', userId: user._id, token: token.substring(0, 20) + '...' });
  } catch (e) {
    res.status(500).json({ step: 'failed', error: e.message, stack: e.stack });
  }
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});