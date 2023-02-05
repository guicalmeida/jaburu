export default function Page({ params }: params) {
  const { tableName } = params
  return <div>{tableName}</div>
}

type params = {
  params: {
    tableName: string
  }
}
