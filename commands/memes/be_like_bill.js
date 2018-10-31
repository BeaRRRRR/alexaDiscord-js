const {Command} = require('discord.js-commando');
const {RichEmbed} = require('discord.js');


module.exports = class BeLikeBillCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'be_like_bill',
            group: 'memes',
            memberName: 'be_like_bill',
            description: 'Generates a be like bill image with your name',
            examples: ['!be_like_bill m'],
            args : [
                {
                    key : 'sex',
                    prompt : 'Input sex - m(male) or f(female)',
                    type : 'string'
                }
            ]
        });
    }

    async run(msg,{sex}) {
        if (!msg.guild) return;
        var url = `http://belikebill.azurewebsites.net/billgen-API.php?default=1&name=${msg.member.displayName}&sex=${sex}`;
        console.log(url);
        // const embed = new RichEmbed().setImage(url);
        // msg.say(embed);
        msg.channel.send({
            files : [
                {
                    attachment : url,
                    name : 'belikebill.png'
                }
            ]
        })
    }

};