const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ComponentType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('release')
        .setDescription('Releases the session for everyone to join.')
        .addStringOption(option =>
            option.setName('session-link')
                .setDescription('Link for the session so that civilians may join.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('peacetime-status')
                .setDescription('Current peacetime status.')
                .addChoices(
                    { name: 'Strict Peacetime', value: 'Strict' },
                    { name: 'Normal Peacetime', value: 'Normal' },
                    { name: 'Disabled Peacetime', value: 'Off' }
                )
                .setRequired(true))
        .addStringOption(option =>
            option.setName('frp-speed')
                .setDescription('FRP speeds.')
                .addChoices(
                    { name: '75', value: '75' },
                    { name: '80', value: '80' },
                    { name: '85 (should not be used frequently)', value: '85' }
                )
                .setRequired(true))
        .addStringOption(option =>
            option.setName('leo-status')
                .setDescription('Set the leo status')
                .addChoices(
                    { name: 'Active', value: 'Active' },
                    { name: 'Inactive', value: 'Inactive' }
                )
                .setRequired(true)),

    async execute(interaction) {
        const requiredRoleId = '1343059207900889140'; // Required role ID for verification

        // Check if user has the required role
        if (!interaction.member.roles.cache.has(requiredRoleId)) {
            return interaction.reply({ content: 'You do not have the required role to use this command.', ephemeral: true });
        }

        try {
            const sessionLink = interaction.options.getString('session-link');
            const peacetimeStatus = interaction.options.getString('peacetime-status');
            const frpSpeed = interaction.options.getString('frp-speed');
            const leoStatus = interaction.options.getString('leo-status');

            const embed = new EmbedBuilder()
                .setTitle('Release')
                .setDescription(`> <@${interaction.user.id}> has released their session. Ensure you have read our information and registred your vehicle before joining. Before you join read the information provided below.
                    
                    > **Peacetime Status:** ${peacetimeStatus}
                    > **FRP Speed:** ${frpSpeed}
                    > **LEO Status:** ${leoStatus}`)
                .setImage("https://cdn.discordapp.com/attachments/1304716049794469959/1305214666989109380/session_2.png?ex=67323762&is=6730e5e2&hm=559f52be18c1de4a476c834f197eb63c15fdae2b847dc3b85391757462f069fb&")
                .setColor('#8accff');

            const button = new ButtonBuilder()
                .setLabel('Session Link')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('ls');

            const row = new ActionRowBuilder().addComponents(button);

            const newEmbed = new EmbedBuilder()
                .setTitle("Session Release")
                .setDescription(`<@${interaction.user.id}> has released their session in <#${interaction.channel.id}>
                    
                    **Peacetime Status:** ${peacetimeStatus}
                    **FRP Speed:** ${frpSpeed}
                    **Session Link:** ${sessionLink}
                    **LEO Status:** ${leoStatus}`)
                .setColor('#8accff');

            const logChannel = await interaction.client.channels.fetch('1304564515844919296');
            await logChannel.send({ embeds: [newEmbed] });

            await interaction.channel.send({ content: '@here', embeds: [embed], components: [row] });
            await interaction.reply({ content: 'You have successfully released the session.', ephemeral: true });

            const filter = i => i.customId === 'ls';
            const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 9999999 });

            collector.on('collect', async i => {
                try {
                    await i.deferUpdate();
                    await i.followUp({ content: `**Link:** ${sessionLink}`, ephemeral: true });

                    const logEmbed = new EmbedBuilder()
                        .setTitle('Session Link Button')
                        .setDescription(`Button clicked by <@${i.user.id}>. Session link in <#${interaction.channel.id}>`)
                        .setColor('#8accff');

                    await logChannel.send({ embeds: [logEmbed] });
                } catch (error) {
                    console.error('Error responding to interaction:', error);
                }
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} interactions.`);
            });
        } catch (error) {
            console.error('Error executing command:', error);
            await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
        }
    },
};
