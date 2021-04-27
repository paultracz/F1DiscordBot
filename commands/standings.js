const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'standings',
    callback: async (args) => {
        const embed = new MessageEmbed();
        async function getData() {
            const input = args;
            if (input.toLowerCase() === 'drivers') {
                embed.setTitle('Driver Standings');
                const response = await axios.get('http://ergast.com/api/f1/current/driverstandings.json?limit=20');
                const data = response.data.MRData.StandingsTable.StandingsLists[0];
                let positions = [];
                let drivers = [];
                let points = [];
                data.DriverStandings.forEach(obj => {
                    let fullName = obj.Driver.givenName + ' ' + obj.Driver.familyName;
                    positions.push(obj.position);
                    drivers.push(fullName);
                    points.push(obj.points);
                }); {
                }
                embed.addField('Pos', positions, inline = true);
                embed.addField('Driver', drivers, inline = true);
                embed.addField('Points', points, inline = true);
            }
            else if (input.toLowerCase() === 'teams') {
                embed.setTitle('Team Standings');
                const response = await axios.get('http://ergast.com/api/f1/current/constructorStandings.json?limit=20');
                const data = response.data.MRData.StandingsTable.StandingsLists[0];
                let positions = [];
                let teams = [];
                let points = [];
                data.ConstructorStandings.forEach(obj => {
                    positions.push(obj.position);
                    teams.push(obj.Constructor.name);
                    points.push(obj.points);
                });
                embed.addField('Pos', positions, inline = true);
                embed.addField('Driver', teams, inline = true);
                embed.addField('Points', points, inline = true);
            }
            else {
                embed.setDescription('Unable to find results for ' + input);
            }
            return embed;
        }
        return getData();
    }
}
