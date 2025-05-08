import { Client, ClientOptions, Collection } from 'discord.js';

import commandsCollection from './commands-loader';
import { Command } from './command';


export class BotClient extends Client {
    public commands: Collection<string, Command>;

    constructor(options: ClientOptions) {
        if (options === undefined) {
            super({intents: 0});
        } else {
            super(options);
        }
        this.commands = commandsCollection
    }
}
