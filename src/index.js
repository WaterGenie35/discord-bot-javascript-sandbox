import { Client, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";


dotenv.config();

const botToken = process.env.DISCORD_BOT_TOKEN;

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once(Events.ClientReady, readyClient => {
    const user = readyClient.user;
    console.log(`Logged in as ${user.displayName} (${user.tag})`);
});

client.login(botToken);
