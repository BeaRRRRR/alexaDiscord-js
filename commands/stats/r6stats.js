const {Command} = require('discord.js-commando');
const {RichEmbed} = require('discord.js');

module.exports = class EightBallCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'r6stats',
      group: 'stats',
      memberName: 'r6stats',
      description: 'See statistic of a player by their name',
      examples: ['!r6stats shroud'],
      args: [
        {
          key: 'nickname',
          prompt: 'Nickname of a player whose stats you want to see',
          type: 'string'
        }
      ]
    });
  }

  async run(msg,{nickname}) {
    let url = `https://r6tab.com/api/search.php?platform=uplay&search=${nickname}`;
    let user_id = (await (await fetch(url)).json()).results[0].p_id;
    let response = await fetch(`https://r6tab.com/api/player.php?p_id=${user_id}`);
    let json = await response.json();
    const kd = `0. ${json.kd}`;
    const hsAcc = json.p_headshotacc.substring(0,3).slice(0,2) + '.' + json.p_headshotacc.substring(0,3).slice(2) + ' %';
    let data = json.p_data.slice(1,-1);
    data = data.split(',').map(Number);
    let winrate = ((data[3]*100)/(data[4] + data[3])).toString().substring(0,5);
    console.log(winrate);
    const embed = new RichEmbed()
      .setTitle(`${json.p_name} statistics in Rainbow Six Siege`)
      .setURL(`https://r6tab.com/${user_id}`)
      .setThumbnail(json.social.background)
      .addField('K/D',kd,true)
      .addField('Ranked Winrate',`${winrate} %`,true)
      .addField('Current ELO',json.p_currentmmr,true)
      .addField('Headshot Accuracy',hsAcc,true)
      .addField('Level',json.p_level,true)
      .addField('Bullets shot',data[16],true)
      .setFooter(`Requested by ${msg.author.username}`,msg.author.avatarURL)
      .setColor('1a1aff');
    msg.say(embed);


  }
};