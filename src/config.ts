import dotenv from 'dotenv';


dotenv.config();

const requiredVariables = [
    'DISCORD_BOT_TOKEN',
    'DISCORD_APPLICATION_ID',
    'DISCORD_DEFAULT_COMMAND_COOLDOWN',
    'DRIZZLE_DB_FILE_NAME'
];

const missingVariables = requiredVariables.filter(variable => process.env[variable] === undefined);

if (missingVariables.length > 0) {
    throw new Error(`Could not load the following environment variables: ${missingVariables.join(", ")}. Please make sure they are defined in the .env file.`);
}

const config = requiredVariables.reduce((accum, variable) => {
    accum[variable] = process.env[variable]!;
    return accum;
}, {} as {[key: string]: string});

export default config;
