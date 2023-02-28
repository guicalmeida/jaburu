import { database } from 'knexfile'
import { insertIntoTable } from '../(common)'

async function createDefaultTable(knex, tableName) {
  return await knex.schema.createTable(tableName, (table) => {
    table.increments()
    table.timestamps(false, true)
  })
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { display_name, api_id, plural_api_id, description } = await req.body

    if (api_id.includes(' ') || plural_api_id.includes(' ')) {
      return res.status(400).json({ error: 'spaces are not allowed in API' })
    }

    const createTable = createDefaultTable(database, api_id)
    const registerTable = insertIntoTable(database, 'tables_metadata', {
      api_id,
      plural_api_id,
      description,
      display_name,
    })

    return await Promise.all([createTable, registerTable])
      .then(() => {
        return res.status(201).json({ message: 'table successfully created' })
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).json({ error: 'error' })
      })
  } else if (req.method === 'GET') {
    const getAllTables = async (knex) =>
      await knex.select('*').from('tables_metadata')

    return await getAllTables(database)
      .then((tableArr) => {
        return res.status(200).json(tableArr)
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).json({ error: 'error' })
      })
  }
}
