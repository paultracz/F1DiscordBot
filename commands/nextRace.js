const axios = require('axios');

module.exports = {
    name: 'next race',
    description: "this is a next race command",
    execute(message, args){
        async function getUser() {
            try {
              const response = await axios.get('http://ergast.com/api/f1/current/next.json');
              var round = (response.data.MRData.RaceTable.round);
              var raceName = (response.data.MRData.RaceTable.Races[0].raceName);
              var date = (response.data.MRData.RaceTable.Races[0].date);
              var time = (response.data.MRData.RaceTable.Races[0].time);
              message.reply('\nRound: ' + round + '\nRace: ' + raceName + '\nDate: ' + date + '\nTime: ' + time);
              console.log('Round: ' + round + '\nRace: ' + raceName + '\nDate: ' + date + '\nTime: ' + time);
            } catch (error) {
              console.error(error);
            }
          }
        getUser();
    }
}