const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const fetch = require("node-fetch");
const { queue } = require("jquery");

const API_KEY = 'RGAPI-b7a436fa-0f1c-4ca9-aa27-d37e42ef947e';

client.login(config.BOT_TOKEN);

const prefix = "!"; 
 
client.on("message", async function(message) { 
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
        message.reply("available LOL commands: \n`!lol level {username}` - returns summoner level \n" 
        + "`!lol champinfo {username} {champion name}` - returns summoner-specific champion info \n"
        + "`!lol rank {username}` - returns summoner-specific ranked info \n");
      } 

      // Summoner level
      else if (args[0] == "level" && args.length == 2) {
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
        try {
          await fetch('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + username + '?api_key=' + API_KEY)
            .then(response => response.json())
            .then(data => summonerID = data.id);
          await fetch('http://ddragon.leagueoflegends.com/cdn/10.20.1/data/en_US/champion.json')
            .then(response => response.json())
            .then(data => champKey = data.data[champ].key);
          fetch('https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/' 
            + summonerID + '/by-champion/' + champKey + '?api_key=' + API_KEY)
            .then(response => response.json())
            .then(data => message.reply('*' + username + '*' + "'s " + champ + ': \n Mastery Level: ' + '**' + data.championLevel 
              + '**' + '\n Chest Already Earned: ' + '**' + data.chestGranted + '**' + '\n Tokens Earned: ' + '**' 
              + data.tokensEarned + '**'));
        } catch {
          message.reply('specified champion does not exist')
        }
      }

      // Ranked info
      else if (args[0] == "rank" && args.length == 2) {
        var username = args[1];
        var summonerID;
        var flexed;
        var solo;
        var ranks = '*' + username + "*'s Ranked Info: \n";
        try {
          await fetch('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + username + '?api_key=' + API_KEY)
            .then(response => response.json())
            .then(data => summonerID = data.id);

          await fetch('https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + summonerID + '?api_key=' + API_KEY)
            .then(response => response.json())
            .then(data => {
              flexed = data[0];
              solo = data[1];
            });
          ranks += "Ranked Solo/Duo: **" + solo.tier + ' ' + solo.rank + '**, LP: **' + solo.leaguePoints + '**, W/L: **' + solo.wins 
            + '/' + solo.losses + "**\n";
          ranks += "Ranked Flexed: **" + flexed.tier + ' ' + flexed.rank + '**, LP: **' + flexed.leaguePoints + '**, W/L: **' 
            + flexed.wins + '/' + flexed.losses + '**';
          message.reply(ranks);
        } catch {
          message.reply("summoner not found");
        }
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

