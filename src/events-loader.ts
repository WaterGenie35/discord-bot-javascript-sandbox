import path from 'node:path';
import { glob } from 'glob';

import { BotClient } from './bot-client';


// https://discordjs.guide/creating-your-bot/event-handling.html#reading-event-files

async function loadEvents(client: BotClient) {
    const __dirname = import.meta.dirname;
    const eventsDir = path.join(__dirname, 'events');
    const eventFiles = await glob('**/*.js', { cwd: eventsDir });
    for (const eventFile of eventFiles) {
        const eventPath = path.join(eventsDir, eventFile);
        const event = (await import(eventPath)).default;
        if ('name' in event && 'execute' in event) {
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        } else {
            console.warn(`The event at ${eventPath} is missing 'name' or 'execute' property.`);
        }
    }
};

export default loadEvents;
