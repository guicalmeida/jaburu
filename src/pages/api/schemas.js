import { database } from 'knexfile'
import { insertIntoTable } from './(common)'

async function createDefaultTable(knex, tableName) {
  return await knex.schema.createTable(tableName, (table) => {
    table.increments()
    table.timestamps(false, true)
  })
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { slug, display_name } = await req.body

    if (slug.includes(' ')) {
      return res.status(400).json({ error: 'spaces are not allowed in slug' })
    }

    const createTable = createDefaultTable(database, slug)
    const registerTable = insertIntoTable(database, 'tables_metadata', {
      slug,
      display_name,
    })

    return await Promise.all([createTable, registerTable])
      .then(() => {
        return res.status(201).json('table successfully created')
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).json('error')
      })
  } else if (req.method === 'GET') {
    const getAllTables = async (knex) =>
      await knex
        .select('table_name')
        .from('information_schema.tables')
        .where({ table_schema: 'public' })

    return await getAllTables(database)
      .then((tableArr) => {
        const namesArr = tableArr.map((names) => names['table_name'])
        return res.status(200).json(namesArr)
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).json('error')
      })
  }
}
