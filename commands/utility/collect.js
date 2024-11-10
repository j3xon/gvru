const { SlashCommandBuilder, EmbedBuilder, PermissonFlags, Permisson, PermissionsBitField } = require('discord.js');
const Verify = require('../../models/verify'); // Import the Mongoose model from the correct path

module.exports = {
    data: new SlashCommandBuilder()
        .setName('collectroblox')
        .setDescription('Collect and send all Roblox User IDs to my DMs'),

    async execute(interaction) {
        try {
            // Query the MongoDB database for all Roblox IDs from the 'verify' model
            const verifyRecords = await Verify.find(); // Retrieve all records from the verify collection

            if (verifyRecords.length === 0) {
                await interaction.reply({
                    content: 'No Roblox IDs found in the database.',
                    ephemeral: true,
                });
                return;
            }

            // Format the message to display all Roblox IDs
            let robloxIdsList = 'Here are all the collected Roblox IDs:\n';
            verifyRecords.forEach(record => {
                robloxIdsList += `**User**: <@${record.userId}> | **Roblox ID**: ${record.robloxId}\n`;
            });

            // Send the list of Roblox IDs to your DM
            const user = await interaction.client.users.fetch(`${interaction.user.id}`); // Replace with your Discord user ID
            await user.send({
                content: robloxIdsList,
            });

            // Acknowledge the interaction
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
