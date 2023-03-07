import DeleteEntryButton from '@/components/deleteEntryButton'
import ContentForm from '../../../../components/contentForm'

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
