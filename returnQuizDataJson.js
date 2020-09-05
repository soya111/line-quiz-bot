"use strict";

const fs = require("fs");

module.exports = { returnQuizDataJson };

function returnQuizDataJson() {
  const jsonObject = JSON.parse(fs.readFileSync("quizData.json", "utf8"));
  return jsonObject[Math.floor(Math.random() * jsonObject.length)];
}
