const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

const API_KEY = '';


// var jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { window } = new JSDOM();
// const { document } = (new JSDOM('')).window;
// global.document = document;

// var $ = jQuery = require('jquery')(window);

const fetch = require("node-fetch");

client.login(config.BOT_TOKEN);

const prefix = "!"; // used to indicate bot command
 
client.on("message", function(message) { 
    if (message.author.bot) return;

    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "help" && args.length == 0) {
      message.reply("use `!lol help`, `!tft help`, or `!val help` for game-specific commands");
      
    } 

    else if (command === "lol") {
      if (args[0] == "help" && args.length == 1) {
        message.reply("available: summonerlevel(username)");
      } 
      else if (args[0] == "summonerlevel" && args.length == 2) {
        var username = args[1];
        fetch('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + username + '?api_key=' + API_KEY)
          .then(response => response.json())
          .then(data => message.reply('**' + username + "**'s Summonor Level: " + data.summonerLevel));
      }
      else {
        message.reply ("unrecognized command or arguments, use `!help` for a list of commands.")
      }
    } 

    else if (command === "tft") {
      if (args[0] == "help") {
        message.reply("placeholder text");
      } 
      else {
        message.reply ("unrecognized command or arguments, use `!help` for a list of commands.")
      }
    } 

    else if (command === "val") {
      if (args[0] == "help") {
        message.reply("placeholder text");
      } 
      else {
        message.reply ("unrecognized command or arguments, use `!help` for a list of commands.")
      }

    } 
    else {
      message.reply ("unrecognized command or arguments, use `!help` for a list of commands.")
    }                               
});                                      

client.login(config.BOT_TOKEN);


