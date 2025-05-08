import { ApplicationCommand, REST, Routes } from 'discord.js';

import config from '../config';
import commandCollection from '../commands-loader';


const rest = new REST().setToken(config.DISCORD_BOT_TOKEN);

(async () => {
    try {
        console.log(`Refreshing ${commandCollection.size} application (/) commands.`);
        const commands = [...commandCollection.values().map(command => command.data)];
        const data = await rest.put(
            Routes.applicationCommands(config.DISCORD_APPLICATION_ID),
            { body: commands }
        ) as ApplicationCommand[];
        console.log(`Reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
