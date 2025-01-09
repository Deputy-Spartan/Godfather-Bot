const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies with a friendly greeting!'),
    async execute(interaction) {
        await interaction.reply('Sup Turd!');
    },
};
