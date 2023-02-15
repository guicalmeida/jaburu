export async function insertIntoTable(knex, tableName, body) {
  return await knex(tableName).insert(body)
}
