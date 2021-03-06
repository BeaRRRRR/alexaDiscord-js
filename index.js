const { CommandoClient } = require('discord.js-commando');
const path = require('path');

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
    ['music', 'Playing music,sounds etc...'],
    ['random', 'Some random stuff to try your luck'],
    ['memes', 'Some meme commands'],
    ['search', 'Search some things'],
    ['stuff', 'Stuff'],
    ['stats', 'Stats in some games'],
    ['voice', 'Voice recognition']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
  console.log('Logged in!');
  client.user
    .setActivity('YOU', { type: 'WATCHING' })
    .then((presense) => console.log(`Presense set to ${presense.game}`))
    .catch(console.error);
});

client.login('token'); //you can obtain this token at https://discordapp.com/developers/applications/<your client id>/bots
