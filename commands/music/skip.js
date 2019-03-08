const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
// const play = require('./play.js');

module.exports = class StopCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      group: 'music',
      memberName: 'skip',
      description: 'Skips to next song in queue',
      examples: ['!skip']
    });
  }

  async run(msg) {
    if (!msg.guild) return;

    if (msg.member.voiceChannel) {
      let server = servers[msg.guild.id];
      msg.say('Skipped 1');
      if (server.dispatcher) server.dispatcher.end();
    } else msg.reply('You have to join a voice channel first');
  }
};
