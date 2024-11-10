const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, Permissions } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticketsupport')
    .setDescription('Open a ticket support dropdown.'),
  async execute(interaction) {
    // Check if the user has admin permissions
    const banner = "https://cdn.discordapp.com/attachments/1304716049794469959/1304817751306801163/Information_9.png?ex=6730c5ba&is=672f743a&hm=d5dd578dbeb80c75f1af874e133a360787df8254c3e20ca960810ba21d5dd230&"

    // Acknowledge the interaction immediately
    await interaction.deferReply(); 

    // Create the embed message
    const embed = new EmbedBuilder()
      .setTitle('Server Support')
      .setDescription('> Please select the appropriate option for the ticket you wish to open. Opening a ticket for the wrong reason or for trolling purposes will lead to necessary consequences. We appreciate your patience, as our staff may be attending to multiple inquiries at once.')
      .setColor('#8accff')
            .setFooter({
                text: 'Greenville Roleplay Unity',
                iconURL: 'https://cdn.discordapp.com/icons/1304558354428858398/bfe3e62f4b193331edfef3170ce1e40a.png'
            });

    // Create the dropdown menu
    const row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('supportOptions')
          .setPlaceholder('Select an option')
          .addOptions([
            {
              label: 'Support Ticket',
              description: `Open a ticket to get assistance.`,
              value: 'st',
            },
            {
              label: 'Member Report',
              description: 'Report a member to the HR Team',
              value: 'bp',
            },
          ])
      );

    // Send the embed with the dropdown to the specified channel
    const supportChannel = interaction.guild.channels.cache.get('1304563728058028043');
    if (supportChannel) {
      await supportChannel.send({ files: [banner], embeds: [embed], components: [row] });
      await interaction.followUp({ content: 'The support ticket options have been sent.', ephemeral: true });
    } else {
      await interaction.followUp({ content: 'Unable to find the support channel.', ephemeral: true });
    }
  },
};
