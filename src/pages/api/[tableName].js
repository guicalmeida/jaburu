import { database } from 'knexfile'

export default async function handler(req, res) {
  const { tableName } = req.query

  if (req.method === 'POST') {
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

    createColumn(database)
      .finally((value) => {
        console.log(value)
        res.status(200).json('value created')
      })
      .catch((err) => {
        console.log(err)
        res.end(JSON.stringify('error'))
      })
  } else if (req.method === 'GET') {
    const getAllColumns = async (knex) =>
      await knex
        .select('*')
        .from('information_schema.columns')
        .where({ table_name: tableName, table_schema: 'public' })

    getAllColumns(database)
      .then((columnsArr) => {
        const columnsInfo = columnsArr.map((columnData) => {
          const { column_name, is_nullable, udt_name } = columnData
          return {
            columnName: column_name,
            required: !(is_nullable === 'YES'),
            type: udt_name,
          }
        })
        res.status(200).json(columnsInfo)
      })
      .catch((err) => {
        console.log(err)
        res.end(JSON.stringify('error'))
      })
  }
}
