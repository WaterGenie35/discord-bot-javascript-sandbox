import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

import { BotClient } from '../../bot-client';
import { addInstagramAccount } from '../../database/instagram';


const command = new SlashCommandBuilder();
command.setName('add_instagram');
command.setDescription("Directs user to Instagram log-in to link the Instagram account.");

export default {
    data: command,
    async execute(interaction: CommandInteraction) {
        const client = interaction.client as BotClient;
        addInstagramAccount(client, "some discord user", "some instagram account");

        await interaction.reply("test");
    }
};
