const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isStringSelectMenu()) return;

        const { customId, values } = interaction;
        const mpbanner = "https://cdn.discordapp.com/attachments/1304716049794469959/1304797779297570939/Information_6.png?ex=6730b320&is=672f61a0&hm=86f13309782cededc9cfe6c86a8ff02a5c0311ea148bc7639f50a8542c64668e&"
        const npbanner = "https://cdn.discordapp.com/attachments/1304716049794469959/1304797483888672838/Information_5.png?ex=6730b2da&is=672f615a&hm=afa6877e1c9d07a7c4f7c5daf7d9d4e1b9840e71101edff5500b1ea58a198d13&"
        const rpbanner = "https://cdn.discordapp.com/attachments/1304716049794469959/1304797215742623784/Information_4.png?ex=6730b29a&is=672f611a&hm=df59b4ee665154b244e444f943066629d92d446063bd8d12a30dcf21e5dcb91f&"

        if (customId === 'perks') {
            const selectedValue = values[0];
            let embeds = [];

            if (selectedValue === 'rp') {

                const rpEmbed = new EmbedBuilder()
                    .setDescription(`
                        To purchase the perks listed below, kindly reach out to <@1114487029925937232> via direct message. Our team is ready to assist you with any inquiries and facilitate your purchase. Thank you for your interest!
                        
                        **Early Access**: 200 Robux
                        **BVE**: 300 Robux
                        **UBVE**: 400 Robux
                        **Images Permission**: 100 Robux
                        **Custom Role**: 200 Robux`)
                        .setImage(rpbanner)
                        .setColor('#8accff');

                embeds.push(rpEmbed);
            } else if (selectedValue === 'np') {

                const npEmbed = new EmbedBuilder()
                    .setDescription(`
                        To purchase the perks listed below, kindly reach out to <@1114487029925937232> via direct message. Our team is ready to assist you with any inquiries and facilitate your purchase. Thank you for your interest!
                        
                        **Boost 1-3 times**
                        Early Access
                        BVE
                        Images Permission
                        10k eco per week
                        
                        **Boost 4+ times**
                        UBVE
                        Custom Role
                        30k eco per week.`)
                        .setImage(npbanner)
                        .setColor('#8accff');

                embeds.push(npEmbed);
            } else if (selectedValue === 'mp') {
                const mpDetailsEmbed = new EmbedBuilder()
                    .setDescription(`
                        To purchase the perks listed below, kindly reach out to <@1114487029925937232> via direct message. Our team is ready to assist you with any inquiries and facilitate your purchase. Thank you for your interest!
                        
                        **Early Access**: $5 per month
                        **BVE**: $10 per month
                        **UBVE**: $15 per month
                        **Images Permission**: $5 per month
                        **Custom Role**: $10 per month`)
                        .setImage(mpbanner)
                        .setColor('#8accff');

                embeds.push(mpDetailsEmbed);
            }

            await interaction.reply({ embeds, ephemeral: true });
        }
    }
};
