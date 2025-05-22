const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Define Submission schema/model
const Submission = mongoose.model('Submission', {
  resume: String,
  jobDesc: String,
  feedback: String,
  timestamp: { type: Date, default: Date.now }
});

// ✅ Route 1: Health check
app.get('/', (req, res) => {
  res.send('🌐 JobGenie backend is running.');
});

// ✅ Route 2: Analyze and Save Feedback
app.post('/analyze', async (req, res) => {
  const { resume, jobDesc } = req.body;

  if (!resume || !jobDesc) {
    return res.status(400).json({ error: 'Missing input' });
  }

  // Simulated feedback for demo purposes
  const feedback = `
✅ Match Score: 78%

🟢 Strengths:
• Experience matches job keywords
• Strong technical foundation
• Clear education section

🟡 Areas to Improve:
• Add measurable achievements
• Tailor summary to this job
• Include more recent projects

🎤 Possible Interview Questions:
1. Tell me about a challenge in your last project.
2. How do you handle tight deadlines?
`;

  try {
    const saved = await Submission.create({ resume, jobDesc, feedback });
    res.json({ feedback, saved });
  } catch (err) {
    console.error('❌ Failed to save submission:', err.message);
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});

// ✅ Route 3: Get recent submissions (optional)
app.get('/submissions', async (req, res) => {
  try {
    const entries = await Submission.find().sort({ timestamp: -1 }).limit(10);
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
