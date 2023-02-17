import ContentForm from '../(components)/contentForm'

export default function Page({
  params,
}: {
  params: { tableName: string; id: string }
}) {
  const { tableName, id } = params

  return <ContentForm path={tableName} id={id} />
}
