import { database } from 'knexfile'
import { getCurrentTime } from '@/helpers/timeHelper'

export default async function handler(req, res) {
  const { tableName, id } = req.query
  if (req.method === 'GET') {
    const getContentById = async (knex) => await knex(tableName).where({ id })

    getContentById(database)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
        res.end(JSON.stringify('error'))
      })
  } else if (req.method === 'PUT') {
    const timestamp = getCurrentTime()
    const editContent = async (knex) =>
      await knex(tableName)
        .where({ id })
        .update({ ...req.body, updated_at: timestamp })

    editContent(database)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
        res.end(JSON.stringify('error'))
      })
  }
}
