export default function ColumnListItem({ title, info }: ListItem) {
  return (
    <li className="flex min-h-[90px] min-w-[250px] flex-col items-center justify-center rounded-2xl bg-jaburu-200 drop-shadow-lg">
      <h2 className="text-lg font-black">{title}</h2>
      <p className="text-sm font-light ">{info}</p>
    </li>
  )
}

interface ListItem {
  title: string
  info: string
}
