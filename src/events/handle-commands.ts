import { CacheType, Events, Interaction, MessageFlags } from "discord.js";

import { BotClient } from "../bot-client";


// See:
// https://discordjs.guide/creating-your-bot/command-handling.html#executing-commands
// https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files
export default {
    name: Events.InteractionCreate,
    async execute(interaction: Interaction<CacheType>) {
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
    }
};
