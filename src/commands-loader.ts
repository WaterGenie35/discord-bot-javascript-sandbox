import fs from 'node:fs';
import path from 'node:path';

import { Collection } from 'discord.js';

import { Command } from './command';


// Refer to discord.js guide here:
// https://discordjs.guide/creating-your-bot/command-handling.html#loading-command-files

async function loadCommands(): Promise<Collection<string, Command>> {
    const commandsCollection: Collection<string, Command> = new Collection();
    
    const __dirname = import.meta.dirname;
    const foldersPath = path.join(__dirname, 'commands');
    const commandFolders = fs.readdirSync(foldersPath);
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = (await import(filePath)).default;
                if ('data' in command && 'execute' in command) {
                    commandsCollection.set(command.data.name, command);
                } else {
                    console.warn(`The command at ${filePath} is missing 'data' or 'execute' property.`);
                }
        }
    }

    return commandsCollection
}

export default loadCommands;
