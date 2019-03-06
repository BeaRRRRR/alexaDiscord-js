const {Command} = require("discord.js-commando");
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
      for (const entry of queue) {
        const info = await ytdl.getInfo()
        queueList += `${queue.indexOf(entry) + 1}. ${info.title} (${info.length_seconds}) \n`;
      }
      /*      await queue.forEach(async e => {*/
      //console.log(e);
      //let info = await ytdl.getInfo(e);
      //queueList =
      //queueList + `${queue.indexOf(e) + 1}. ${e} (${info.length_seconds})`;
      /*});*/
      console.log(queueList);
      msg.reply(`:musical_note: Current queue :musical_note: ${queueList}`);
    } else msg.reply("You have to join a voice channel first");
  }
};
