const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'call_tts',
            group: 'spam',
            memberName: 'call_tts',
            description: 'Call somebody with discord Text-To-Speech',
            examples: ['!call @User#0000']
        });
    }

    async run(msg) {
        msg.guild.members.forEach(member => {
            if(!msg.mentions.users.some(user => user.id==member.id)){
                member.setDeaf(true).catch(console.error);
            }
        });
        msg.mentions.users.forEach(user => {
            msg.say('Come here this city needs you ' + user,{tts : true});
            msg.say('Come here this city needs you ' + user,{tts : true});
            msg.say('Come here this city needs you ' + user,{tts : true});
            msg.say('Come here this city needs you ' + user,{tts : true});
            msg.say('Come here this city needs you ' + user,{tts : true});
        });
        msg.guild.members.forEach(member => {
            member.setDeaf(true);
        });
    }
};