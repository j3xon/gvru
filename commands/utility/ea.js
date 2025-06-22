const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('earlyaccess')
    .setDescription('Grant early access to a user with a link')
    .addStringOption(option =>
      option.setName('link')
        .setDescription('The link for early access')
        .setRequired(true)),
  
  async execute(interaction) {
    try {
      const staffRoleId = '1343059207900889140';
      const earlyAccessRoleIds = [
        '1360209261069602970',
        '1343056628768833566',
        '1360209202957779194',
        '1360209346939850773'
      ];

      if (!interaction.member.roles.cache.has(staffRoleId)) {
        return await interaction.reply({ content: 'You do not have permission to execute this command.', ephemeral: true });
      }

      await interaction.reply({ content: 'Early access released!', ephemeral: true });

      const link = interaction.options.getString('link');

      const embed = new EmbedBuilder()
        .setTitle('Early Access')
        .setDescription(`> Session host has granted Early Access, EMS and PS members to join the session by clicking the button below.
          
          > Please wait at least 5 minutes for the host to release the session.`)
        .setColor('#8accff')
        .setImage("https://cdn.discordapp.com/attachments/1304716049794469959/1305213170767368192/session_1.png?ex=673235fd&is=6730e47d&hm=5c62fd69f788ae74189a51f099610409f9871c4b048e7e3dab2c79ffbd3226fa&");

      const button = new ButtonBuilder()
        .setLabel('Early Access Link')
        .setStyle(ButtonStyle.Primary)
        .setCustomId('early_access_link');

      const row = new ActionRowBuilder().addComponents(button);

      const message = await interaction.channel.send({
        embeds: [embed],
        components: [row]
      });

      const logChannelId = '1304564515844919296';
      const logChannel = interaction.guild.channels.cache.get(logChannelId);
      if (logChannel) {
        const logEmbed = new EmbedBuilder()
          .setTitle('Command Executed')
          .setDescription(`Command was executed. Information provided below.`)
          .addFields(
            { name: 'User', value: `${interaction.user}`, inline: true },
            { name: 'Channel', value: `<#${interaction.channel.id}>`, inline: true },
            { name: 'Link Provided', value: `${link}`, inline: false }
          )
          .setColor('#8accff');

        await logChannel.send({ embeds: [logEmbed] });
      }

      const filter = i => i.customId === 'early_access_link' && i.isButton();

      const collector = message.createMessageComponentCollector({ filter });

      collector.on('collect', async i => {
        const hasPermission = earlyAccessRoleIds.some(roleId => i.member.roles.cache.has(roleId));

        if (!hasPermission) {
          await i.reply({ content: 'You do not have permission to access this link!', ephemeral: true });
        } else {
          await i.reply({ content: `**Link:** ${link}`, ephemeral: true });
        }
      });

    } catch (error) {
      console.error('Error executing command:', error);
      if (!interaction.replied) {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  }
};
