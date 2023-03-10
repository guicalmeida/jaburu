import Card from '@/components/Card'
import ContentForm from '@/components/contentForm'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

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

export default function Page({ params }: { params: { tableName: string } }) {
  return (
    <>
      <Card containerStyle="max-w-[550px]">
        <h1 className="text-2xl font-black">Create new entry</h1>
      </Card>
      <ContentForm path={params.tableName} />
    </>
  )
}
