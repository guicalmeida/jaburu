'use client'

import { ReactNode, useState } from 'react'
import SchemaForm from './(components)/schema-form'

export default function CreateSchema() {
  const [showForm, setShowForm] = useState(false)
  return (
    <>
      <button
        className="m-6 rounded-md bg-emerald-600 py-2 px-8"
        onClick={() => setShowForm(true)}
      >
        criar schema
      </button>
      {showForm && <SchemaForm />}
    </>
  )
}
