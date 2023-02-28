'use client'

import makeQueryClient from '@/helpers/clientQueryHelper'
import { Column, staticColumns } from '@/models/columns.model'
import { useRouter } from 'next/navigation'
import { use } from 'react'

async function fetchColumns(apiUrl: string) {
  const data = await fetch(apiUrl, { method: 'GET' })
  return data.json()
}

async function fetchContentById(apiUrl: string) {
  const data = await fetch(apiUrl, { method: 'GET' })
  return data.json()
}

const queryClient = makeQueryClient()

export default function ContentForm({ path, id }: FormProps) {
  const router = useRouter()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  let content: Record<string, any>

  function handleSubmit(e: any) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const formJson = Object.fromEntries(formData.entries())
    if (id) {
      fetch(`${apiUrl}/${path}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(formJson),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
        .then(() => router.refresh())
        .then(() => router.push(`content/${path}`))
    } else {
      fetch(`${apiUrl}/${path}/create`, {
        method: 'POST',
        body: JSON.stringify(formJson),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
    }
  }

  const tableMetadata: any = use(
    queryClient(`${path}_metadata`, () =>
      fetchColumns(`${apiUrl}/schemas/${path}`)
    )
  )
  const columns = tableMetadata.columns.filter(
    (column: Column) => !staticColumns.includes(column.columnName)
  )

  if (id) {
    content = use(
      queryClient(`id_${id}_content`, () =>
        fetchContentById(`${apiUrl}/${path}/${id}`)
      )
    )[0]
  }

  if (columns.length > 0) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          {columns?.map((column: Column) => {
            const { columnName, required, type } = column
            return (
              <label
                key={columnName}
                className="mb-3 block text-base font-medium"
              >
                {columnName}:
                <input
                  name={columnName}
                  required={required}
                  defaultValue={content?.[columnName]}
                  type={type === 'int4' ? 'number' : 'text'}
                  className="text-slate-900 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </label>
            )
          })}
          <input
            className="bg-emerald-600 m-6 rounded-md py-2 px-8"
            type="submit"
            value="Submit"
          />
        </form>
      </>
    )
  } else {
    return <p>no columns were created.</p>
  }
}

interface FormProps {
  path: string
  id?: string
}
