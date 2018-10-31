const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const Music = require('discord.js-musicbot-addon');


const client = new CommandoClient({
    commandPrefix: '!',
    unknownCommandResponse: false,
    owner: '339098348613140483',
    disableEveryone: true
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['spam', 'Spamming'],
        ['voice','Playing music,sounds etc...'],
        ['random','Some random stuff to try your luck'],
        ['memes','Some meme commands'],
        ['search','Search some things'],
        ['stuff','Stuff']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log('Logged in!');
    client.user.setActivity('YOU' , {type : 'WATCHING'})
        .then(presense => console.log(`Presense set to ${presense.game}`))
        .catch(console.error);
});

// Music.start(client,{
//     youtubeKey : 'AIzaSyCqKWWHaT1k0eUIw791tAZHx39jAzoCNNE',
//     botPrefix : '!',
//     thumbnailType : 'medium',
//     requesterName : true,
//     inlineEmbeds : true,
//     logging : true,
//     enableQueueStat : true,
//     global : false
// });


client.login('NDc4ODcyODI4ODA5MzE0MzE0.DlRStw.Lq3qU377gySTPzV01Fn-l_PBeMo');