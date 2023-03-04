import { database } from 'knexfile'

export default async function handler(req, res) {
  const { tableName } = req.query

  if (req.method === 'GET') {
    const getAllPosts = async (knex) => await knex(tableName)

    return getAllPosts(database)
      .then((data) => {
        return res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).json({ error: 'error' })
      })
  }
}
