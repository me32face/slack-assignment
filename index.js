const express = require('express');
const dotenv = require('dotenv');
const slackRoutes = require('./routes/slack');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/slack', slackRoutes);

app.get('/', (req, res) => {
  res.send('Slack API Assignment is Running!');
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
