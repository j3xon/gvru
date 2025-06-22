const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const rp = "https://cdn.discordapp.com/attachments/1304716049794469959/1304724057597673503/Information_2.png?ex=67306e77&is=672f1cf7&hm=1e7148ba2060636f169ca5b69a8a3a31203cb6eba08fb4dc30a7b4fe22d177c4&";
        const main = "https://cdn.discordapp.com/attachments/1304716049794469959/1304723543870935110/Information_1.png?ex=67306dfd&is=672f1c7d&hm=de3392aacfe331adea6130a8c962f1f013def2f94626e6e9e4980dbd7b1969ca&";

        if (interaction.isStringSelectMenu() && interaction.customId === 'workdummy') {
            // Handle the selection for the 'serverInfo' option
            if (interaction.values[0] === 'serverInfo') {
                const embedPingRole = new EmbedBuilder()
                    .setTitle('Greenville Roleplay Unity')
                    .setDescription(`
**[1] Age Requirement:**  
All members must be at least 13 years old to participate. Any member found to be under this age will be banned and may appeal their ban upon reaching the age requirement. This is to ensure compliance with Discord’s Terms of Service.

**[2] NSFW Content:**  
Posting NSFW content is strictly prohibited in any channel. A warning will be issued for initial offenses; repeated violations may result in an immediate ban.

**[3] Instigating Drama:**  
Creating or participating in drama is not tolerated. Members found instigating conflicts will receive a warning and may face further consequences for continued behavior.

**[4] Offensive Comments/Slurs:**  
We have a zero-tolerance policy for any form of hate speech, including racial, gendered, or ethnic slurs. Violators will be banned immediately.

**[5] Member Respect:**  
Every member is expected to treat others with respect and kindness. Conflicts should be resolved privately. Harassment or bullying will result in disciplinary action.

**[6] Staff Orders:**  
Members must comply with the directives given by Server Staff. Failure to follow instructions may result in disciplinary measures.

**[7] Advertising:**  
Advertising other servers or services is not allowed. This includes promotion through direct messages or public channels.

**[8] Assets:**  
Stealing assets from GVRU would result in a permanent ban and a DMCA takedown of the requested.

**[9] Terms of Service:**  
All members are required to adhere to the ROBLOX and Discord Terms of Service. Violations may result in disciplinary action.`)
                    .setColor('#8accff');

                await interaction.reply({
                    embeds: [embedPingRole],
                    ephemeral: true
                });
            }

            // Handle the selection for the 'roleplayInfo' option
            if (interaction.values[0] === 'roleplayInfo') {
                const embedServerInfo = new EmbedBuilder()
                    .setTitle('Roleplay Information')
                    .setDescription(`
**[1] Lag**  
> When you are driving and you experience a significant amount of lag, pull over to the side and wait for it to stop.

**[2] Banned Vehicles**  
> Ensure you have the correct role for your vehicle. If caught driving a banned vehicle without the proper roles, it will escalate to a session removal.

**[3] Peace Status and Rules**  
> During peace time, you are not allowed to drift, run from law enforcement (LEO), rob stores, or drive recklessly. If you are caught breaking any of these rules, you will be removed from the roleplay session. The fail roleplay speed during this peacetime is 75 mph.  
> During strict peace time, you are not allowed to drift, run from law enforcement, etc., and the fail roleplay speed is 65 mph. If caught breaking any of these rules, it will result in a server infraction and session removal.  
> During peace time off, you are allowed to drift, run from law enforcement, rob stores, hard brake, etc. The fail roleplay speed during this time will be 100 mph. Being caught going over this speed will result in session removal.

**[4] Traffic Stops**  
> When a law enforcement member pulls you over, you must pull over to the nearest parking lot or to the right side of the road (emergency lane). All information must be provided to law enforcement when asked. Failing to do so will result in an arrest and license suspension.

**[5] Staff Stops**  
> When a staff member pulls you over, you are not allowed to drive away. If caught doing so, they can remove you from the session, and an infraction will be issued.

**[6] General Tips**  
> Ensure you are recording your gameplay by using Medals, SteelSeries, etc. This will be useful if you encounter trouble for no reason.  
> Respect all members within the roleplay session; otherwise, you may be marked for it.  
> Ensure you are following Roblox TOS while roleplaying, or this can lead to your account being reported.  
> No starting drama within the session; doing so will result in removal and an infraction.`)
                    .setColor('#8accff');

                await interaction.reply({
                    embeds: [embedServerInfo],
                    ephemeral: true
                });
            }
        }
    },
};
