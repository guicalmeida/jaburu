import { database } from 'knexfile'

export default async function handler(req, res) {
  const { tableName } = req.query

  if (req.method === 'GET') {
    const getAllColumns = async (knex) =>
      await knex
        .select('*')
        .from('information_schema.columns')
        .where({ table_name: tableName, table_schema: 'public' })

    return getAllColumns(database)
      .then((columnsArr) => {
        const columnsInfo = columnsArr.map((columnData) => {
          const { column_name, is_nullable, udt_name } = columnData
          return {
            columnName: column_name,
            required: !(is_nullable === 'YES'),
            type: udt_name,
          }
        })
        return res.status(200).json(columnsInfo)
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).json('error')
      })
  }
}
