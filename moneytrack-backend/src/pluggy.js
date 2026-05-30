const { PluggyClient } = require("pluggy-sdk");

const pluggy = new PluggyClient({
  clientId: process.env.PLUGGY_CLIENT_ID,
  clientSecret: process.env.PLUGGY_CLIENT_SECRET,
});

module.exports = pluggy;
