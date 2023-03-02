import { Column, typeMap } from '@/models/columns.model'

async function fetchTableMetadata(apiUrl: string) {
  const data = await fetch(apiUrl, { method: 'GET' })
  return data.json()
}

export default async function CurrentColumnsList({
  tableName,
}: {
  tableName: string
}) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/schemas/${tableName}`
  const tableMetadata = await fetchTableMetadata(apiUrl)
  const { columns_metadata: columnsMetadata, display_name: displayName } =
    tableMetadata
  return (
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
            <li
              key={displayName}
              className="flex min-h-[90px] min-w-[250px] flex-col items-center justify-center rounded-2xl bg-jaburu-200 drop-shadow-lg"
            >
              <h2 className="text-lg font-black">{displayName}</h2>
              <p className="text-sm font-light ">{itemInfo}</p>
            </li>
          )
        }
      })}
    </ul>
  )
}
