import { Column } from '@/models/columns.model'

export default function SingleLineTextField({
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
      <input
        required={required}
        type="text"
        className="peer mb-6 h-12 w-[550px] rounded-xl border-2 border-solid border-jaburu-100 bg-jaburu-400 p-4"
        name={apiId}
      />
    </div>
  )
}
