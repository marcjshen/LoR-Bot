const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
const API_KEY = 'RGAPI-edb08c7e-f3d9-4db8-a42f-f39aa2594ae4';

client.login(config.BOT_TOKEN);

const prefix = "!"; // used to indicate bot command


var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);
 


/**
 * should prob make a function for getting data n ugly stuff
 */


client.on("message", function(message) { 
    if (message.author.bot) return;

    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "help") {
      message.reply("use !lol help, !tft help, or !val help for game-specific commands");
    } else if (command === "lol") {
      if (args[0] == "help") {
        
        var SUMMONER_NAME = "";
        SUMMONER_NAME = "Doublelift";

        var API_KEY = "";
        API_KEY = "RGAPI-edb08c7e-f3d9-4db8-a42f-f39aa2594ae4";

        if (SUMMONER_NAME !== "") {

            $.ajax({
                url: 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + 'Nehscram' + '?api_key=' + API_KEY,
                type: 'GET',
                dataType: 'json',
                data: {

                },
                success: function (json) {
                    //var SUMMONER_NAME_NOSPACES = SUMMONER_NAME.replace(" ", "");

                    //SUMMONER_NAME_NOSPACES = SUMMONER_NAME_NOSPACES.toLowerCase().trim();

                    //summonerLevel = json[SUMMONER_NAME_NOSPACES].summonerLevel;
                    //summonerID = json[SUMMONER_NAME_NOSPACES].id;

                    message.reply("yes");

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    message.reply("no");
                }
            });
        } else {
          message.reply("fds");;
        }

        
        message.reply("placeholder text");
      } 

    } else if (command === "tft") {
      if (args[0] == "help") {
        message.reply("placeholder text");
      } 

    } else if (command === "val") {
      if (args[0] == "help") {
        message.reply("placeholder text");
      } 

    } 

    
                                         
});                                      

client.login(config.BOT_TOKEN);


