import Card from '@/components/Card'
import Link from 'next/link'

async function getTableNames() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schemas`, {
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Sidebar() {
  const tableNames = await getTableNames()
  return (
    <Card containerStyle="relative top-0 left-0 min-w-[280px] min-h-[700px]">
      <div className="text-xl text-gray-100">
        <div className="flex items-center">
          <h1 className="font-bold">Jaburu CMS</h1>
        </div>
        <div className="my-2 h-[1px] bg-white"></div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-base font-bold tracking-widest">TABLES</h2>
        <Link
          className="pr-5 text-lg font-bold"
          aria-label="add new item"
          href="/schemas/create-schema"
        >
          +
        </Link>
      </div>

      <ul>
        {tableNames?.map((tableData: TableData) => {
          const { display_name, api_id } = tableData
          return (
            <li key={api_id}>
              <Link
                className="mt-3 flex cursor-pointer items-center rounded-md p-2.5 px-4 duration-300 hover:bg-jaburu-200"
                href={`/schemas/${api_id}`}
              >
                <span className="ml-4 text-[15px] font-extralight text-gray-200">
                  {display_name}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-base font-bold tracking-widest">CONTENT</h2>
      </div>
      <ul>
        {tableNames?.map((tableData: TableData) => {
          const { display_name, api_id } = tableData
          return (
            <li key={api_id}>
              <Link
                className="mt-3 flex cursor-pointer items-center rounded-md p-2.5 px-4 duration-300 hover:bg-jaburu-200"
                href={`content/${api_id}`}
              >
                <span className="ml-4 text-[15px] font-extralight text-gray-200">
                  {display_name}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

interface TableData {
  id: number
  api_id: string
  description: string
  plural_api_id: string
  display_name: string
  created_at: string
}
