import { database } from 'knexfile'

export default async function handler(req, res) {
  const { tableName } = req.query

  if (req.method === 'GET') {
    const getTableMetadata = async (knex) =>
      await knex
        .select('*')
        .from('tables_metadata')
        .where({ api_id: tableName })

    return await getTableMetadata(database)
      .then((metadata) => res.status(200).json(metadata[0]))
      .catch((err) => {
        console.log(err)
        return res.status(400).json({ error: 'error' })
      })
  } else if (req.method === 'POST') {
    const {
      display_name,
      api_id: columnApiId,
      type,
      editable,
      unique,
      required,
    } = await req.body

    const createColumn = async (knex) => {
      switch (type) {
        case 'text':
          return await knex.schema.alterTable(tableName, (table) => {
            if (required) {
              table.text(columnApiId).notNullable()
            } else {
              table.text(columnApiId).nullable()
            }
            if (unique) {
              table.unique(columnApiId)
            }
          })
        case 'decimal':
          return await knex.schema.alterTable(tableName, (table) => {
            if (required) {
              table.float(columnApiId).notNullable()
            } else {
              table.float(columnApiId).nullable()
            }
            if (unique) {
              table.unique(columnApiId)
            }
          })
        case 'integer':
          return await knex.schema.alterTable(tableName, (table) => {
            if (required) {
              table.integer(columnApiId).notNullable()
            } else {
              table.integer(columnApiId).nullable()
            }
            if (unique) {
              table.unique(columnApiId)
            }
          })
        case 'boolean':
          return await knex.schema.alterTable(tableName, (table) => {
            if (required) {
              table.boolean(columnApiId).notNullable()
            } else {
              table.boolean(columnApiId).nullable()
            }
            if (unique) {
              table.unique(columnApiId)
            }
          })
      }
    }

    const getColumnsMetadata = async (knex) =>
      await knex
        .select('columns_metadata')
        .from('tables_metadata')
        .where({ api_id: tableName })

    const setColumnsMetadata = async (knex) =>
      await getColumnsMetadata(database).then(async (value) => {
        const { columns_metadata } = value[0]
        return await knex('tables_metadata')
          .where({ api_id: tableName })
          .update({
            columns_metadata: {
              ...columns_metadata,
              [columnApiId]: {
                display_name,
                editable,
                unique,
                required,
                type,
              },
            },
          })
      })

    return Promise.all([createColumn(database), setColumnsMetadata(database)])
      .then((value) => {
        return res.status(201).json({ message: 'column created' })
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).json({ error: 'error' })
      })
  }
}
