const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkpoint')
        .setDescription('Gives checkpoint msg'),
    async execute(interaction) {

        const embed1 = new EmbedBuilder()
            .setTitle('GVRU | Checkpoint')
            .setDescription(`> This is a designated area made for in game verification to ensure our staff team you are not a leaker. To verify follow the format below.
                
                User: [Your Roblox Username]
                Host: [Their Roblox Username]
                
            > Failing to do this would result in suspension of you being a leaker. Leaking the session would also result in a permanent ban from the server.`)
            .setThumbnail('https://cdn.discordapp.com/icons/1304558354428858398/bfe3e62f4b193331edfef3170ce1e40a.png')
            .setColor('#8accff');
            
    

        await interaction.channel.send({ embeds: [embed1]});

        await interaction.reply({ content: 'Command Sent Below.', ephemeral: true });
    },
};
