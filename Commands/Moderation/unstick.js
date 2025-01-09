const { SlashCommandBuilder } = require('discord.js');

let stickyMessages = {};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unstick')
        .setDescription('Removes the sticky message from the current channel.'),
    async execute(interaction) {
        const channelId = interaction.channel.id;

        // Check if there's a sticky message to remove
        if (stickyMessages[channelId]) {
            delete stickyMessages[channelId];
            await interaction.reply('Sticky message removed.');
        } else {
            await interaction.reply('There is no sticky message in this channel.');
        }
    }
};
