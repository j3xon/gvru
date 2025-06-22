const { ActivityType } = require("discord.js");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} online`);

        client.user.setActivity("discord.gg/gvunity", { type: ActivityType.Watching });
        client.user.setStatus("online");
    },
};
