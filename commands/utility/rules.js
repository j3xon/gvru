const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Displays server information'),
    async execute(interaction) {
        const adminRoleId = '1304564863082692719';

        if (!interaction.member.roles.cache.has(adminRoleId)) {
            return await interaction.reply({
                content: 'You do not have permission to use this command.',
                ephemeral: true
            });
        }

        const targetChannelId = '1304561080839835679';
        const banner = "https://cdn.discordapp.com/attachments/1304716049794469959/1304716085706100756/Information.png?ex=6730670b&is=672f158b&hm=d7a9f20f48a0d152b76ad17bbb6fcc491373de59f1f789106a30463b42ae5254&";
        const targetChannel = interaction.client.channels.cache.get(targetChannelId);

        await interaction.deferReply({ ephemeral: true }).catch(console.error);

        if (!targetChannel) {
            return await interaction.editReply({ content: 'Channel not found!', ephemeral: true }).catch(console.error);
        }

        await interaction.editReply({ content: 'Please wait while I set this up...', ephemeral: true }).catch(console.error);

        setTimeout(async () => {
            const rulesEmbed = new EmbedBuilder()
                .setTitle('Greenville Roleplay Unity')
                .setDescription('> Welcome to Greenville Roleplay Unity! We are a fun and organized roleplay server based on the game *Greenville* on the Roblox platform.')
                .setColor('#8accff');

            const rulesEmbed2 = new EmbedBuilder()
                .setDescription(`> This channel will guide you through all the necessary server information, ensuring a smooth and easy experience for everyone. Please make sure to follow all the rules provided in the dropdown below.
                     
                    **Links**                                     
                    [Greenville](https://www.roblox.com/games/891852901/Greenville)
                    [Section Designs](https://discord.gg/AtGUXz6QN4)`)
                .setColor('#8accff');

            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId('workdummy')
                .setPlaceholder('Select Information Type')
                .addOptions([
                    {
                        label: 'Server Rules',
                        description: 'View the server rules',
                        emoji: '<:public:1304715505164226641>',
                        value: 'serverInfo',
                    },
                    {
                        label: 'Roleplay Information',
                        description: 'View the roleplay rules and guidelines',
                        emoji: '<:Servers_Folder:1304715502886715463>',
                        value: 'roleplayInfo',
                    },
                ]);

            const row = new ActionRowBuilder().addComponents(selectMenu);

            try {
                await targetChannel.send({ files: [banner], embeds: [rulesEmbed, rulesEmbed2], components: [row] });
                await interaction.followUp({ content: 'Embed and dropdown have been sent.', ephemeral: true });
            } catch (error) {
                console.error('Error sending embeds:', error);
                await interaction.followUp({ content: 'Failed to send server rules to the channel.', ephemeral: true }).catch(console.error);
            }
        }, 10);
    },
};
