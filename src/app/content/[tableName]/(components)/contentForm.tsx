'use client'

import { Column, staticColumns } from '@/models/columns.model'
import { use } from 'react'

async function fetchColumns(apiUrl: string) {
  const data = await fetch(apiUrl, { method: 'GET' })
  return data.json()
}

export default function ContentForm({ slug }: { slug: string }) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${slug}`

  function handleSubmit(e: any) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const formJson = Object.fromEntries(formData.entries())
    fetch(`${apiUrl}/create`, {
      method: 'POST',
      body: JSON.stringify(formJson),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
  }

  const columns: any = use(fetchColumns(`${apiUrl}/columns`)).filter(
    (column: Column) => !staticColumns.includes(column.columnName)
  )

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
                type={type === 'int4' ? 'number' : 'text'}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-slate-900 outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </label>
          )
        })}
        <input
          className="m-6 rounded-md bg-emerald-600 py-2 px-8"
          type="submit"
          value="Submit"
        />
      </form>
    </>
  )
}
