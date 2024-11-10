const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Purges a specified number of messages in the channel.')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('The number of messages to delete')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)),

  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');

    // Check if the user has the right permissions
    if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
      return interaction.reply({ content: 'You do not have permission to purge messages.', ephemeral: true });
    }

    try {
      // Fetch and delete messages
      const messages = await interaction.channel.messages.fetch({ limit: amount });
      await interaction.channel.bulkDelete(messages, true);

      // Respond with a success message
      return interaction.reply({ content: `${amount} messages have been deleted.`, ephemeral: true });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: 'There was an error while trying to purge the messages.', ephemeral: true });
    }
  },
};
