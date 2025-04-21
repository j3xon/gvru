const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('over')
        .setDescription('Ends the session'),

    async execute(interaction) {
        // Check if the user has the required role
        const requiredRoleId = '1343059207900889140';
        if (!interaction.member.roles.cache.has(requiredRoleId)) {
            return await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        try {
            // Create the session over embed
            const embed = new EmbedBuilder()
                .setTitle('Over')
                .setDescription(`> <@${interaction.user.id}> has ended their roleplay session. We hope you enjoyed the session. Feel free to rate the session by filling out the form provided below.
                    
                    > Date: ${new Date().toLocaleDateString()}`)
                .setImage("https://cdn.discordapp.com/attachments/1304716049794469959/1305215245152948257/session_3.png?ex=673237ec&is=6730e66c&hm=ba2c7b45fef3a4bb4f5935349cac8933e48bfe23fab71bf5e551ea155ef43e29&")
                .setColor('#8accff');

            // Create the session log embed
            const startTime = "Start Time"; // Replace with actual start time
            const endTime = "End Time"; // Replace with actual end time
            const date = new Date().toLocaleDateString(); // Current date

            const newEmbed = new EmbedBuilder()
                .setTitle("Command Executed")
                .setDescription(`A roleplay session has ended. Information will be placed below.`)
                .addFields(
                    { name: 'Host', value: `<@${interaction.user.id}>` },
                    { name: 'Start Time', value: startTime },
                    { name: 'End Time', value: endTime },
                    { name: 'Date', value: date }
                )
                .setColor('#8accff');

            // Create the session rating button
            const button = new ButtonBuilder()
                .setCustomId('session_rating_button')
                .setLabel('Session Form')
                .setStyle(ButtonStyle.Primary);

            // Create an ActionRow for the button
            const row = new ActionRowBuilder().addComponents(button);

            // Send the embed to the current channel, mentioning everyone
            await interaction.channel.send({
                embeds: [embed],
                components: [row]
            });

            // Send session log to the specified log channel
            const logChannel = await interaction.client.channels.fetch('1304564515844919296');
            await logChannel.send({ embeds: [newEmbed] });

            // Reply to the interaction to confirm the command was executed
            await interaction.reply({ content: 'Command executed successfully!', ephemeral: true });
        } catch (error) {
            console.error('Error sending messages:', error);
            await interaction.reply({ content: 'Failed to send messages. Please try again later.', ephemeral: true });
        }
    },
};
