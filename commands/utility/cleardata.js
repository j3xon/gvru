const { SlashCommandBuilder } = require('discord.js');
const Vehicle = require('../../models/vehicle');
const Ticket = require('../../models/ticket');
const License = require('../../models/license');
const Verification = require('../../models/verify');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clearuser')
    .setDescription('Clears all data for a specified user by user ID.')
    .addStringOption(option =>
      option.setName('userid')
        .setDescription('User ID of the user whose data you want to clear.')
        .setRequired(true)),

  async execute(interaction) {
    try {
      // Check if the user has the required role (Replace with your role ID)
      const requiredRoleId = '1304801318216532070'; // Replace with the actual role ID
      if (!interaction.member.roles.cache.has(requiredRoleId)) {
        return interaction.reply({ content: 'You do not have permission to use this command. You must have the appropriate admin role.', ephemeral: true });
      }

      // Get the user ID from the command
      const userId = interaction.options.getString('userid');

      // Delete data from the relevant collections
      const verificationData = await Verification.findOneAndDelete({ discordId: userId });
      const vehicleData = await Vehicle.deleteMany({ userId });
      const ticketData = await Ticket.deleteMany({ userId });
      const licenseData = await License.findOneAndDelete({ userId });

      // Check if any data was deleted and reply accordingly
      if (verificationData || vehicleData.deletedCount > 0 || ticketData.deletedCount > 0 || licenseData) {
        await interaction.reply({ content: `Successfully cleared all data for user <@${userId}>.`, ephemeral: true });
      } else {
        await interaction.reply({ content: `No data found for the user <@${userId}>.`, ephemeral: true });
      }
    } catch (error) {
      console.error('An error occurred while clearing user data:', error);
      await interaction.reply({ content: 'Womp womp... Something went wrong while clearing the data. Please try again later.', ephemeral: true });
    }
  },
};
