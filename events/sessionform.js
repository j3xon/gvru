// events/modalSubmit.js
const { EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        // Check if the interaction is a button interaction
        if (interaction.isButton()) {
            if (interaction.customId === 'session_rating_button') {
                // Create a modal to get the rating and feedback
                const modal = new ModalBuilder()
                    .setCustomId('session_rating_modal')
                    .setTitle('Session Form');

                // Rating input
                const ratingInput = new TextInputBuilder()
                    .setCustomId('rating')
                    .setLabel('How would you rate the session? (1-5)')
                    .setStyle('1');

                // Feedback input
                const feedbackInput = new TextInputBuilder()
                    .setCustomId('feedback')
                    .setLabel('How was the session?')
                    .setStyle('2'); // Use PARAGRAPH for longer responses

                // Create action rows for the inputs
                const ratingRow = new ActionRowBuilder().addComponents(ratingInput);
                const feedbackRow = new ActionRowBuilder().addComponents(feedbackInput);

                // Add the input rows to the modal
                modal.addComponents(ratingRow, feedbackRow);

                // Show the modal to the user
                await interaction.showModal(modal);
            }
        }

        // Check if the interaction is a modal submit
        if (interaction.isModalSubmit()) {
            if (interaction.customId === 'session_rating_modal') {
                const rating = interaction.fields.getTextInputValue('rating');
                const feedback = interaction.fields.getTextInputValue('feedback'); // Get feedback
                const host = interaction.message.embeds[0].description.match(/<@(\d+)>/)[1]; // Extract host ID from the embed
                const rater = interaction.user.id;

                const ratingEmbed = new EmbedBuilder()
                    .setTitle('Session Rating')
                    .setDescription(`**Session Host:** <@${host}>\n**Rater:** <@${rater}>\n**Rating:** ${rating}\n**Feedback:** ${feedback}`)
                    .setColor('#8accff');

                const targetChannel = await interaction.client.channels.fetch('1304564515844919296');
                await targetChannel.send({ embeds: [ratingEmbed] });

                await interaction.reply({ content: 'Thank you for your rating!', ephemeral: true });
            }
        }
    }
};
