const { SlashCommandBuilder, EmbedBuilder, PermissonFlags, Permisson, PermissionsBitField } = require('discord.js');
const Verify = require('../../models/verify'); // Import the Mongoose model from the correct path

module.exports = {
    data: new SlashCommandBuilder()
        .setName('collectroblox')
        .setDescription('Collect and send all Roblox User IDs to my DMs'),

    async execute(interaction) {
        try {
            const verifyRecords = await Verify.find();

            if (verifyRecords.length === 0) {
                await interaction.reply({
                    content: 'No Roblox IDs found in the database.',
                    ephemeral: true,
                });
                return;
            }
            let robloxIdsList = 'Here are all the collected Roblox IDs:\n';
            verifyRecords.forEach(record => {
                robloxIdsList += `**User**: <@${record.userId}> | **Roblox ID**: ${record.robloxId}\n`;
            });

            const user = await interaction.client.users.fetch(`${interaction.user.id}`);
            await user.send({
                content: robloxIdsList,
            });

            await interaction.reply({
                content: 'All Roblox IDs have been sent to the administrator\'s DMs.',
                ephemeral: true,
            });

        } catch (error) {
            console.error('Error querying the database:', error);
            await interaction.reply({
                content: 'An error occurred while collecting Roblox IDs.',
                ephemeral: true,
            });
        }
    },
};
