const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startup-msg')
        .setDescription('Gives Startup msg'),
    async execute(interaction) {

        const image = "https://cdn.discordapp.com/attachments/1304716049794469959/1304813841917415434/Information_8.png?ex=67321396&is=6730c216&hm=2334057b2c77dbd06d9ab344422474d693b4469b2db32c157b3cc634df32a10f&";

        const embed1 = new EmbedBuilder()
            .setTitle('GVRU | Server Startup')
            .setDescription("> This is the designated area for hosting and conducting sessions. Before you participate, please familiarize yourself with the startup guidelines outlined below. It's crucial to review these rules prior to joining any sessions. Additionally, consult the Banned Vehicle List before selecting a car to drive.")
            .setThumbnail('https://cdn.discordapp.com/icons/1304558354428858398/bfe3e62f4b193331edfef3170ce1e40a.png')
            .setColor('#8accff');
            
        const embed2 = new EmbedBuilder()
            .setTitle('Startup Regulations')
            .setDescription(`> - In this channel, you'll be notified when a session begins! Please don't request sessions or re-invites.
> - Don't inquire about sessions or start times. You'll be notified with the Sessions role when a session starts or for any re-invites. Violations will result in a mute.`)
.setColor('#8accff')
            .setFooter({
                text: 'Greenville Roleplay Unity',
                iconURL: 'https://cdn.discordapp.com/icons/1304558354428858398/bfe3e62f4b193331edfef3170ce1e40a.png'
            });

        const button1 = new ButtonBuilder()
            .setCustomId('toggle_ping')
            .setLabel('Session Ping')
            .setStyle(ButtonStyle.Secondary);
        
        const row = new ActionRowBuilder()
            .addComponents(button1);

        await interaction.channel.send({ files: [image], embeds: [embed1, embed2], components: [row] });

        await interaction.reply({ content: 'Command Sent Below.', ephemeral: true });
    },
};
