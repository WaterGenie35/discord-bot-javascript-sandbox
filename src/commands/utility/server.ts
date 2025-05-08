import { SlashCommandBuilder } from 'discord.js';
import { CommandInteraction } from 'discord.js';


const command = new SlashCommandBuilder();
command.setName('server');
command.setDescription("Provides basic information about the server.");

export default {
    data: command,
    async execute(interaction: CommandInteraction) {
        const guild = interaction.guild;
        if (guild === null) {
            await interaction.reply("Could not find a server.");
        } else {
            await interaction.reply(`This is ${guild.name} server with ${guild.memberCount} members.`);
        }
    }
};
