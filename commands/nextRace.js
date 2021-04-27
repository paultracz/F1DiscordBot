const axios = require('axios');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'nextrace',
    callback: () => {
        const embed = new MessageEmbed()
            .setTitle('Upcoming Race');

        async function getData() {
            try {
                const response = await axios.get('http://ergast.com/api/f1/current/next.json?limit=1');
                const responseTotal = await axios.get('http://ergast.com/api/f1/current.json');
                let totalRounds = (responseTotal.data.MRData.total);
                let round = (response.data.MRData.RaceTable.round);
                let raceName = (response.data.MRData.RaceTable.Races[0].raceName);
                let circuitName = (response.data.MRData.RaceTable.Races[0].Circuit.circuitName);
                let date = (response.data.MRData.RaceTable.Races[0].date);
                let time = (response.data.MRData.RaceTable.Races[0].time);
                let parsedDate = date + 'T' + time;
                let newDate = new Date(parsedDate);
                let weekday = getDayOfWeek(newDate);
                let month = getMonthOfYear(newDate);
                let dayOfMonth = newDate.getDate();
                let year = new Date(date).getFullYear();
                let localTime = newDate.toLocaleTimeString();
                let currentDate = new Date();
                const diffTime = Math.abs(newDate - currentDate);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                let diffHours, diffMins;
                if (diffDays >= 1) {
                    diffHours = Math.floor((diffTime - diffDays * 1000 * 60 * 60 * 24) / (1000 * 60 * 60));
                    diffMins = Math.ceil((diffTime - (diffHours * 1000 * 60 *60) - (diffDays * 1000 * 60 * 60 * 24)) / (1000 * 60));
                }
                else {
                    diffHours = Math.floor(diffTime / (1000 * 60 * 60));
                    diffMins = Math.ceil((diffTime - (diffHours * 1000 * 60 * 60)) / (1000 * 60));
                }                           

                embed.addField('Round', (round + '/' + totalRounds));
                embed.addField('Race', raceName);
                embed.addField('Circuit', circuitName);
                embed.addField('Date and Time', weekday + ', ' + month
                    + ' ' + dayOfMonth + ', ' + year + '\n'
                    + localTime.substr(0, 5) + localTime.substr(-5));
                embed.addField('Time Remaining', diffDays + " days, "
                    + diffHours + " hours, " +
                    + diffMins + " mins");


            } catch (error) {
                console.error(error);
            }
            return embed
        }
        return getData();
    }
}

function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}

function getMonthOfYear(date) {
    const monthOfYear = new Date(date).getMonth();
    return isNaN(monthOfYear) ? null :
        ['January', 'February', 'March', 'April', 'May', 'June', 'July'
            , 'August', 'September', 'October', 'November', 'December'][monthOfYear];
}