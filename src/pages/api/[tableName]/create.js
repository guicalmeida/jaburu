import { database } from 'knexfile'
import { insertIntoTable } from '../(common)'

export default async function handler(req, res) {
  const { tableName } = req.query

  if (req.method === 'POST') {
    insertIntoTable(database, tableName, req.body)
      .finally(() => {
        res.status(200).json('value created')
      })
      .catch((err) => {
        console.log(err)
        res.end(JSON.stringify('error'))
      })
  }
}
