import path from 'node:path';
import { glob } from 'glob';

import { Collection } from 'discord.js';

import { Command } from './command';


// Refer to discord.js guide here:
// https://discordjs.guide/creating-your-bot/command-handling.html#loading-command-files

async function loadCommands(): Promise<Collection<string, Command>> {
    const commandsCollection: Collection<string, Command> = new Collection();

    const __dirname = import.meta.dirname;
    const commandsDir = path.join(__dirname, 'commands');
    const commandFiles = await glob('**/*.js', { cwd: commandsDir });
    for (const commandFile of commandFiles) {
        const commandPath = path.join(commandsDir, commandFile);
        const command = (await import(commandPath)).default;
        if ('data' in command && 'execute' in command) {
            commandsCollection.set(command.data.name, command);
        } else {
            console.warn(`The command at ${commandPath} is missing 'data' or 'execute' property.`);
        }
    }

    return commandsCollection
}

export default loadCommands;
