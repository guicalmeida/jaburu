import Card from '@/components/Card'
import ContentTable from '@/components/contentTable'
import Link from 'next/link'

async function getTableMetadata(tableName: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/schemas/${tableName}`,
    {
      method: 'GET',
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page({
  params,
}: {
  params: { tableName: string }
}) {
  const { display_name: displayName, description } = await getTableMetadata(
    params?.tableName
  )

  return (
    <>
      <div className="flex items-center justify-between">
        <Card containerStyle="max-w-[550px]">
          <h1 className="mb-4  text-2xl font-black">{displayName}</h1>
          <p className="pl-2 text-xl font-light">{description}</p>
        </Card>

        <Link href={`content/${params?.tableName}/create`}>
          <button className="mr-6 rounded-lg bg-jaburu-200 p-4 shadow-lg">
            Create new entry
          </button>
        </Link>
      </div>
      {/* @ts-expect-error Server Component */}
      <ContentTable slug={params?.tableName} />
    </>
  )
}
