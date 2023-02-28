import ContentTable from '@/components/contentTable'
import ContentForm from '../../../components/contentForm'

export default function Page({ params }: { params: { tableName: string } }) {
  return (
    <>
      <ContentForm path={params?.tableName} />
      {/* @ts-expect-error Server Component */}
      <ContentTable slug={params?.tableName} />
    </>
  )
}
