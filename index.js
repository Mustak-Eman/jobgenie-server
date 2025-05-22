const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/analyze', (req, res) => {
  const { resume, jobDesc } = req.body;

  if (!resume || !jobDesc) {
    return res.status(400).json({ error: 'Missing input' });
  }

  // Fake feedback for demonstration
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

  res.json({ feedback });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
