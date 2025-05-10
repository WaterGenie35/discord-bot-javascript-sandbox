import { BotClient } from "../bot-client";
import { instagramAccountsTable } from "./schema/instagram-accounts";


export async function addInstagramAccount(client: BotClient, discordUserId: string, instagramUsername: string) {
    const instagramAccount: typeof instagramAccountsTable.$inferInsert = {
        discord_user_id: discordUserId,
        instagram_username: instagramUsername
    };
    await client.db.insert(instagramAccountsTable).values(instagramAccount);
    console.log(`Added new instagram account ${instagramAccount} for user ${discordUserId}`);
}
