const Discord = require('discord.js');
//const WOKCommands = require('wokcommands')

const client = new Discord.Client();
const fs = require('fs');
const nextRace = require('./commands/nextRace');
const standings = require('./commands/standings');
const streams = require('./commands/streams');
const guildId = '835509575707787324'

const getApp = (guildId) => {
    const app  = client.api.applications(client.user.id);
    if (guildId) {
        app.guilds(guildId);
    }
    return app;
}

client.once('ready', async () => {
    console.log('Bot is online');

    const commands = await getApp(guildId).commands.get();
    console.log(commands);
    // await getApp(guildId).commands.post({
    //     data: {
    //         name: 'ping',
    //         description: 'Ping pong command',
    //     },
    // })

    // await getApp(guildId).commands.post({
    //     data: {
    //         name: 'standings',
    //         description: 'Displays standings',
    //         options: [
    //             {
    //                 name: 'DriversOrTeams',
    //                 description: 'Enter Drivers or Teams to display their standings',
    //                 required: true,
    //                 type: 3
    //             },           
    //         ]
    //     }
    // })

    // await getApp(guildId).commands.post({
    //     data: {
    //         name: 'nextRace',
    //         description: 'Displays information for the upcoming F1 race',
    //     }
    // })

    client.ws.on('INTERACTION_CREATE', async (interaction) => {
        const { name, options } = interaction.data;
        const command = name.toLowerCase();

        const args = {};

        if (options) {
            options.forEach(element => {
                const { name, value } = element;
                args[name] = value;
            });
        }    

        if (command === 'nextrace') {
            let embed = new Discord.MessageEmbed();
            embed = await nextRace.callback();
            reply(interaction, embed);
        } else if (command === 'standings') {
            let embed = new Discord.MessageEmbed();
            embed = await standings.callback(args.driversorteams);
            reply(interaction, embed);
        } else if (command === 'streams') {
            let embed = new Discord.MessageEmbed();
            embed = await streams.callback();
            reply(interaction, embed);
        }
    })
});

const reply = async (interaction, response) => {
    let data = {
        content: response,
    }

    if (typeof response === 'object') {
        data = await createAPIMessage(interaction, response);
    }

    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data, 
          },
    });
}

const createAPIMessage = async (interaction, content) => {
    const { data, files } = await Discord.APIMessage.create (
        client.channels.resolve(interaction.channel_id),
        content
    )
    .resolveData()
    .resolveFiles()

    return { ...data, files }
}

var token = fs.readFileSync('./token.txt').toString();
client.login(token);

// client.once('ready', () => {
//     console.log('Bot is online');

//     new WOKCommands(client, {
//         commandsDir: 'commands',
//         testServers: [guildId],
//         showWarns: false,
//     })
// });