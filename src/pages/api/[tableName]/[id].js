import { database } from 'knexfile'
import { getCurrentTime } from '@/helpers/timeHelper'

export default async function handler(req, res) {
  const { tableName, id } = req.query
  if (req.method === 'GET') {
    const getContentById = async (knex) => await knex(tableName).where({ id })

    return getContentById(database)
      .then((data) => {
        return res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).json({ error: 'error' })
      })
  } else if (req.method === 'PUT') {
    const timestamp = getCurrentTime()
    const editContent = async (knex) =>
      await knex(tableName)
        .where({ id })
        .update({ ...req.body, updated_at: timestamp })

    return editContent(database)
      .then((data) => {
        return res.status(201).json(data)
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).json({ error: 'error' })
      })
  } else if (req.method === 'DELETE') {
    const deleteContent = async (knex) =>
      await knex(tableName).where({ id }).del()

    return deleteContent(database)
      .then((data) => {
        return res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).json({ error: 'error' })
      })
  }
}
