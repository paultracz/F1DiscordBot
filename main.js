const Discord = require('discord.js');
//const WOKCommands = require('wokcommands')

const client = new Discord.Client();
const fs = require('fs');
client.commands = new Discord.Collection();
const guildId = '835509575707787324'

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

const getApp = (guildId) => {
    const app = client.api.applications(client.user.id);
    if (guildId) {
        app.guilds(guildId);
    }
    return app;
}

client.once('ready', async () => {
    console.log('Bot is online');

    const commands = await getApp(guildId).commands.get();
    //console.log(commands);

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

    // async function update() {
    //     let embed = new Discord.MessageEmbed();
    //     embed = await nextRace.callback();
    //     client.channels.cache.get('836120516255285289').send(embed);
    //     setTimeout(update, 8000);
    // }
    // setTimeout(update, 8000);

    await getApp(guildId).commands.post({
        data: {
            name: 'balance',
            description: 'Displays Points Balance of Account',
        }
    });

    client.ws.on('INTERACTION_CREATE', async (interaction) => {
        const { name, options } = interaction.data;
        const command = name.toLowerCase();
        console.log(interaction.member.user.username);
        const args = {};

        if (options) {
            options.forEach(element => {
                const { name, value } = element;
                args[name] = value;
            });
        }

        if (command === 'nextrace') {
            let embed = new Discord.MessageEmbed();
            embed = await client.commands.get(command).callback();
            reply(interaction, embed);
        }
        else if (command === 'standings') {
            let embed = new Discord.MessageEmbed();
            embed = await client.commands.get(command).callback(args.driversorteams);
            reply(interaction, embed);
        }
        else if (command === 'streams') {
            let embed = new Discord.MessageEmbed();
            embed = await client.commands.get(command).callback();
            reply(interaction, embed);
        }
        else if (command === 'balance') {
            let embed = new Discord.MessageEmbed();
            embed = await client.commands.get(command).callback(interaction);
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
    const { data, files } = await Discord.APIMessage.create(
        client.channels.resolve(interaction.channel_id),
        content
    )
        .resolveData()
        .resolveFiles();
    return { ...data, files }
}

var token = fs.readFileSync('./token.txt').toString();
client.login(token);