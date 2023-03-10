'use client'

import makeQueryClient from '@/helpers/clientQueryHelper'
import { Column } from '@/models/columns.model'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import BooleanField from './create_entry_fields/booleanField'
import DecimalField from './create_entry_fields/decimalField'
import IntegerField from './create_entry_fields/integerField'
import MultiLineTextField from './create_entry_fields/multiLineTextField'
import RichTextField from './create_entry_fields/richTextField'
import SingleLineTextField from './create_entry_fields/singleLineTextField'

const chooseField = (column: [string, Column]) => {
  switch (column[1].type) {
    case 'singleLine':
      return <SingleLineTextField column={column} />
  }
}

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
  const columns = Object.entries<Column>(tableMetadata.columns_metadata).filter(
    (column) => column[1].editable
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
          {columns?.map((column: [string, Column]) => {
            switch (column[1].type) {
              case 'singleLine':
                return <SingleLineTextField column={column} key={column[0]} />
              case 'multiLine':
                return <MultiLineTextField column={column} key={column[0]} />
              case 'boolean':
                return <BooleanField column={column} key={column[0]} />
              case 'integer':
                return <IntegerField column={column} key={column[0]} />
              case 'decimal':
                return <DecimalField column={column} key={column[0]} />
              case 'richText':
                return <RichTextField column={column} key={column[0]} />
            }
          })}
          <input
            className="m-6 rounded-md bg-emerald-600 py-2 px-8"
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
