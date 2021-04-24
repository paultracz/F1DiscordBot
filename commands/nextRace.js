const axios = require('axios');

module.exports = {
    slash: 'both',
    testOnly: true,
    description: "Displays information for the upcoming F1 race",
    callback: ({ message }) => {
        async function getUser() {
            try {
                const response = await axios.get('http://ergast.com/api/f1/current/next.json');
                const responseTotal = await axios.get('http://ergast.com/api/f1/current.json');
                var totalRounds = (responseTotal.data.MRData.total);
                var round = (response.data.MRData.RaceTable.round);
                var raceName = (response.data.MRData.RaceTable.Races[0].raceName);
                var date = (response.data.MRData.RaceTable.Races[0].date);
                var time = (response.data.MRData.RaceTable.Races[0].time);
                var parsedDate = date + 'T' + time;
                var newDate = new Date(parsedDate);
                var weekday = getDayOfWeek(newDate);
                var month = getMonthOfYear(newDate);
                var dayOfMonth = newDate.getDate();
                var year = new Date(date).getFullYear();
                var localTime = newDate.toLocaleTimeString();
                var output = ('\nRound: ' + round
                    + '/' + totalRounds
                    + '\nRace: ' + raceName
                    + '\nDate: ' + weekday
                    + ', ' + month
                    + ' ' + dayOfMonth
                    + ', ' + year
                    + '\nTime: ' + localTime);
                if (message) {
                    message.reply(output);
                }

            } catch (error) {
                console.error(error);
            }
            return output;
        }
        return getUser();
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