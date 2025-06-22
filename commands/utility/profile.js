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
      const waitMessage = await interaction.reply({
        content: 'Please wait...',
        ephemeral: true
      });

      setTimeout(async () => {
        try {
          const selectedUser = interaction.options.getUser('user') || interaction.user;
          const userId = selectedUser.id;

          const license = await License.findOne({ userId });
          const licenseStatus = license ? license.status : 'Active';

          const vehicles = await Vehicle.find({ userId });
          const vehicleList = vehicles.length > 0 
            ? vehicles.map(vehicle =>
                `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.color} ${vehicle.numberPlate}`).join('\n\n')
            : 'No vehicles registered.';

          const tickets = await Ticket.find({ userId });
          const ticketList = tickets.length > 0
            ? tickets.map((ticket, index) =>
                `**${index + 1}.** Offense: ${ticket.offense}, Price: ${ticket.price}, Count: ${ticket.count}, Date: ${ticket.date}`).join('\n')
            : 'No tickets found.';

          const profileEmbed = new EmbedBuilder()
            .setTitle(`${selectedUser.tag}'s Profile`)
            .setDescription(`**User:** <@${selectedUser.id}>\n**License Status:** ${licenseStatus}

              **Vehicles:**\n${vehicleList}\n
              **Tickets:**\n${ticketList}`)
            .setColor('#8accff')
            .setThumbnail(selectedUser.displayAvatarURL({ dynamic: true }));

          await interaction.editReply({ content: null, embeds: [profileEmbed], ephemeral: false });

        } catch (error) {
          console.error('An error occurred while executing the command:', error);
          await interaction.editReply({ content: 'Womp womp... Something went wrong. Please try again later.', ephemeral: true });
        }
      }, 1000);

    } catch (error) {
      console.error('An error occurred while sending the initial message:', error);
      await interaction.editReply({ content: 'Womp womp... Something went wrong. Please try again later.', ephemeral: true });
    }
  },
};
