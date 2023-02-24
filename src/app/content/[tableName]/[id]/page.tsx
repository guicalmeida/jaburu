import ContentForm from '../(content_table_components)/contentForm'
import DeleteEntryButton from '../(content_table_components)/deleteEntryButton'

export default async function Page({
  params,
}: {
  params: { tableName: string; id: string }
}) {
  const { tableName, id } = params

  return (
    <>
      <ContentForm path={tableName} id={id} />
      <DeleteEntryButton path={tableName} id={id} />
    </>
  )
}
