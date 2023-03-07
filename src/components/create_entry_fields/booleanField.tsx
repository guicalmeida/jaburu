import { Column } from '@/models/columns.model'

export default function BooleanField({ column }: { column: [string, Column] }) {
  const apiId = column[0]
  const { display_name: displayName, required } = column[1]
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-base font-extrabold" htmlFor={apiId}>
        {displayName}
      </label>
      <input
        required={required}
        type="checkbox"
        className="checked:after:bg-primary h-6 w-10 appearance-none rounded-2xl bg-jaburu-400 after:absolute after:z-[2] after:h-6 after:w-6 after:rounded-full after:border-none after:bg-white after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-jaburu-200 checked:after:absolute checked:after:z-[2] checked:after:ml-4 checked:after:h-6 checked:after:w-6 checked:after:rounded-full checked:after:border-none checked:after:shadow-lg checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer "
        name={apiId}
      />
    </div>
  )
}
