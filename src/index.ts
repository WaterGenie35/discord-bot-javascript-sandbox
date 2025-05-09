import { GatewayIntentBits } from 'discord.js';

import config from './config';
import { BotClient } from './bot-client';


const client = new BotClient({
    intents: [GatewayIntentBits.Guilds]
});
await client.init();

client.login(config.DISCORD_BOT_TOKEN);
