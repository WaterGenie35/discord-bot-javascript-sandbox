import { Events, GatewayIntentBits, MessageFlags } from 'discord.js';

import config from './config';
import { BotClient } from './bot-client';


const client = new BotClient({
    intents: [GatewayIntentBits.Guilds]
});

// See:
// https://discordjs.guide/creating-your-bot/command-handling.html#executing-commands
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) {
        return;
    }
    const client = interaction.client as BotClient;
    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        const error_message = "An error has occurred while running this command! Please try again later."
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: error_message,
                flags: MessageFlags.Ephemeral
            });
        } else {
            await interaction.reply({
                content: error_message,
                flags: MessageFlags.Ephemeral
            })
        }
    }
});


client.once(Events.ClientReady, readyClient => {
    const user = readyClient.user;
    console.log(`Logged in as ${user.displayName} (${user.tag})`);
});

client.login(config.DISCORD_BOT_TOKEN);
