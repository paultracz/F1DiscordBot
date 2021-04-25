const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    slash: 'both',
    testOnly: true,
    description: "Displays current driver standings",
    minArgs: 1,
    expectedArgs: '<Drivers or Teams>',
    callback: async ({ message, args }) => {
        const embed = new MessageEmbed()
        async function getData() {
        const [input] = args;
            if (input.toLowerCase() === 'drivers') {
                embed.setTitle('Driver Standings');
                const response = await axios.get('http://ergast.com/api/f1/current/driverstandings.json?limit=20');
                const data = response.data.MRData.StandingsTable.StandingsLists[0];                
                var positions = [];
                var drivers = [];
                var points = [];
                for (var i = 0; i < data.DriverStandings.length; i++) {
                    var obj = data.DriverStandings[i];
                    var fullName = obj.Driver.givenName + ' ' + obj.Driver.familyName;
                    positions.push(obj.position);
                    drivers.push(fullName);
                    points.push(obj.points);
                }
                embed.addField('Pos', positions, inline = true)
                embed.addField('Driver', drivers, inline = true)
                embed.addField('Points', points, inline = true)
            }
            else if (input.toLowerCase() === 'teams') {
                embed.setTitle('Team Standings');
                const response = await axios.get('http://ergast.com/api/f1/current/constructorStandings.json?limit=20');
                const data = response.data.MRData.StandingsTable.StandingsLists[0];
                var positions = [];
                var teams = [];
                var points = [];
                for (var i = 0; i < data.ConstructorStandings.length; i++) {
                    var obj = data.ConstructorStandings[i];
                    positions.push(obj.position);
                    teams.push(obj.Constructor.name);
                    points.push(obj.points);
                }
                embed.addField('Pos', positions, inline = true)
                embed.addField('Driver', teams, inline = true)
                embed.addField('Points', points, inline = true)
            }
            else {
                embed.setDescription('Unable to find results for ' + input);
            }

            try {
                if (message) {
                    message.reply('standings', { embed });
                }

            } catch (error) {
                console.error(error);
            }
            return embed;
        }
        return getData();
    }
}
