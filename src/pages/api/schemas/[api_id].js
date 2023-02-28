import { database } from 'knexfile'

export default async function handler(req, res) {
  const { api_id } = req.query
  if (req.method === 'GET') {
    const getTableMetadata = async (knex) =>
      await knex.select('*').from('tables_metadata').where({ api_id })

    const getTableColumns = async (knex) =>
      await knex
        .select('*')
        .from('information_schema.columns')
        .where({ table_name: api_id, table_schema: 'public' })

    return await Promise.all([
      getTableColumns(database),
      getTableMetadata(database),
    ])
      .then((queryResults) => {
        const [columnsData, tableData] = queryResults
        const columns = columnsData.map((columnData) => {
          const { column_name, is_nullable, udt_name } = columnData
          return {
            columnName: column_name,
            required: !(is_nullable === 'YES'),
            type: udt_name,
          }
        })
        const result = {
          ...tableData[0],
          columns,
        }
        return res.status(200).json(result)
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).json({ error: 'error' })
      })
  }
}
