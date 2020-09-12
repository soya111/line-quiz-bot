const line = require('@line/bot-sdk');
const fs = require('fs');

require("dotenv").config();

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};


const client = new line.Client(config);

client.setRichMenuImage('0', fs.createReadStream('./static/richMenuImg.jpg'))