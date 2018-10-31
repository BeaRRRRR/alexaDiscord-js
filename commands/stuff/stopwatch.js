const {Command} = require('discord.js-commando');
const {RichEmbed} = require('discord.js');

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

module.exports = class StopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stopwatch',
            group: 'stuff',
            memberName: 'stopwatch',
            description: 'Searches a worlds definition in urban dictionary',
            examples: ['!stopwatch'],
        });
    }

    async run(msg) {
        if (!msg.guild) return;
        msg.channel.send('Stopwatch started').then((msg) => {
            var i = 0;
            while (true) {
                sleep(1000).then(function (){
                    i++;
                    msg.edit(`${i}s elapsed`);
                }
                );
            }});

    }
};