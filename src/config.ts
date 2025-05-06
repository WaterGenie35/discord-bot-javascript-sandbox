import dotenv from 'dotenv';


dotenv.config();

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

if (!DISCORD_BOT_TOKEN) {
    throw new Error(`Could not load discord bot token. Please make sure DISCORD_BOT_TOKEN is defined in the .env file.`);
}

export const config = {
    DISCORD_BOT_TOKEN
};
