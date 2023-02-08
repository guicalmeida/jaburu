import { database } from 'knexfile'

export default async function handler(req, res) {
  const { tableName } = req.query

  if (req.method === 'POST') {
    const insertIntoTable = async (knex) =>
      await knex(tableName).insert(req.body)

    insertIntoTable(database)
      .finally((value) => {
        console.log(value)
        res.status(200).json('value created')
      })
      .catch((err) => {
        console.log(err)
        res.end(JSON.stringify('error'))
      })
  }
}
