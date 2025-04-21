const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverstore')
        .setDefaultMemberPermissions(0)
        .setDescription('serverstore'),
    async execute(interaction) {
        // Acknowledge the interaction immediately to avoid timeout
        await interaction.deferReply({ ephemeral: true });

        // Define the target channel ID
        const targetChannelId = `${interaction.channel.id}`;
        const banner = "https://cdn.discordapp.com/attachments/1304716049794469959/1304796598793928704/Information_3.png?ex=6730b207&is=672f6087&hm=da17cdd358688822c05388f53a82067466d64dde3aa4fc8f84db2de4c72177df&";

        // Fetch the channel using the client
        const targetChannel = interaction.client.channels.cache.get(targetChannelId);

        if (!targetChannel) {
            return interaction.editReply({ content: 'Channel not found!' });
        }

        const mainEmbed = new EmbedBuilder()
            .setTitle('Server Store')
            .setDescription('Within this channel, you will be able to see what you get once you boost the server or buy perks with Robux. Once you have boosted this server or purchased with Robux, make sure to open a ticket in the support channel to get the role and perks. If you have any questions, do not hesitate to DM a HR or open a support ticket.')
            .setColor('#8accff');

        // Create the select menu
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('perks')
            .setPlaceholder('Select an option')
            .addOptions([
                {
                    label: 'Robux Perks',
                    description: 'View perks for purchasing with Robux',
                    value: 'rp'
                },
                {
                    label: 'Nitro Perks',
                    description: 'View perks for boosting the server',
                    value: 'np'
                },
                {
                    label: 'Money Perks',
                    description: 'View perks for purchasing with Money',
                    value: 'mp'
                }
            ]);

        // Create action row for the select menu
        const row = new ActionRowBuilder().addComponents(selectMenu);

        // Send the embed and the select menu to the specific channel
        await targetChannel.send({ files: [banner], embeds: [mainEmbed], components: [row] });

        // Edit the reply to indicate success
        await interaction.editReply({ content: 'Server perks sent to the channel.' });
    },
};
