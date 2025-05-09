import { Client, ClientOptions, Collection } from 'discord.js';

import { Command } from './command';
import loadCommands from './commands-loader';
import loadEvents from './events-loader';


type CommandName = string;
type UserId = string;
type Timestamp = number;

export class BotClient extends Client<true> {
    public commands: Collection<CommandName, Command>;
    public commandCooldowns: Collection<CommandName, Collection<UserId, Timestamp>>;
    public defaultCommandCooldown: number = 1;

    constructor(options: ClientOptions) {
        if (options === undefined) {
            super({intents: 0});
        } else {
            super(options);
        }
        this.commands = new Collection();
        this.commandCooldowns = new Collection();
    }

    async init() {
        this.commands = await loadCommands();
        await loadEvents(this);
    }
}
