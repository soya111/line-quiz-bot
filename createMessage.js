"use strict";

const line = require("@line/bot-sdk");
const { returnQuizDataJson } = require("./returnQuizDataJson");
require("dotenv").config();

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

module.exports = { pushInitMessage, pushQuiz, pushCorrectMessage, pushIncorrectMessage };

function pushInitMessage(replyToken) {
  return client.replyMessage(replyToken, {
    type: "template",
    altText: "日向坂46クイズ",
    template: {
      type: "buttons",
      thumbnailImageUrl:
        "https://cdn.hinatazaka46.com/images/14/82f/b294ff812792aac4abb9fc4dc91ba.jpg",
      title: "日向坂46クイズ",
      text: "日向坂46の知識を試そう！",
      actions: [
        {
          label: "クイズ",
          type: "postback",
          data: '{"type":"push_quiz"}',
          text: "クイズ",
        },
      ],
    },
  });
}

function pushQuiz(replyToken) {
  // const quiz = {
  //   thumbnailImageUrl:
  //     "https://cdn.hinatazaka46.com/images/14/9ff/c742fa039c222dd3fe1a7c0469823/400_1440_102400.jpg",
  //   title: "日向坂クイズ第一問",
  //   text: "日向坂46のメンバーで一番足が速いのは？",
  //   type: "quiz",
  //   choices: [
  //     {
  //       text: "小坂奈緒",
  //       data: {
  //         isCorrect: false,
  //       },
  //     },
  //   ],
  // };
  const quiz = returnQuizDataJson();

  const actions = quiz.choices.map((choice) => {
    return {
      label: choice.text,
      type: "postback",
      text: choice.text,
      data: `{"type":"${quiz.type}","isCorrect":${choice.data.isCorrect}}`,
    };
  });

  return client.replyMessage(replyToken, {
    type: "template",
    altText: "日向坂46クイズ",
    template: {
      type: "buttons",
      thumbnailImageUrl: quiz.thumbnailImageUrl,
      title: quiz.title,
      text: quiz.text,
      actions: actions,
    },
  });
}

function pushCorrectMessage(replyToken) {
  const thumbnailImageUrls = [
    "https://cdn.wikiwiki.jp/to/w/hinataword/%E3%81%8D/::ref/n2i9190225-0129250941.jpg?rev=ed2646f5723297906ad82132767b837d&t=20190414223603",
    "https://assets.st-note.com/production/uploads/images/23190065/9a9ea2c99ee461448d4504158c495111.jpeg?fit=bounds&format=jpeg&height=500&quality=45&width=500",
    "https://i.pinimg.com/originals/89/2a/80/892a8092f71495fa42d6d3c9b28ca1e4.jpg",
    "https://pbs.twimg.com/media/ETujOv7U8AEM6b0.jpg"
  ];

  return client.replyMessage(replyToken,
    {
      type: "template",
      altText: "日向坂46クイズ",
      template: {
        type: "buttons",
        thumbnailImageUrl: thumbnailImageUrls[Math.floor(Math.random() * thumbnailImageUrls.length)],
        title: "正解",
        text: "おめでとう！",
        actions: [
          {
            label: "次のクイズへ",
            type: "postback",
            data: '{"type":"push_quiz"}',
            text: "次のクイズへ",
          },
        ],
      },
    }
  );
}

function pushIncorrectMessage(replyToken) {

  const thumbnailImageUrls = [
    "https://pbs.twimg.com/media/EZWwMCZU4AAV6MJ.jpg:small",
    "https://pbs.twimg.com/media/ESVoYVwUMAAiA3M.jpg",
    "https://i.pinimg.com/736x/b8/00/3f/b8003fc2c0546eb9915b336537b2100a.jpg",
    "https://pbs.twimg.com/media/EFFSFdpVAAAJnJj.jpg",
    "https://i.pinimg.com/originals/3a/cc/41/3acc41594cd42c761e88cab691e67048.jpg",
    "https://i.pinimg.com/originals/14/9a/63/149a63462b049c46fc1a81eac4ecc2ea.jpg"
  ]

  return client.replyMessage(replyToken,
    {
      type: "template",
      altText: "日向坂46クイズ",
      template: {
        type: "buttons",
        thumbnailImageUrl: thumbnailImageUrls[Math.floor(Math.random() * thumbnailImageUrls.length)],
        title: "不正解",
        text: "残念～",
        actions: [
          {
            label: "次のクイズへ",
            type: "postback",
            data: '{"type":"push_quiz"}',
            text: "次のクイズへ",
          },
        ],
      },
    }
  );
}
