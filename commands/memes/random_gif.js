const {Command} = require('discord.js-commando');
const {RichEmbed} = require('discord.js');
const GphApiClient = require('giphy-js-sdk-core');
gclient = GphApiClient("JSFFnzAtvtWQVIOAqkpfgw3Lpm7YBMZ9");


module.exports = class RandomGifCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gif',
            group: 'memes',
            memberName: 'gif',
            description: 'Generates a random gif',
            examples: ['!gif'],
            args: [
                {
                    key: 'term',
                    prompt: 'A search term',
                    type: 'string',
                    default : ''
                }
            ]
        });
    }

    async run(msg,{term}) {
        if (!msg.guild) return;
        console.log(term);
        if (term == '') {
            gclient.random('gifs', {limit: 1}).then(async response => {
                let gifurl = await response.data.url;
                console.log(gifurl);
                msg.say(gifurl);

            });
        }
        else {
            gclient.random('gifs',{tag : term,limit : 1}).then(async response => {
                if(!response) {
                    msg.say('No gifs with this tag');
                    return;
                }
                let gifurl = await response.data.url;
                console.log(gifurl);
                msg.say(gifurl);
            });
        }
    }

};