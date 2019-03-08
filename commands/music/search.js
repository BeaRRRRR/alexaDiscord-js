const {Command} = require("discord.js-commando");
const fetch = require('node-fetch');
const {RichEmbed} = require("discord.js");

module.exports = class SearchCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'search',
      group: 'music',
      memberName: 'search',
      description: 'Searches in youtube videos by give query',
      examples: ['!search knights of cydonia'],
      args: [
        {
          key: 'query',
          prompt: 'A query for YouTube search',
          type: 'string'
        }
      ]
    });
  }

  async run(msg, {query}) {
    if (!msg.guild) return;

    if (msg.member.voiceChannel) {
      let response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query
          .split(" ")
          .join("+")}&type=video&key=AIzaSyDMXoEk9eUXOFccZTut5tOKD_IP1duXMBw`
      );
      let json = await response.json();
      let videos = json.items;
      let queueList = '';
      for (let i = 0; i < 10; i++) {
        let entry = `https://www.youtube.com/watch?v=${videos[i].id.videoId}`;
        queueList += `${i + 1}. [${videos[i].snippet.title}](${entry})  \n \n`;
      }
      const embed = new RichEmbed()
        .setTitle(`Search results for ${query} `)
        .setDescription(`**Choose a number** \n ${queueList}`)
        .setFooter(
          `Requested by ${msg.author.username}`,
          msg.author.displayAvatarURL
        );
      msg.say(embed);
      let collector = msg.channel.createMessageCollector((m) => !isNaN(m) && m > 0 && m <= 10);
      collector.once('collect', function (message) {
        this.client.registry.commands.get('play').run(msg, {url: `https://www.youtube.com/watch?v=${videos[message - 1].id.videoId}`});
      })

    } else msg.reply("You have to join a voice channel first");
  }
};
