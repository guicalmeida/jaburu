import universalSlugify from '@/helpers/slugHelper'
import { Column, typeMap } from '@/models/columns.model'

export default function ListItem({ columnName, required, type }: Column) {
  return (
    <li className="border-gray-200 hover:bg-blue-600 flex cursor-pointer flex-col flex-wrap rounded-lg border-2 border-solid p-6 text-white duration-300">
      <h3>{columnName}</h3>
      <p>{typeMap(type)}</p>
      <p>required: {required ? 'Yes' : 'No'}</p>
    </li>
  )
}
