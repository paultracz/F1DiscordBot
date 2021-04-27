const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const money = require('../money.json');

module.exports = {
    name: 'balance',
    callback: (interaction) => {
        let user = interaction.member.user;
        const embed = new MessageEmbed()
            .setTitle(`${user.username} Balance`);        

        if (!money[user.id]) {
            money[user.id] = {
                name: user.username,
                money: 0,
                betPlaced: 0,
            }
            fs.writeFile('./money.json', JSON.stringify(money), (error) => {
                if (error) console.log(error);
            });
        }
        embed.addField(`Money: `, `$${money[user.id].money}`);
        embed.addField(`Bets Placed: `, `$${money[user.id].betPlaced}`);
        return embed;
    }    
}
