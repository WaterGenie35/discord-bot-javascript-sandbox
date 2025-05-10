import { Client, ClientOptions, Collection } from 'discord.js';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';

import { Command } from './command';
import loadCommands from './commands-loader';
import loadEvents from './events-loader';
import config from './config';


type CommandName = string;
type UserId = string;
type Timestamp = number;

export class BotClient extends Client<true> {
    public commands: Collection<CommandName, Command>;
    public commandCooldowns: Collection<CommandName, Collection<UserId, Timestamp>>;
    public defaultCommandCooldown: number = +config.DISCORD_DEFAULT_COMMAND_COOLDOWN;
    public db: LibSQLDatabase;

    constructor(options: ClientOptions) {
        if (options === undefined) {
            super({intents: 0});
        } else {
            super(options);
        }
        this.commands = new Collection();
        this.commandCooldowns = new Collection();
        this.db = drizzle({
            connection: {
                url: config.DRIZZLE_DB_FILE_NAME
            }
        });
    }

    async init() {
        this.commands = await loadCommands();
        await loadEvents(this);
    }
}
