const {Command} = require("discord.js-commando");
const fetch = require('node-fetch');


module.exports = class SearchCommand extends Command {
  constructor(client) {
    super(client, {
      name: "search",
      group: "music",
      memberName: "search",
      description: "Searches in youtube videos by give query",
      examples: ["!search knights of cydonia"],
      args: [
        {
          key: "url",
          prompt: "A YouTube url to play the sound from",
          type: "string"
        }
      ]
    });
  }

  async run(msg, {url}) {
    if (!msg.guild) return;

    if (msg.member.voiceChannel) {
      let response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${url
          .split(" ")
          .join("+")}&type=video&key=AIzaSyDMXoEk9eUXOFccZTut5tOKD_IP1duXMBw`
      );
      let json = await response.json();
      let videos = json.items;
      let queueList = '';
      for (let i = 0; i < 10; i++) {
        let entry = `https://www.youtube.com/watch?v=${videos[i].id.videoId}`;
        queueList += `${i + 1}. [${videos[i].snippet.title}](${entry})  \n`;
      }
      msg.say(`Choose a number ${queueList}`);
      let collector = msg.channel.createMessageCollector((m) => !isNaN(m) && m > 0 && m <= 10);
      collector.once('collect', function (message) {
        let commandFile = require('C:\\Users\\misha\\WebstormProjects\\alexaDiscord-js\\commands\\music\\play.js');
        commandFile.queue(msg, `https://www.youtube.com/watch?v=${videos[message].id.videoId}`);
      })

    } else msg.reply("You have to join a voice channel first");
  }
};
