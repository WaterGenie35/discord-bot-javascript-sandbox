import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";


export const instagramAccountsTable = sqliteTable('instagram_accounts', {
    id: integer().primaryKey({ autoIncrement: true }),
    discord_user_id: text().notNull(),
    instagram_username: text().notNull(),
    added_at: text().default(sql`(CURRENT_TIMESTAMP)`)
});
