import fs from 'node:fs';
import path from 'node:path';

import { BotClient } from './bot-client';


// https://discordjs.guide/creating-your-bot/event-handling.html#reading-event-files

async function loadEvents(client: BotClient) {
    const __dirname = import.meta.dirname;
    const eventsPath = path.join(__dirname, 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = (await import(filePath)).default;
        if ('name' in event && 'execute' in event) {
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        } else {
            console.warn(`The event at ${filePath} is missing 'name' or 'execute' property.`);
        }
    }
};

export default loadEvents;
