import { Knex } from 'knex'
import { database } from 'knexfile'
import type { NextApiRequest, NextApiResponse } from 'next'
import * as url from 'url'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { schemaName, apiID, pluralApiId } = await req.body
    const createTable = async (knex: Knex): Promise<any> =>
      await knex.schema
        .createTable(schemaName, function (table) {
          table.increments()
          table.timestamps()
        })
        .then((value) => {
          res.end(JSON.stringify('table successfully created'))
        })
        .catch((err) => {
          console.log(err)
          res.end(JSON.stringify('error'))
        })

    createTable(database)
  }
}
