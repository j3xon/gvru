const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'show_roles') {
            const roles = interaction.guild.roles.cache
                .filter(role => role.name !== '@everyone')
                .map(role => role.toString())
                .join(', ') || 'No roles available';

            const rolesEmbed = new EmbedBuilder()
                .setTitle('Server Roles')
                .setDescription(roles)
                .setColor('#8accff')
                .setTimestamp();

            await interaction.reply({ embeds: [rolesEmbed], ephemeral: true });
        }
    },
};
