import { CommandInteraction, SlashCommandBuilder } from 'discord.js';


const command = new SlashCommandBuilder();
command.setName('ping');
command.setDescription("Tests if the bot is responsive.");

export default {
    data: command,
    async execute(interaction: CommandInteraction) {
        await interaction.reply("Pong :)");
    }
};
