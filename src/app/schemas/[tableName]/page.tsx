import List from './(components)/list'
import ListItem from './(components)/list-item'
import ColumnForm from './(components)/column-form'
import { Column } from '../../../models/columns.model'

async function fetchColumns(apiUrl: string) {
  const data = await fetch(apiUrl, { method: 'GET' })
  return data.json()
}

export default async function Page({
  params,
}: {
  params: { tableName: string }
}) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${params?.tableName}/columns`
  const columns = await fetchColumns(apiUrl)

  return (
    <>
      <ColumnForm slug={params?.tableName} />
      <h2>Current fields:</h2>
      <List>
        {columns.map((column: Column) => {
          const { columnName, required, type } = column
          return (
            <ListItem
              columnName={columnName}
              required={required}
              type={type}
              key={columnName}
            />
          )
        })}
      </List>
    </>
  )
}
