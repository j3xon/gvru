const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Ticket = require('../../models/ticket'); // Import the Ticket model

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Create a new ticket.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user for whom the ticket is being created.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('offense')
                .setDescription('The offense for the ticket')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('price')
                .setDescription('The price for the ticket')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('count')
                .setDescription('The count for the ticket')
                .setRequired(true)),

    async execute(interaction) {
        const allowedRoleIds = ['1304564863082692719'];
        const hasRole = interaction.member.roles.cache.some(role => allowedRoleIds.includes(role.id));

        if (!hasRole) {
            const embed = new EmbedBuilder()
                .setTitle('Role Not Found')
                .setDescription('You do not have permission to use this command.')
                .setColor('#FF0000');

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const user = interaction.options.getUser('user');
        const offense = interaction.options.getString('offense');
        const price = interaction.options.getInteger('price');
        const count = interaction.options.getInteger('count');
        const userId = user.id;

        try {
            const ticketData = new Ticket({
                userId,
                offense,
                price,
                count,
                date: new Date()
            });

            await ticketData.save();

            const replyEmbed = new EmbedBuilder()
                .setTitle('Ticket Created')
                .setDescription(`The ticket for <@${userId}> has been created successfully.`)
                .addFields(
                    { name: 'Offense', value: offense, inline: true },
                    { name: 'Price', value: price.toString(), inline: true },
                    { name: 'Count', value: count.toString(), inline: true }
                )
                .setColor('#f1efef');

            await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
        } catch (error) {
            console.error('Error executing the ticket command:', error);
            return interaction.reply({ content: 'An error occurred while creating the ticket. Please try again later.', ephemeral: true });
        }
    },
};
