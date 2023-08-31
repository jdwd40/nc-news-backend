const { Pool } = require('pg');
const path = require('path');
const ENV = process.env.NODE_ENV || 'development';



require('dotenv').config({
  path: path.resolve(__dirname, `../.env.${ENV}`),
});

console.log('Loaded DATABASE_URL:', process.env.DATABASE_URL);

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE & DATABASE_URL not set');
}

const config =
  ENV === 'production'
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {};

    console.log("Database config being used:", config);


module.exports = new Pool(config);
