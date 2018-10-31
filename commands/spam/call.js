const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'call',
            group: 'spam',
            memberName: 'call',
            description: 'Calls somebody',
            examples: ['!call @User#0000']
        });
    }

    async run(msg) {
        msg.mentions.users.forEach(user => {
            msg.say('Come here this city needs you ' + user);
            msg.say('Come here this city needs you ' + user);
            msg.say('Come here this city needs you ' + user);
            msg.say('Come here this city needs you ' + user);
            msg.say('Come here this city needs you ' + user);
        });
    }
};