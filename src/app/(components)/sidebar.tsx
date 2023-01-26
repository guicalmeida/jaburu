import Link from 'next/link'

export default function Sidebar({ options }: Options) {
  return (
    <div className="sidebar fixed top-0 bottom-0 left-0 w-[300px] overflow-y-auto bg-gray-900 p-2 text-center">
      <div className="text-xl text-gray-100">
        <div className="mt-1 flex items-center p-2.5">
          <h1 className="ml-3 text-[15px] font-bold text-gray-200">
            Jaburu CMS
          </h1>
        </div>
        <div className="my-2 h-[1px] bg-gray-600"></div>
      </div>

      {options?.map((option) => {
        return (
          <Link
            className="mt-3 flex cursor-pointer items-center rounded-md p-2.5 px-4 text-white duration-300 hover:bg-blue-600"
            key={option.name}
            href={option.path}
          >
            <span className="ml-4 text-[15px] font-bold text-gray-200">
              {option.name}
            </span>
          </Link>
        )
      })}
    </div>
  )
}

interface Options {
  options: {
    name: string
    path: string
  }[]
}
