import { Column } from '@/models/columns.model'

export default function IntegerField({ column }: { column: [string, Column] }) {
  const apiId = column[0]
  const { display_name: displayName, required } = column[1]
  return (
    <div className="mb-6 flex flex-col">
      <label className="mb-2 text-base font-extrabold" htmlFor={apiId}>
        {displayName}
      </label>
      <input
        required={required}
        type="number"
        className="peer h-12 w-[550px] rounded-xl border-2 border-solid border-jaburu-100 bg-jaburu-400 p-4"
        name={apiId}
        defaultValue={0}
      />
      <p className="hidden text-red-500 peer-invalid:block">
        Only integer allowed
      </p>
    </div>
  )
}
