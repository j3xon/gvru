// events/buttonInteraction.js

const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;

        const roleId1 = '1304814255454945363';
        const member = interaction.member;

        if (interaction.customId === 'toggle_ping' || interaction.customId === 'startup_cm2') {
            if (member.roles.cache.has(roleId1)) {
                await member.roles.remove(roleId1);

                const roleRemovedEmbed = new EmbedBuilder()
                    .setDescription('Role removed successfully.')
                    .setColor('#8accff');

                await interaction.reply({ embeds: [roleRemovedEmbed], ephemeral: true });
            } else {
                await member.roles.add(roleId1);

                const roleAddedEmbed = new EmbedBuilder()
                    .setDescription('Role given successfully.')
                    .setColor('#8accff');

                await interaction.reply({ embeds: [roleAddedEmbed], ephemeral: true });
            }
        }
    },
};
