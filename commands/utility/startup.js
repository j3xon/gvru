const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startup')
        .setDescription('Sends a startup embed')
        .addIntegerOption(option =>
            option.setName('reactions')
                .setDescription('Amount of reactions for the session to occur')
                .setRequired(true)),
    
    async execute(interaction) {
        const requiredRoleId = '1304808118840197120';
        if (!interaction.member.roles.cache.has(requiredRoleId)) {
            return interaction.reply({
                content: "You do not have permission to use this command.",
                ephemeral: true
            });
        }

        try {
            await interaction.deferReply({ ephemeral: true });
            const reactions = interaction.options.getInteger('reactions');
            const userid = interaction.user.id;

            const embed = new EmbedBuilder()
                .setTitle('Startup')
                .setDescription(`> <@${userid}> has started a roleplay session. Ensure you have read our session guidelines and server guidelines provided at <#1304561080839835679>

                    > To participate in the session react below to ensure you're joining the session
                    > Ensure your vehicles are registered. To register your vehicle, use the \`/register\` command in <#1304562281840902205>
                    
                    > **Reactions Required:** ${reactions}`)
                .setImage("https://cdn.discordapp.com/attachments/1304716049794469959/1305212496268755034/session.png?ex=6732355c&is=6730e3dc&hm=f9177dcf7eab59a1119777e7837464516b35c280ddc3e29ebeaeca2ee1dfd69d&")
                .setColor('#8accff');

            const sentMessage = await interaction.channel.send({ content: '@here', embeds: [embed] });
            await sentMessage.react('✅');

            const targetChannelId = '1304564515844919296';
            const targetChannel = await interaction.client.channels.fetch(targetChannelId);
            if (!targetChannel) throw new Error("Target channel not found.");

            const newEmbed = new EmbedBuilder()
                .setTitle("Command Executed")
                .setDescription(`A roleplay session has been initiated. Information will be placed below.`)
                .setFields([
                    { name: 'Host', value: `<@${interaction.user.id}>`, inline: true },
                    { name: 'Reactions', value: `${reactions}`, inline: true },
                    { name: 'Channel', value: `<#${interaction.channel.id}>`, inline: true }
                ])
                .setColor('#8accff');

            await targetChannel.send({ embeds: [newEmbed] });
            
            await interaction.editReply({ content: 'Command completed successfully', ephemeral: true });

        } catch (error) {
            console.error("An error occurred: ", error);
            await interaction.followUp({
                content: "An error occurred while processing your request.",
                ephemeral: true
            });
        }
    },
};
