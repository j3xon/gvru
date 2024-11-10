// events/buttonInteraction.js

const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        // Check if the interaction is a button
        if (!interaction.isButton()) return;

        // Define the role ID you want to toggle
        const roleId1 = '1304814255454945363';
        const member = interaction.member;

        if (interaction.customId === 'toggle_ping' || interaction.customId === 'startup_cm2') {
            // Toggle the role for the user
            if (member.roles.cache.has(roleId1)) {
                await member.roles.remove(roleId1);

                // Send ephemeral embed for role removal
                const roleRemovedEmbed = new EmbedBuilder()
                    .setDescription('Role removed successfully.')
                    .setColor('#8accff');

                await interaction.reply({ embeds: [roleRemovedEmbed], ephemeral: true });
            } else {
                await member.roles.add(roleId1);

                // Send ephemeral embed for role addition
                const roleAddedEmbed = new EmbedBuilder()
                    .setDescription('Role given successfully.')
                    .setColor('#8accff');

                await interaction.reply({ embeds: [roleAddedEmbed], ephemeral: true });
            }
        }
    },
};
