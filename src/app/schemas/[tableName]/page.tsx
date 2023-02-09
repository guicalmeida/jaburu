'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import List from './(components)/list'
import ListItem from './(components)/list-item'
import ColumnForm from './(components)/column-form'
import { Column } from '../../../models/columns.model'

export default function Page() {
  const searchParams = useSearchParams()
  const name = searchParams.get('name')

  const [showForm, setShowForm] = useState(false)
  const [columns, setColumns] = useState<Column[]>([])
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${encodeURI(
    name as string
  )}`

  useEffect(() => {
    async function fetchColumns() {
      const data = await fetch(apiUrl, { method: 'GET' })
      const json = await data.json()
      setColumns(json)
    }

    fetchColumns().catch(console.error)
  }, [apiUrl])

  return (
    <>
      <button
        className="m-6 rounded-md bg-emerald-600 py-2 px-8"
        onClick={() => setShowForm(true)}
      >
        create field
      </button>
      {showForm && <ColumnForm />}
      <h2>Current fields:</h2>
      <List>
        {columns.map((column) => {
          const { columnName, required, type } = column
          return (
            <ListItem
              columnName={columnName}
              required={required}
              type={type}
              key={columnName}
            />
          )
        })}
      </List>
    </>
  )
}
