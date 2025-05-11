import { Client, ClientOptions, Collection } from 'discord.js';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';
import express, { Express } from 'express';

import { Command } from './command';
import loadCommands from './commands-loader';
import loadEvents from './events-loader';
import config from './config';
import helloRouter from './routes/hello';


type CommandName = string;
type UserId = string;
type Timestamp = number;

export class BotClient extends Client<true> {
    public commands: Collection<CommandName, Command>;
    public commandCooldowns: Collection<CommandName, Collection<UserId, Timestamp>>;
    public defaultCommandCooldown: number = +config.DISCORD_DEFAULT_COMMAND_COOLDOWN;
    public db: LibSQLDatabase;
    public expressServer: Express;

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

        this.expressServer = express();
    }

    async init() {
        this.commands = await loadCommands();
        await loadEvents(this);
        this.expressServer.listen(config.EXPRESS_PORT, () => {
            console.log(`Express server listening on port ${config.EXPRESS_PORT}`);
        });
        this.expressServer.use(helloRouter);

    }
}
