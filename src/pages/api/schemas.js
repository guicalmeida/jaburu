import { database } from 'knexfile'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { schemaName, apiID, pluralApiId } = await req.body
    const createTable = async (knex) =>
      await knex.schema
        .createTable(schemaName, function (table) {
          table.increments()
          table.timestamps(false, true)
        })
        .finally(() => {
          res.status(200).json('table successfully created')
        })
        .catch((err) => {
          console.log(err)
          res.end(JSON.stringify('error'))
        })
    createTable(database)
  } else if (req.method === 'GET') {
    const getAllTables = async (knex) =>
      await knex
        .select('table_name')
        .from('information_schema.tables')
        .where({ table_schema: 'public' })

    getAllTables(database).then((tableArr) => {
      const namesArr = tableArr.map((names) => names['table_name'])
      res.status(200).json(namesArr)
    })
  }
}
