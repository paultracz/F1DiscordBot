module.exports = {
    slash: 'both',
    testOnly: true,
    description: "this is a ping pong command",
    callback: ({message}) => {
        if (message) {
            message.reply('pong!');
        }
        return 'pong!'
    }
}