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
  return client.replyMessage(replyToken,
    {
      type: "template",
      altText: "日向坂46クイズ",
      template: {
        type: "buttons",
        thumbnailImageUrl: "https://cdn.wikiwiki.jp/to/w/hinataword/%E3%81%8D/::ref/n2i9190225-0129250941.jpg?rev=ed2646f5723297906ad82132767b837d&t=20190414223603",
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
  return client.replyMessage(replyToken,
    {
      type: "template",
      altText: "日向坂46クイズ",
      template: {
        type: "buttons",
        thumbnailImageUrl: "https://pbs.twimg.com/media/EZWwMCZU4AAV6MJ.jpg:small",
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
