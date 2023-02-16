import ContentForm from './(components)/contentForm'
import ContentTable from './(components)/contentTable'

export default function Page({ params }: { params: { tableName: string } }) {
  return (
    <>
      <ContentForm slug={params?.tableName} />
      <ContentTable slug={params?.tableName} />
    </>
  )
}
