const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class StopCommand extends Command {
  constructor(client) {
    super(client, {
      name: "resume",
      group: "music",
      memberName: "resume",
      description: "Resume a paused song",
      examples: ["!pause"]
    });
  }

  async run(msg) {
    if (!msg.guild) return;

    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.connection.player.dispatcher.resume();
    } else msg.reply("You have to join a voice channel first");
  }
};
