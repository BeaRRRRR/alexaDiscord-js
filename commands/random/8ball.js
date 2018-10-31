const {Command} = require('discord.js-commando');

var answers = [
    'I don\' think so',
    'It is quite possible',
    'No...Just No',
    'Of course',
    'The probability of this is low',
    'It can happen',
    'Try again',
    'Not at any price',
    'Yeah...',
    'It isn\'t a question worth asking'
];


module.exports = class EightBallCommand extends Command {
    constructor(client){
        super(client,{
            name : '8ball',
            group : 'random',
            memberName : '8ball',
            description : ':8ball: Just an 8ball which can predict your future :8ball: ',
            examples : ['!8ball will i rank up today']
        });
    }

    async run(msg){
        console.log(answers.length);
        var answer = answers[Math.floor(Math.random() * answers.length)];
        msg.say(answer);
    }
};