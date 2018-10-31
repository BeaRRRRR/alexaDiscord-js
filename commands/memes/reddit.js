const {Command} = require('discord.js-commando');
const {RichEmbed} = require('discord.js');
const randomPuppy = require('random-puppy');


module.exports = class RedditCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reddit',
            aliases: ['memes'],
            group: 'memes',
            memberName: 'reddit',
            description: 'Generates a random image form given subreddit or meme',
            examples: ['!reddit memes'],
            args: [
                {
                    key: 'subreddit',
                    prompt: 'Input subreddit\'s name',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    async run(msg, {subreddit}) {
        if (!msg.guild) return;
        console.log(subreddit);
        randomPuppy(subreddit === '' ? 'memes' : subreddit).then(url => {
            if (url) {
                msg.channel.send({
                    files: [
                        {
                            attachment: url,
                            name: 'reddit.png'
                        }
                    ]
                })
            }
            else {
                msg.say('Given subreddit doesnt exist')
            }
        });
    }

};