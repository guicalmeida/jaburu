import { database } from 'knexfile'
import { insertIntoTable } from '../(common)'

export default async function handler(req, res) {
  const { tableName } = req.query

  if (req.method === 'POST') {
    return insertIntoTable(database, tableName, req.body)
      .then(() => {
        return res.status(201).json({ message: 'value created' })
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).json({ error: 'error' })
      })
  }
}
