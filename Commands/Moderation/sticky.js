const { SlashCommandBuilder } = require('discord.js');

let stickyMessages = {};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sticky')
        .setDescription('Sets a sticky message in the current channel.')
        .addStringOption(option => 
            option.setName('message')
                .setDescription('The message to be sticky')
                .setRequired(true)),
    async execute(interaction) {
        const channelId = interaction.channel.id;
        const stickyMessage = interaction.options.getString('message');

        // Save the sticky message for the channel
        stickyMessages[channelId] = stickyMessage;

        await interaction.reply(`Sticky message set: "${stickyMessage}"`);

        // Keep the sticky message at the bottom
        const channel = interaction.channel;
        const filter = m => m.author.id !== interaction.client.user.id;
        
        const collector = channel.createMessageCollector({ filter });

        collector.on('collect', async () => {
            if (stickyMessages[channelId]) {
                // Repost the sticky message
                await channel.send(stickyMessages[channelId]);
            }
        });
    }
};
