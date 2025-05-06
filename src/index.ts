import { Client, Events, GatewayIntentBits } from 'discord.js';

import { config } from './config.ts';


const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once(Events.ClientReady, readyClient => {
    const user = readyClient.user;
    console.log(`Logged in as ${user.displayName} (${user.tag})`);
});

client.login(config.DISCORD_BOT_TOKEN);
