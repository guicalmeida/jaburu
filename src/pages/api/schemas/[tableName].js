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
  }
}
