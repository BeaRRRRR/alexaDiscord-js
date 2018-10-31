const {Command} = require('discord.js-commando');
const {RichEmbed} = require('discord.js');


module.exports = class StopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'coinflip',
            group: 'random',
            memberName: 'coinflip',
            description: 'Flips a coin',
            examples: ['!coinflip'],
        });
    }

    async run(msg) {
        if (!msg.guild) return;
        var rand = Math.round((0 - 0.5 + Math.random() * (1 + 1))) === 0;
        let richEmbed = new RichEmbed()
            .setTitle('COINFLIP');
        if(rand) await richEmbed.setImage('https://cdn.discordapp.com/attachments/448185339975172099/483255919690383360/Quarter_new.jpg');
        else await richEmbed.setImage('https://cdn.discordapp.com/attachments/448185339975172099/483256013370294272/203801_mainViewLot.jpg');
        msg.say(richEmbed);
    }
};