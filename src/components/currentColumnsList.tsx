import { Column, typeNameMap } from '@/models/columns.model'

async function fetchTableMetadata(apiUrl: string) {
  const data = await fetch(apiUrl, { method: 'GET' })
  return data.json()
}

export default async function CurrentColumnsList({
  apiUrl,
}: {
  apiUrl: string
}) {
  const tableMetadata = await fetchTableMetadata(apiUrl)
  const { columns_metadata: columnsMetadata } = tableMetadata
  return (
    <ul className="flex h-[100%] flex-wrap gap-4">
      {Object.values<Column>(columnsMetadata).map((column) => {
        const {
          required,
          type,
          display_name: displayName,
          editable,
          unique,
        } = column

        let itemInfo = typeNameMap(type)
        if (required) itemInfo += ' · required'
        if (unique) itemInfo += ' · unique'

        if (editable) {
          return (
            <li
              key={displayName}
              className="flex h-[90px] min-w-[250px] flex-col items-center justify-center rounded-2xl bg-jaburu-200 drop-shadow-lg"
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
