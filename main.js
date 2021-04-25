const Discord = require('discord.js');
const WOKCommands = require('wokcommands')

const client = new Discord.Client();

const prefix = '!';
const fs = require('fs');
const nextRace = require('./commands/nextRace');

const guildId = '835509575707787324'

client.once('ready', () => {
    console.log('Bot is online');

    new WOKCommands(client, {
        commandsDir: 'commands',
        testServers: [guildId],
        showWarns: false,
    })
});

var token = fs.readFileSync('./token.txt').toString();
client.login(token);