const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

client.login(config.BOT_TOKEN);

const prefix = "!";

client.on("message", function(message) { 
    if (message.author.bot) return;

    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "help") {
        message.reply("there's no helping your hardstuck iron bum ass");
      }
                                         
});                                      

client.login(config.BOT_TOKEN);

//test