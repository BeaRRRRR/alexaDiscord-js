const { Command } = require("discord.js-commando");
const fs = require("fs");
// const play = require('./play.js');

// make a new stream for each time someone starts to talk
function generateOutputFile(channel, member) {
  // use IDs instead of username cause some people have stupid emojis in their name
  const fileName = `audio.pcm`;
  return fs.createWriteStream(fileName);
}

module.exports = class ListenCommand extends Command {
  constructor(client) {
    super(client, {
      name: "listen",
      group: "voice",
      memberName: "listen",
      description: "TODO",
      examples: ["!listen"]
    });
  }

  async run(msg) {
    console.log("In listen");
    if (!msg.guild) return;

    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.join().then(async (connection) => {
        msg.reply("Ready!");
        const receiver = connection.createReceiver();
        connection.on("speaking", (user, speaking) => {
          if (speaking) {
            msg.channel.sendMessage(`I'm listening to ${user}`);
            // this creates a 16-bit signed PCM, stereo 48KHz PCM stream.
            const audioStream = receiver.createPCMStream(user);
            // create an output stream so we can dump our data in a file
            const outputStream = generateOutputFile(
              msg.member.voiceChannel,
              user
            );
            // pipe our audio data into the file stream
            audioStream.pipe(outputStream);
            outputStream.on("data", console.log);
            // when the stream ends (the user stopped talking) tell the user
            audioStream.on("end", () => {
              msg.channel.sendMessage(`I'm no longer listening to ${user}`);
            });
          }
        });
      });
    } else msg.reply("You have to join a voice channel first");
  }
};
