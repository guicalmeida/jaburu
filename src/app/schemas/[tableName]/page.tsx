import Card from '@/components/Card'
import CurrentColumnsList from '@/components/currentColumnsList'

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
  const { display_name: displayName } = tableMetadata

  return (
    <>
      <Card containerStyle="max-w-[550px]">
        <h1 className="text-2xl  font-black">Add columns to {displayName}</h1>
        <p className="pl-2 text-xl font-light">
          Which fields should a {displayName} have?{' '}
        </p>
      </Card>
      <CurrentColumnsList tableName={params?.tableName} />
    </>
  )
}
