import Card from '@/components/Card'
import { Column, typeMap } from '@/models/columns.model'

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
  const { columns_metadata: columnsMetadata, display_name: displayName } =
    tableMetadata

  return (
    <>
      <Card containerStyle="max-w-[550px]">
        <h1 className="text-2xl  font-black">Add columns to {displayName}</h1>
        <p className="pl-2 text-xl font-light">
          Which fields should a {displayName} have?{' '}
        </p>
      </Card>
      <ul className="flex flex-wrap gap-4">
        {Object.values<Column>(columnsMetadata).map((column) => {
          const {
            required,
            type,
            display_name: displayName,
            editable,
            unique,
          } = column

          let itemInfo = typeMap(type)
          if (required) itemInfo += ' · required'
          if (unique) itemInfo += ' · unique'

          if (editable) {
            return (
              <li key={displayName}>
                <h2 className="text-lg font-black">{displayName}</h2>
                <p className="text-sm font-light ">{itemInfo}</p>
              </li>
            )
          }
        })}
      </ul>
    </>
  )
}
