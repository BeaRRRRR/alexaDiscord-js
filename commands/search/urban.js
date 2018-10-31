const {Command} = require('discord.js-commando');
const {RichEmbed} = require('discord.js');
const urban = require('urban');


module.exports = class StopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'urban',
            group: 'search',
            memberName: 'urban',
            description: 'Searches a worlds definition in urban dictionary',
            examples: ['!urban ligma'],
            args: [
                {
                    key: 'term',
                    prompt: 'A search term',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, {term}) {
        if (!msg.guild) return;
        urban(term).first(async function (json) {
            if (!json) {
                msg.say('Sorry,no definition available');
                return;
            }
            const embed = await new RichEmbed()
                .setTitle(`Urban Dictionary - ${term}`)
                .setDescription(json.definition)
                .addField('Examples', json.example, false)
                .addField('Written on', json.written_on.toString().substring(0, 10), false);
            msg.say(embed);
        })

    }
};