import { Column } from '@/models/columns.model'
import { formatUTC, isValidDate } from '@/helpers/timeHelper'
import Link from 'next/link'

async function fetchContent(apiUrl: string) {
  const data = await fetch(apiUrl, { method: 'GET' })
  return data.json()
}

async function fetchTableMetadata(apiUrl: string) {
  const data = await fetch(apiUrl, { method: 'GET' })
  return data.json()
}

function ContentRows(data: any[], slug: string) {
  if (data.length > 0) {
    return data.map((info: any) => (
      <tr key={info.id} className="hover:bg-gray-50">
        {Object.entries(info).map((cell: any) => (
          <td key={cell[0]} className="px-6 py-4">
            {isValidDate(cell[1]) ? formatUTC(cell[1]) : cell[1]}
          </td>
        ))}
        <td className="px-6 py-4">
          <Link href={`content/${slug}/${info.id}`}>Edit</Link>
        </td>
      </tr>
    ))
  } else {
    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4">Table has no entries</td>
      </tr>
    )
  }
}

export default async function ContentTable({ slug }: { slug: string }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const contentData: any = fetchContent(`${apiUrl}/${slug}`)
  const tableMetadata: any = fetchTableMetadata(`${apiUrl}/schemas/${slug}`)

  const [content, tableInfo] = await Promise.all([contentData, tableMetadata])

  return (
    <div className="border-gray-200 m-5 overflow-hidden rounded-lg border shadow-md">
      <table className="text-gray-500 w-full border-collapse bg-white text-left text-sm">
        <thead className="bg-gray-50">
          <tr>
            {tableInfo?.columns?.map((col: Column) => (
              <th
                key={col.columnName}
                scope="col"
                className="text-gray-900 px-6 py-4 font-medium"
              >
                {col.columnName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-gray-100 border-gray-100 divide-y border-t">
          {ContentRows(content, slug)}
        </tbody>
      </table>
    </div>
  )
}
