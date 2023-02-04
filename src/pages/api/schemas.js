const knex = require('knex')
const querystring = require('querystring')
const url = require('url')
import { database } from 'knexfile'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { schemaName, apiID, pluralApiId } = await req.body
    const createTable = async (knex) =>
      await knex.schema
        .createTable(schemaName, function (table) {
          table.increments()
          table.timestamps()
        })
        .then((value) => {
          res.end(JSON.stringify('table successfully created'))
        })
        .catch((err) => {
          console.log(err)
          res.end(JSON.stringify('error'))
        })

    createTable(database)
  } else if (req.method === 'GET') {
    const parsedUrl = url.parse(req.url ?? '')
    const { tableName } = querystring.parse(parsedUrl.query)
    const getAllTables = async (knex) =>
      await knex.select('*').from('information_schema')

    getAllTables(database).then(console.log)
  }
}
