import ContentForm from './(content_table_components)/contentForm'
import ContentTable from './(content_table_components)/contentTable'

export default function Page({ params }: { params: { tableName: string } }) {
  return (
    <>
      <ContentForm path={params?.tableName} />
      {/* @ts-expect-error Server Component */}
      <ContentTable slug={params?.tableName} />
    </>
  )
}
