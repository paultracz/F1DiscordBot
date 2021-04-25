module.exports = {
    slash: 'both',
    testOnly: true,
    description: "Displays link to view F1 streams",
    callback: ({message}) => {
        if (message) {
            message.reply('https://sportsurge.net/#/groups/13');
        }
        return 'https://sportsurge.net/#/groups/13'
    }
}