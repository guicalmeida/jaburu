'use client'

import { useRouter } from 'next/navigation'

export default function DeleteEntryButton({ path, id }: FormProps) {
  const router = useRouter()

  return (
    <button
      className="m-6 rounded-md bg-red-600 py-2 px-8"
      onClick={() =>
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}/${id}`, {
          method: 'DELETE',
        }).then(() => {
          router.refresh()
          router.push(`content/${path}`)
        })
      }
    >
      Delete entry
    </button>
  )
}

interface FormProps {
  path: string
  id?: string
}
