'use client'

import universalSlugify from '@/helpers/slugHelper'
import { columnMap } from '@/models/columns.model'
import { useSearchParams } from 'next/navigation'
import { use, useMemo } from 'react'
import { formatUTC, isValidDate } from '@/helpers/timeHelper'

async function fetchContent(apiUrl: string) {
  const data = await fetch(apiUrl, { method: 'GET' })
  return data.json()
}

export default function ContentTable() {
  const tableName = useSearchParams().get('name')
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${encodeURI(
    tableName as string
  )}`

  const contentResponse: any = use(fetchContent(apiUrl))
  const columnsResponse = Object.keys(contentResponse[0])

  const data = useMemo(() => contentResponse, [contentResponse])

  const columns: any = useMemo(
    () =>
      columnsResponse.map((col) => {
        return {
          Header: columnMap(col),
          accessor: universalSlugify(col),
        }
      }),
    [columnsResponse]
  )

  return (
    <div className="m-5 overflow-hidden rounded-lg border border-gray-200 shadow-md">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col: any) => (
              <th
                key={col.accessor}
                scope="col"
                className="px-6 py-4 font-medium text-gray-900"
              >
                {col.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {data.map((info: any) => (
            <tr key={info.id} className="hover:bg-gray-50">
              {Object.entries(info).map((cell: any) => (
                <td key={cell[0]} className="px-6 py-4">
                  {isValidDate(cell[1]) ? formatUTC(cell[1]) : cell[1]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
