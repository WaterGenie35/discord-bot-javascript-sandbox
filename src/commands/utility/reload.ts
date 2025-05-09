import path from 'node:path';
import { glob } from 'glob';
import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

import { BotClient } from '../../bot-client';


// https://discordjs.guide/additional-features/reloading-commands.html

// Just use pm2

const command = new SlashCommandBuilder();
command.setName('reload');
command.setDescription("Reloads a command.");
command.addStringOption(option => {
    option.setName('command');
    option.setDescription('The command to reload.');
    option.setRequired(true);
    return option;
});

const __dirname = import.meta.dirname;
const commandsDir = path.resolve(__dirname, '..')

export default {
    data: command,
    async execute(interaction: CommandInteraction) {
        const client = interaction.client as BotClient;
        const commandName = (interaction.options.get('command', true).value as string).toLowerCase();
        const command = client.commands.get(commandName);
        if (!command) {
            return interaction.reply(`No command matching ${commandName} was found.`);
        }

        try {
            const commandFile = (await glob(`**/${command.data.name}.js`, { cwd: commandsDir }))[0];
            const commandPath = path.join(commandsDir, commandFile);
            const newCommand = (await import(commandPath)).default;
            client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply(`Reloaded ${newCommand.data.name} command.`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`Failed to reload ${commandName} command, please contact a server admin.`);
        }
    }
};
