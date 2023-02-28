import Card from '@/components/Card'
import SchemaForm from './(create_schema_components)/schema-form'

export default function CreateSchema() {
  return (
    <>
      <Card containerStyle="max-w-[550px]">
        <h1 className="text-2xl  font-black">Create new table</h1>
        <p className="pl-2 text-xl font-light">
          How your content collection should be named?
        </p>
      </Card>
      <SchemaForm />
    </>
  )
}
