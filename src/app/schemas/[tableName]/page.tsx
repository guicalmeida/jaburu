import Card from '@/components/Card'
import ColumnForm from '@/components/column-form'
import List from '@/components/list'
import ListItem from '@/components/list-item'
import { Column } from '@/models/columns.model'

async function fetchTableMetadata(apiUrl: string) {
  const data = await fetch(apiUrl, { method: 'GET' })
  return data.json()
}

export default async function Page({
  params,
}: {
  params: { tableName: string }
}) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/schemas/${params?.tableName}`
  const tableMetadata = await fetchTableMetadata(apiUrl)

  return (
    <>
      <Card containerStyle="max-w-[550px]">
        <h1 className="text-2xl  font-black">
          Add columns to {tableMetadata?.display_name}
        </h1>
        <p className="pl-2 text-xl font-light">
          How your content collection should be named?
        </p>
      </Card>
      <ColumnForm slug={params?.tableName} />
      <h2>Current fields:</h2>
      <List>
        {tableMetadata?.columns?.map((column: Column) => {
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
