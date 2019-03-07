const {Command} = require("discord.js-commando");
const {RichEmbed} = require("discord.js");
const ytdl = require("ytdl-core");

module.exports = class StopCommand extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      group: "music",
      memberName: "queue",
      description: "List the current queue",
      examples: ["!queue"]
    });
  }

  async run(msg) {
    if (!msg.guild) return;

    if (msg.member.voiceChannel) {
      let queueList = "";
      let server = global.servers[msg.guild.id];
      let queue = server.queue;
      console.log(queue);
      let searchFromIndex = 0;
      let embed = new RichEmbed()
        .setTitle('Queue')
        .addField('Now playing', `[${(await ytdl.getInfo(queue[0])).title}](${queue[0]})`);
      for (let i = 1; i < queue.length;i++) {
        let entry = queue[i];
        const info = await ytdl.getInfo(entry);
        queueList += `${i + 1}. [${info.title}](${entry})  [${info.length_seconds}] \n`;
        searchFromIndex++;
      }
      embed.addField('Now Playing',queueList);
      /*      await queue.forEach(async e => {*/
      //console.log(e);
      //let info = await ytdl.getInfo(e);
      //queueList =
      //queueList + `${queue.indexOf(e) + 1}. ${e} (${info.length_seconds})`;
      /*});*/
      msg.reply(embed);
    } else msg.reply("You have to join a voice channel first");
  }
};
