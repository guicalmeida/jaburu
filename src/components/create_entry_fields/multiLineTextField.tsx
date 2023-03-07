import { Column } from '@/models/columns.model'

export default function MultiLineTextField({
  column,
}: {
  column: [string, Column]
}) {
  const apiId = column[0]
  const { display_name: displayName, required } = column[1]
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-base font-extrabold" htmlFor={apiId}>
        {displayName}
      </label>
      <textarea
        required={required}
        className="mb-6 w-[550px] rounded-xl border-2 border-solid border-jaburu-100 bg-jaburu-400 p-4"
        rows={3}
        name={apiId}
      />
    </div>
  )
}
