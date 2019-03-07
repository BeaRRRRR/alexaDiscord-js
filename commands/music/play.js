const {Command} = require("discord.js-commando");
const {RichEmbed} = require("discord.js");
const ytdl = require("ytdl-core");
const ytSerch = require('yt-search');
const fetch = require("node-fetch");
global.servers = {};

async function getUrl(query) {
  if (query.startsWith("https://www.youtube.")) return query;
  let response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query
      .split(" ")
      .join("+")}&type=video&key=AIzaSyDMXoEk9eUXOFccZTut5tOKD_IP1duXMBw`
  );
  let json = await response.json();
  console.log(json);
  return `https://www.youtube.com/watch?v=${json.items[0].id.videoId}`;
}

async function play(connection, msg) {
  let server = global.servers[msg.guild.id];
  let queue = server.queue;
  let url = await queue[0];
  console.log(url);
  console.log(queue + "in play");
  let info = await ytdl.getInfo(url);
  server.dispatcher = await connection.playStream(
    await ytdl.downloadFromInfo(info, {
      filter: "audioonly"
    })
  );
  server.dispatcher.on("end", function () {
    queue.shift();
    console.log(server.queue + "in end");
    if (queue[0]) {
      play(connection, msg);
    }
  });
  server.dispatcher.on("finish", () => {
    console.log("Finished playing!");
    queue.shift();
    console.log(server.queue + "in end");
    if (queue[0]) {
      play(connection, msg);
    }
  });
  server.dispatcher.on("error", () => {
    console.error();
  });
  let length = info.length_seconds;
  if (length > 60) {
    length = `${Math.floor(length / 60)}m  ${length % 60}s`;
  }
  console.log(length);
  var video_id = url.split("v=")[1];
  var ampersandPosition = video_id.indexOf("&");
  if (ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
  }
  // console.log(await info.iurlmq.toString());
  // console.log(await info.iurlmaxres.toString());
  console.log(video_id);
  const embed = await new RichEmbed()
    .setTitle(`:musical_note: Now playing ${info.title} :musical_note: `)
    .setImage(`https://img.youtube.com/vi/${video_id}/mqdefault.jpg`)
    // .setImage(info.iurlmaxres ? info.iurlmaxres : info.iurlmq)
    .addField("length", length, true)
    .addField("Requested by", msg.member, true)
    .addField(`:thumbsup: / :thumbsdown: `, info.avg_rating * 2, true)
    .addField(`:eye:`, info.view_count, true)
    .setFooter(
      `Requested by ${msg.author.discriminator}`,
      msg.author.displayAvatarURL
    );
  msg.say(embed);
}

module.exports = class PlayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      group: "music",
      memberName: "play",
      description: "Play a song from url",
      examples: ["!play https://www.youtube.com/watch?v=kJQP7kiw5Fk"],
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
    url = await getUrl(url);
    console.log("url is " + url);
    if (!msg.guild) return;

    if (msg.member.voiceChannel) {
      if (!global.servers[msg.guild.id]) {
        global.servers[msg.guild.id] = {
          queue: []
        };
      }
      msg.member.voiceChannel
        .join()
        .then(async (connection) => {
          let server = await global.servers[msg.guild.id];
          if (server.queue.length <= 0) {
            await server.queue.push(url);
            console.log(server.queue);
            play(connection, msg);
          } else {
            await server.queue.push(url);
            console.log(server.queue + " else");
            let info = await ytdl.getInfo(url);
            let length = info.length_seconds;
            if (length > 60) {
              length = `${Math.floor(length / 60)}m  ${length % 60}s`;
            }
            console.log(length);
            var video_id = url.split("v=")[1];
            var ampersandPosition = video_id.indexOf("&");
            if (ampersandPosition != -1) {
              video_id = video_id.substring(0, ampersandPosition);
            }
            // console.log(await info.iurlmq.toString());
            // console.log(await info.iurlmaxres.toString());
            console.log(video_id);
            const embed = await new RichEmbed()
              .setTitle(
                `:musical_note: Adding to queue ${info.title} :musical_note: `
              )
              .setImage(`https://img.youtube.com/vi/${video_id}/mqdefault.jpg`)
              // .setImage(info.iurlmaxres ? info.iurlmaxres : info.iurlmq)
              .addField("length", length, true)
              .addField("Requested by", msg.member, true)
              .addField(`:thumbsup: / :thumbsdown: `, info.avg_rating * 2, true)
              .addField(`:eye:`, info.view_count, true)
              .setFooter(
                `Requested by ${msg.author.discriminator}`,
                msg.author.displayAvatarURL
              );
            msg.say(embed);
          }
        })
        .catch(console.error);
    } else msg.reply("You have to join a voice channel first");
  }
};
