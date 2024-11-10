const { ActivityType } = require("discord.js");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} online`); // Logs when the bot is online

        // Set the bot's activity
        client.user.setActivity("discord.gg/gvunity", { type: ActivityType.Watching });
        client.user.setStatus("online");
    },
};
