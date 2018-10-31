const {Command} = require('discord.js-commando');
const {RichEmbed} = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = class StopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'p_quote',
            group: 'search',
            memberName: 'p_quote',
            description: 'Get a random quote about programming',
            examples: ['!p_quote'],
        });
    }

    async run(msg) {
        if (!msg.guild) return;
        snekfetch.get("https://tproger.ru/wp-content/plugins/citation-widget/get-quote.php?_=1537468071711").then(async r => {
            console.log(r);
        });
    }
};