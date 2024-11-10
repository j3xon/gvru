const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Vehicle = require('../../models/vehicle');
const Ticket = require('../../models/ticket');
const License = require('../../models/license');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Displays your or another user\'s profile.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Select a user to view their profile. If not selected, shows your profile.')),

  async execute(interaction) {
    try {
      // Send the "Please wait..." message immediately
      const waitMessage = await interaction.reply({
        content: 'Please wait...',
        ephemeral: true
      });

      // Wait for 1 second before fetching the data
      setTimeout(async () => {
        try {
          // Get the selected user, defaulting to the message author if not provided
          const selectedUser = interaction.options.getUser('user') || interaction.user;
          const userId = selectedUser.id;

          // Fetch the user's license status (default to 'Active' if not found)
          const license = await License.findOne({ userId });
          const licenseStatus = license ? license.status : 'Active';

          // Fetch the user's vehicles
          const vehicles = await Vehicle.find({ userId });
          const vehicleList = vehicles.length > 0 
            ? vehicles.map(vehicle =>
                `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.color} ${vehicle.numberPlate}`).join('\n\n')
            : 'No vehicles registered.';

          // Fetch the user's tickets
          const tickets = await Ticket.find({ userId });
          const ticketList = tickets.length > 0
            ? tickets.map((ticket, index) =>
                `**${index + 1}.** Offense: ${ticket.offense}, Price: ${ticket.price}, Count: ${ticket.count}, Date: ${ticket.date}`).join('\n')
            : 'No tickets found.';

          // Create the profile embed
          const profileEmbed = new EmbedBuilder()
            .setTitle(`${selectedUser.tag}'s Profile`)
            .setDescription(`**User:** <@${selectedUser.id}>\n**License Status:** ${licenseStatus}

              **Vehicles:**\n${vehicleList}\n
              **Tickets:**\n${ticketList}`)
            .setColor('#8accff')
            .setThumbnail(selectedUser.displayAvatarURL({ dynamic: true }));

          // Send the profile embed
          await interaction.editReply({ content: null, embeds: [profileEmbed], ephemeral: false });

        } catch (error) {
          console.error('An error occurred while executing the command:', error);
          await interaction.editReply({ content: 'Womp womp... Something went wrong. Please try again later.', ephemeral: true });
        }
      }, 1000); // Wait for 1 second before proceeding with the rest of the logic

    } catch (error) {
      console.error('An error occurred while sending the initial message:', error);
      await interaction.editReply({ content: 'Womp womp... Something went wrong. Please try again later.', ephemeral: true });
    }
  },
};
