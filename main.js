const Discord = require('discord.js');
const WOKCommands = require('wokcommands')

const client = new Discord.Client();

const prefix = '!';
const fs = require('fs');
const nextRace = require('./commands/nextRace');

const guildId = '835509575707787324'

// client.commands = new Discord.Collection();

// const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
// for (const file of commandFiles) {
//     const command = require(`./commands/${file}`);

//     client.commands.set(command.name, command);
// }

// const getApp = (guildId) => {
//     const app = client.api.applications(client.user.id);
//     if(guildId) {
//         app.guilds(guildId);
//     }
//     return app;
// }

client.once('ready', () => {
    console.log('Bot is online');

    new WOKCommands(client, {
        commandsDir: 'commands',
        testServers: [guildId],
        showWarns: false,
    })
});

// client.on('ready', async () => {
//     const commands = await getApp(guildId).commands.get();
//     console.log(commands);

//     await getApp(guildId).commands.post({
//         data: {
//             name: 'ping',
//             description: 'A simple ping pong command',
//         },
//     })

//     client.ws.on('INTERACTION_CREATE', async (interaction) => {
//         const command = interaction.data.name.toLowerCase()
        
//         if (command === 'ping') {
//             reply(interaction, 'pong')
//         }
//         if (command === 'nextrace') {
//             reply(interaction, nextRace.execute(interaction))
//         }
//     })
// })

// const reply = (interaction, response) => {
//     client.api.interactions(interaction.id, interaction.token).callback.post({
//         data: {
//             type: 4,
//             data: {
//                 content: response,
//             },
//         },
//     })
// })

// client.on('message', message => {
//     if (!message.content.startsWith(prefix) || message.author.bot) return;

//     const args = message.content.slice(prefix.length).split(/ +/);
//     const command = args.shift().toLowerCase();

//     if (command === 'ping') {
//         client.commands.get('ping').execute(message, args);
//     }

//     if (command === 'nextrace') {
//         client.commands.get('next race').execute(message);
//     }

//     if (command === 'help') {
//         client.commands.get('next race').execute(message, args);
//     }
// });

var token = fs.readFileSync('./token.txt').toString();
client.login(token);