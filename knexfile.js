export const database = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_URL,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  searchPath: ['knex', 'public'],
})
