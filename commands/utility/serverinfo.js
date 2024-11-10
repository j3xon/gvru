const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Provides information about the server'),

    async execute(interaction) {
        const guild = interaction.guild;

        const embed = new EmbedBuilder()
            .setTitle(`Server Information - ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
            .addFields(
                { name: 'Server Name', value: `${guild.name}`, inline: true },
                { name: 'Server ID', value: `${guild.id}`, inline: true },
                { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Total Members', value: `${guild.memberCount}`, inline: true },
                { name: 'Boost Level', value: `${guild.premiumTier}`, inline: true },
                { name: 'Boost Count', value: `${guild.premiumSubscriptionCount || 0}`, inline: true },
                { name: 'Creation Date', value: `${guild.createdAt.toDateString()}`, inline: true }
            )
            .setColor('#8accff')
            .setFooter({ text: 'Server Info Command' })
            .setTimestamp();

        const bannerURL = guild.bannerURL({ size: 1024 });
        if (bannerURL) {
            embed.setImage(bannerURL);
        }

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('show_roles')
                .setLabel('Roles')
                .setStyle(ButtonStyle.Primary)
        );

        await interaction.reply({ embeds: [embed], components: [row] });
    },
};
