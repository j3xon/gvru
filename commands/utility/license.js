// commands/utility/license.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const License = require('../../models/license'); // Import the License model

module.exports = {
    data: new SlashCommandBuilder()
        .setName('license')
        .setDescription('Set the license status for a specific user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user whose license status you want to set.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('status')
                .setDescription('The license status (valid or not valid) ')
                .setRequired(true)
                .addChoices(
                    { name: 'Valid', value: 'valid' },
                    { name: 'Not Valid', value: 'not_valid' })),

    async execute(interaction) {
        const allowedRoleIds = ['1285913544327565324'];
        const hasAdminRole = interaction.member.roles.cache.some(role => allowedRoleIds.includes(role.id));

        if (!hasAdminRole) {
            const embed = new EmbedBuilder()
                .setTitle('Permission Denied')
                .setDescription('You do not have permission to set the license status.')
                .setColor('#FF0000');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const user = interaction.options.getUser('user');
        const status = interaction.options.getString('status');
        const userId = user.id;

        try {
            // Find existing license data for the user
            let license = await License.findOne({ userId });

            if (license) {
                // If a license exists, update it
                license.status = status;
                license.date = new Date();
                await license.save();
            } else {
                // If no license exists, create a new one
                license = new License({ userId, status, date: new Date() });
                await license.save();
            }

            await interaction.reply({ content: `License status for <@${userId}> has been set to ${status}.`, ephemeral: true });

        } catch (error) {
            console.error('An error occurred while setting the license status:', error);
            await interaction.reply({ content: 'An error occurred while processing your request. Please try again later.', ephemeral: true });
        }
    },
};
