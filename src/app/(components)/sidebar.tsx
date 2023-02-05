import universalSlugify from '@/helpers/slugHelper'
import Link from 'next/link'

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/schemas`

async function getTableNames() {
  const res = await fetch(apiUrl, { method: 'GET' })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Sidebar() {
  const tableNames = await getTableNames()
  return (
    <div className="sidebar fixed top-0 bottom-0 left-0 w-[300px] overflow-y-auto bg-gray-900 p-2 text-center">
      <div className="text-xl text-gray-100">
        <div className="mt-1 flex items-center p-2.5">
          <h1 className="ml-3 text-[15px] font-bold text-gray-200">
            Jaburu CMS
          </h1>
        </div>
        <div className="my-2 h-[1px] bg-gray-600"></div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <h2 className="ml-3 text-[15px] font-bold text-gray-200">Schemas</h2>
        <a
          className="pr-5 text-lg font-bold"
          aria-label="add new item"
          href="create-schema"
        >
          +
        </a>
      </div>

      {tableNames?.map((tableName: string) => {
        const slug = universalSlugify(tableName)
        return (
          <Link
            className="mt-3 flex cursor-pointer items-center rounded-md p-2.5 px-4 text-white duration-300 hover:bg-blue-600"
            key={slug}
            href={`schemas/${slug}`}
          >
            <span className="ml-4 text-[15px] font-bold text-gray-200">
              {tableName}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
