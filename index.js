const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const fetch = require("node-fetch");

const API_KEY = 'RGAPI-b7a436fa-0f1c-4ca9-aa27-d37e42ef947e';

client.login(config.BOT_TOKEN);

const prefix = "!"; // used to indicate bot command
 
client.on("message", function(message) { 
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    // General bot help
    if (command === "help" && args.length == 0) {
      message.reply("use `!lol help`, `!tft help`, or `!val help` for game-specific commands");
    } 

    // Commands for LOL
    else if (command === "lol") {

      // LOL help (list of commands)
      if (args[0] == "help" && args.length == 1) {
        message.reply("available: summonerlevel(username)");
      } 

      // Summoner level
      else if (args[0] == "summonerlevel" && args.length == 2) {
        var username = args[1];
        fetch('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + username + '?api_key=' + API_KEY)
          .then(response => response.json())
          .then(data => message.reply('*' + username + "*'s Summoner Level: **" + data.summonerLevel + '**'));
      }

      // Summoner-specific champion info
      else if (args[0] == "champinfo" && args.length == 3) {
        var username = args[1];
        var champ = args[2];
        var summonerID;
        var champKey;
        fetch('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + username + '?api_key=' + API_KEY)
          .then(response => response.json())
          .then(data => summonerID = data.id);
        fetch('http://ddragon.leagueoflegends.com/cdn/10.20.1/data/en_US/champion.json')
          .then(response => response.json())
          .then(data => champKey = data.data[champ].key);
        message.reply(summonerID);
        message.reply(champKey);

        // fetch('https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/' + summonerID + '/by-champion/' + champKey + '?api_key=' + API_KEY)
        //   .then(response => response.json())
        //   .then(data => message.reply(username + "'s " + champ + ': \n Mastery Level: ' + data.championLevel + '\n Chest available: ' + data.chestGranted + '\n Tokens Earned: ' + data.tokensEarned));
          

      }

      // Ranked info
      else if (args[0] == "rank" && args.length == 2) {
        var username = args[1];
        var summonerID;
        fetch('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + username + '?api_key=' + API_KEY)
          .then(response => response.json())
          .then(data => summonerID = data.id);

        message.reply(summonerID);
        fetch('https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + summonerID + '?api_key=' + API_KEY)
          .then(response => response.json())
          .then(data => message.reply(data));
      }


      // Current free champion rotation
      else if (args[0] == "freechamps" && args.length == 1) {
        var champIDs;
        var champData;
        var champs = [];
        fetch('https://na1.api.riotgames.com/lol/platform/v3/champion-rotationsReturns' + '?api_key=' + API_KEY)
          .then(response => response.json())
          .then(data => champIDs = data.freeChampionIds);
          fetch('http://ddragon.leagueoflegends.com/cdn/10.20.1/data/en_US/champion.json')
          .then(response => response.json())
          .then(data => champData = data.data);
        for (i = 0; i < champIDs.length; i++) {
          //champs.push(champData[])
        }
      }

      // Unrecognized command
      else {
        message.reply ("unrecognized command or arguments, use `!help` for a list of commands.")
      }
    } 

    // Commands for TFT
    else if (command === "tft") {

      // TFT help (list of commands)
      if (args[0] == "help") {
        message.reply("placeholder text");
      } 

      // Unrecognized command
      else {
        message.reply ("unrecognized command or arguments, use `!help` for a list of commands.")
      }
    } 

    // Commands for Valorant
    else if (command === "val") {

      // Valorant help (list of commands)
      if (args[0] == "help") {
        message.reply("placeholder text");
      } 

      // Unrecognized command
      else {
        message.reply ("unrecognized command or arguments, use `!help` for a list of commands.")
      }

    } 

    // Unrecognized game
    else {
      message.reply ("unrecognized command or arguments, use `!help` for a list of commands.")
    }                               
});                                      

client.login(config.BOT_TOKEN);

//https://na1.api.riotgames.com//lol/champion-mastery/v4/champion-masteries/by-summoner/RMlTn4qDtlvJnKWt6tuC_8-SyWKczU43AMYPZTJxvTxohgfT?api_key=RGAPI-b7a436fa-0f1c-4ca9-aa27-d37e42ef947e
// ^ maybe use to see who can still earn a chest
//champion masteries, not owned or champ doesnt exist
//undefined summoner name
//update general help commands
//champinfo (general), http://ddragon.leagueoflegends.com/cdn/10.20.1/data/en_US/champion.json\
// need puuid for most shit, look through docs again
