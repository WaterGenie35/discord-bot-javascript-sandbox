import { defineConfig } from 'drizzle-kit';


import config from './src/config';

export default defineConfig({
    dialect: 'sqlite',
    schema: './src/database/schema',
    out: './drizzle',
    dbCredentials: {
        url: config.DRIZZLE_DB_FILE_NAME
    }
});
