const {Command} = require('discord.js-commando');
const {RichEmbed, RichEmbedOptions} = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = class RandomGifCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bf4stats',
            group: 'stats',
            memberName: 'bf4stats',
            description: 'Shows bf4 stats of a given player',
            examples: ['!bf4stats'],
            args: [
                {
                    key: 'nickname',
                    prompt: 'A nickname of the user,whose stats you want to see',
                    type: 'string',
                }
            ]
        });
    }
    async run(msg,{nickname}) {
        if (!msg.guild) return;
        console.log(nickname);
        let response = await snekfetch.get(`https://api.bf4stats.com/api/playerInfo?plat=pc&name=${nickname}&output=json`);
        console.log(response.body.stats.extra.kdr);
        let kdr = response.body.stats.extra.kdr;
        let timePlayed = Math.floor(response.body.player.timePlayed/3600);
        let rank = response.body.player.rank.nr;
        let countryName = response.body.player.countryName ? response.body.player.countryName : '';
        let headshots = response.body.stats.headshots;
        let accuracy  =  response.body.stats.extra.accuracy;
        let wlr  =  response.body.stats.extra.wlr;
        let longestHeadshot =  response.body.stats.longestHeadshot;
        const embed = await new RichEmbed()
            .setTitle(`Battlefield 4 stats of player ${nickname} ${countryName}`)
            .addField('Rank',`${rank}`,true)
            .addField('Time played ',`${timePlayed} hrs`,true)
            .addField('K/D',`${kdr}`,true)
            .addField('HeadShots',`${headshots}`,true)
            .addField('Accuracy',`${accuracy}`,true)
            .addField('Win/Loose Ratio',`${wlr}`,true)
            .addField('Longest HeadShot',`${longestHeadshot}`,true)
            .setFooter(`Requested by ${msg.author.username}`, msg.author.displayAvatarURL);
        msg.say(embed);
    }

};