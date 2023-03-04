import { database } from 'knexfile'

export default async function handler(req, res) {
  const { tableName } = req.query
  if (req.method === 'GET') {
    const getTableMetadata = async (knex) =>
      await knex.select('*').from('tables_metadata').where({ tableName })

    return await getTableMetadata(database)
      .then((metadata) => res.status(200).json(metadata[0]))
      .catch((err) => {
        console.log(err)
        return res.status(400).json({ error: 'error' })
      })
  } else if (req.method === 'POST') {
    const { fieldName, fieldType, required } = await req.body
    const createColumn = async (knex) => {
      switch (fieldType) {
        case 'string':
          return await knex.schema.alterTable(tableName, (table) => {
            if (required) {
              table.string(fieldName).notNullable()
            } else {
              table.string(fieldName).nullable()
            }
          })
        case 'integer':
          return await knex.schema.alterTable(tableName, (table) => {
            if (required) {
              table.integer(fieldName).notNullable()
            } else {
              table.integer(fieldName).nullable()
            }
          })
        case 'markdown':
          return await knex.schema.alterTable(tableName, (table) => {
            if (required) {
              table.text(fieldName).notNullable()
            } else {
              table.text(fieldName).nullable()
            }
          })
      }
    }

    return createColumn(database)
      .then((value) => {
        console.log(value)
        return res.status(201).json({ message: 'value created' })
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).json({ error: 'error' })
      })
  }
}
