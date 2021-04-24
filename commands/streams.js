module.exports = {
    slash: 'both',
    testOnly: true,
    description: "this is a ping pong command",
    callback: ({message}) => {
        if (message) {
            message.reply('https://sportsurge.net/#/groups/13');
        }
        return 'https://sportsurge.net/#/groups/13'
    }
}