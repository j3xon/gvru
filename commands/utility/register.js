
const { SlashCommandBuilder } = require('discord.js');
const Vehicle = require('../../models/vehicle');
const logChannelId = '1304564515844919296';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Register your vehicle.')
    .addIntegerOption(option =>
      option.setName('year')
        .setDescription('Vehicle Year')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('make')
        .setDescription('Vehicle Make')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('model')
        .setDescription('Vehicle Model')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('color')
        .setDescription('Vehicle Color')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('number-plate')
        .setDescription('Vehicle Number Plate')
        .setRequired(true)),

  async execute(interaction) {
    try {
      await interaction.deferReply({ ephemeral: true });

      const year = interaction.options.getInteger('year');
      const make = interaction.options.getString('make');
      const model = interaction.options.getString('model');
      const color = interaction.options.getString('color');
      const numberPlate = interaction.options.getString('number-plate');
      const userId = interaction.user.id;

      const newVehicle = new Vehicle({
        userId,
        year,
        make,
        model,
        color,
        numberPlate
      });
      await newVehicle.save();

      await interaction.editReply({
        content: 'Your vehicle has been successfully registered. To view your registered vehicles, please use the `/profile` command.',
        ephemeral: true
      });

      const logChannel = await interaction.guild.channels.fetch(logChannelId);
      if (logChannel) {
        const registrationMessage = `New Vehicle Registration:\n**User:** <@${userId}>\n**Year:** ${year}\n**Make:** ${make}\n**Model:** ${model}\n**Color:** ${color}\n**Number Plate:** ${numberPlate}`;
        await logChannel.send(registrationMessage);
      } else {
        console.error('Log channel not found');
      }

    } catch (error) {
      console.error('Error processing vehicle registration:', error);
      if (!interaction.replied) {
        await interaction.editReply({
          content: 'An error occurred while processing your request. Please try again later.',
          ephemeral: true
        });
      }
    }
  },
};
