// commands/utility/unregister.js
const { SlashCommandBuilder } = require('discord.js');
const Vehicle = require('../../models/vehicle'); // Assumes a Mongoose model named 'Vehicle' is defined

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unregister')
        .setDescription('Unregister a vehicle.')
        .addStringOption(option =>
            option.setName('brand')
                .setDescription('The brand (make) of the vehicle to unregister.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('model')
                .setDescription('The model of the vehicle to unregister.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('color')
                .setDescription('The color of the vehicle to unregister.')
                .setRequired(true)),

    async execute(interaction) {
        try {
            const userId = interaction.user.id;
            const brand = interaction.options.getString('brand');
            const modelInput = interaction.options.getString('model');  // Renamed to `modelInput`
            const colorInput = interaction.options.getString('color');  // Renamed to `colorInput`

            // Find the vehicle by brand, model, color, and user ID
            const vehicle = await Vehicle.findOne({ userId, make: brand, model: modelInput, color: colorInput });

            if (!vehicle) {
                await interaction.reply({ content: 'No vehicle found with those details.', ephemeral: true });
                return;
            }

            // Extract vehicle details for the response
            const { year, make, model, color, numberPlate } = vehicle;

            // Delete the vehicle from the database
            await Vehicle.findOneAndDelete({ userId, make: brand, model: modelInput, color: colorInput });

            // Send a confirmation message with full vehicle details
            await interaction.reply({
                content: `The following vehicle has been unregistered successfully:\n**Brand:** ${make}\n**Model:** ${model}\n**Color:** ${color}\n**Year:** ${year}\n**Number Plate:** ${numberPlate}`,
                ephemeral: true
            });

        } catch (error) {
            console.error('An error occurred while executing the command:', error);
            await interaction.reply({ content: 'An error occurred while processing your request. Please try again later.', ephemeral: true });
        }
    },
};
