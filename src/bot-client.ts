import { Client, ClientOptions, Collection } from 'discord.js';

import { Command } from './command';
import loadCommands from './commands-loader';
import loadEvents from './events-loader';


export class BotClient extends Client<true> {
    public commands: Collection<string, Command>;

    constructor(options: ClientOptions) {
        if (options === undefined) {
            super({intents: 0});
        } else {
            super(options);
        }
        this.commands = new Collection();
    }

    async init() {
        this.commands = await loadCommands();
        await loadEvents(this);
    }
}
