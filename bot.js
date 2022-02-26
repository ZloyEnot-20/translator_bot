const { Telegraf } = require("telegraf");
const axios = require("axios").default;
const BOT_TOKEN = "5199167173:AAECCay6UbmED6DInwzo0-wwTlB3b_RcvUU";

const bot = new Telegraf(BOT_TOKEN);
bot.start((ctx) => {
  ctx.reply("hi, send me a text that you wish to translate");
});

bot.on("text", async (ctx) => {
  ctx.reply("Loading...");
  try {
    const text = ctx.message.text.split(" ").slice(1).join(" ");
    const language = ctx.message.text.split(" ").shift();
    if (language.length >= 3) {
      ctx.reply(
        "Кажется вы забыли указать язык на который вы хотите перевести ваш текст, используйте первые две буквы языка перед вашим текстом"
      );
    }

    let options = {
      method: "GET",
      url: "https://just-translated.p.rapidapi.com/",
      params: { lang: language, text },
      headers: {
        "x-rapidapi-host": "just-translated.p.rapidapi.com",
        "x-rapidapi-key": "5f0984d1bcmshfe44cf198d50f1dp1a9c15jsn26c911f00b74",
      },
    };

    axios
      .request(options)
      .then(function ({ data }) {
        ctx.reply(...data.text);
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (e) {
    console.error(e);
  }
});

console.log("Server run");
bot.launch();
