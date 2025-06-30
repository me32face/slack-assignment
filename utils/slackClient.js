const axios = require('axios');
require('dotenv').config();

const token = process.env.SLACK_BOT_TOKEN;

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

exports.sendMessage = async (channel, text) => {
  const res = await axios.post('https://slack.com/api/chat.postMessage', {
    channel,
    text,
  }, { headers });
  return res.data;
};

exports.scheduleMessage = async (channel, text, postAt) => {
  const res = await axios.post('https://slack.com/api/chat.scheduleMessage', {
    channel,
    text,
    post_at: postAt,
  }, { headers });
  return res.data;
};

exports.updateMessage = async (channel, ts, text) => {
  const res = await axios.post('https://slack.com/api/chat.update', {
    channel,
    ts,
    text,
  }, { headers });
  return res.data;
};

exports.deleteMessage = async (channel, ts) => {
  const res = await axios.post('https://slack.com/api/chat.delete', {
    channel,
    ts,
  }, { headers });
  return res.data;
};

// Simulated fetch (Slack doesn't offer fetch-by-ts)
exports.fetchMessage = async (channel, ts) => {
  return {
    message: `Message with timestamp ${ts} in channel ${channel} fetched (simulated)`,
  };
};
