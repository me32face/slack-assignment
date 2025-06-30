const express = require('express');
const axios = require('axios');
const router = express.Router();
const {
  sendMessage,
  scheduleMessage,
  updateMessage,
  deleteMessage,
  fetchMessage
} = require('../utils/slackClient');

// OAuth callback
router.get('/oauth/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post('https://slack.com/api/oauth.v2.access', null, {
      params: {
        code,
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
      },
    });

    console.log("OAuth success:", response.data);

    if (response.data.ok) {
      res.send(`✅ App installed successfully on team: ${response.data.team?.name}`);
    } else {
      res.status(400).send(`❌ OAuth Error: ${response.data.error}`);
    }

  } catch (error) {
    console.error("OAuth error:", error.response?.data || error.message);
    res.status(500).send('❌ Internal Server Error during OAuth');
  }
});


// Send a message
router.post('/send', async (req, res) => {
  const { channel, text } = req.body;
  const result = await sendMessage(channel, text);
  res.send(result);
});

// Schedule a message
router.post('/schedule', async (req, res) => {
  const { channel, text, postAt } = req.body;
  const result = await scheduleMessage(channel, text, postAt);
  res.send(result);
});

// Update message
router.post('/update', async (req, res) => {
  const { channel, ts, text } = req.body;
  const result = await updateMessage(channel, ts, text);
  res.send(result);
});

// Delete message
router.post('/delete', async (req, res) => {
  const { channel, ts } = req.body;
  const result = await deleteMessage(channel, ts);
  res.send(result);
});

// Fetch message (simulated)
router.get('/fetch/:channel/:ts', async (req, res) => {
  const { channel, ts } = req.params;
  const result = await fetchMessage(channel, ts);
  res.send(result);
});

module.exports = router;
