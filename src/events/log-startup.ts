import { Events } from "discord.js";

import { BotClient } from "../bot-client";


export default {
    name: Events.ClientReady,
    once: true,
    execute(client: BotClient) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
    }
};
