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

module.exports = { pushInitMessage, pushQuiz, pushCorrectMessage };

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
          data: '{"type":"quiz_init"}',
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
  return client.replyMessage(replyToken, {
    type: "template",
    altText: "正解",
    template: {
      type: "bubble",
      hero: {
        type: "image",
        url:
          "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_3_movie.png",
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
        action: {
          type: "uri",
          uri: "http://linecorp.com/",
        },
      },
      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          {
            type: "text",
            text: "BROWN'S ADVENTURE\nIN MOVIE",
            wrap: true,
            weight: "bold",
            gravity: "center",
            size: "xl",
          },
          {
            type: "box",
            layout: "baseline",
            margin: "md",
            contents: [
              {
                type: "icon",
                size: "sm",
                url:
                  "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
              },
              {
                type: "icon",
                size: "sm",
                url:
                  "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
              },
              {
                type: "icon",
                size: "sm",
                url:
                  "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
              },
              {
                type: "icon",
                size: "sm",
                url:
                  "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
              },
              {
                type: "icon",
                size: "sm",
                url:
                  "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png",
              },
              {
                type: "text",
                text: "4.0",
                size: "sm",
                color: "#999999",
                margin: "md",
                flex: 0,
              },
            ],
          },
          {
            type: "box",
            layout: "vertical",
            margin: "lg",
            spacing: "sm",
            contents: [
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "Date",
                    color: "#aaaaaa",
                    size: "sm",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: "Monday 25, 9:00PM",
                    wrap: true,
                    size: "sm",
                    color: "#666666",
                    flex: 4,
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "Place",
                    color: "#aaaaaa",
                    size: "sm",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: "7 Floor, No.3",
                    wrap: true,
                    color: "#666666",
                    size: "sm",
                    flex: 4,
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "Seats",
                    color: "#aaaaaa",
                    size: "sm",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: "C Row, 18 Seat",
                    wrap: true,
                    color: "#666666",
                    size: "sm",
                    flex: 4,
                  },
                ],
              },
            ],
          },
          {
            type: "box",
            layout: "vertical",
            margin: "xxl",
            contents: [
              {
                type: "spacer",
              },
              {
                type: "image",
                url:
                  "https://scdn.line-apps.com/n/channel_devcenter/img/fx/linecorp_code_withborder.png",
                aspectMode: "cover",
                size: "xl",
              },
              {
                type: "text",
                text:
                  "You can enter the theater by using this code instead of a ticket",
                color: "#aaaaaa",
                wrap: true,
                margin: "xxl",
                size: "xs",
              },
            ],
          },
        ],
      },
    },
  });
}
