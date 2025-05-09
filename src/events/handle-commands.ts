import { CacheType, Collection, Events, Interaction, MessageFlags } from "discord.js";

import { BotClient } from "../bot-client";


// See:
// https://discordjs.guide/creating-your-bot/command-handling.html#executing-commands
// https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files
// https://discordjs.guide/additional-features/cooldowns.html#resulting-code
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

        const cooldowns = client.commandCooldowns;
        const commandName = command.data.name;
        if (!cooldowns.has(commandName)) {
            cooldowns.set(commandName, new Collection());
        }
        const userId = interaction.user.id;
        const userToTimestamps = cooldowns.get(commandName)!;
        const now = Date.now();
        const cooldown = (command.cooldown ?? client.defaultCommandCooldown) * 1_000;
        if (userToTimestamps.has(userId)) {
            const expirationTime = userToTimestamps.get(userId)! + cooldown;
            if (now < expirationTime) {
                const remainingWait = Math.ceil((expirationTime - now) / 1_000);
                await interaction.reply({
                    content: `Please wait ${remainingWait} seconds before using the ${commandName} command again.`,
                    flags: MessageFlags.Ephemeral
                });
                return;
            }
        }
        userToTimestamps.set(userId, now);
        setTimeout(() => userToTimestamps.delete(userId), cooldown);

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
