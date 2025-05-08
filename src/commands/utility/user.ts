import { SlashCommandBuilder } from 'discord.js';
import { CommandInteraction } from 'discord.js';
import { GuildMember } from 'discord.js';


const command = new SlashCommandBuilder();
command.setName('user');
command.setDescription("Provides basic information about the user.");

export default {
    data: command,
    async execute(interaction: CommandInteraction) {
        if (interaction.member instanceof GuildMember) {
            await interaction.reply(`Command ran by user ${interaction.user.username}, joined on ${interaction.member.joinedAt}`);
        } else {
            await interaction.reply(`Command ran by user ${interaction.user.username}`);
        }
    }
};
