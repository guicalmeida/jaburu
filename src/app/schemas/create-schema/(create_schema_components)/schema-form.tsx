'use client'

import universalSlugify from '@/helpers/slugHelper'
import { useRouter } from 'next/navigation'
import pluralize from 'pluralize'
import { useState } from 'react'

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/schemas`

export default function SchemaForm() {
  const router = useRouter()
  const [apiId, setApiId] = useState('')
  const [plural, setPlural] = useState('')

  function handleSubmit(e: any) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const formJson = Object.fromEntries(formData.entries())
    fetch(`${apiUrl}`, {
      method: 'POST',
      body: JSON.stringify(formJson),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then(() => router.refresh())
  }

  function autoFillApiId(e: any) {
    const value = e.target.value
    setApiId(universalSlugify(value))
  }

  function autoFillPluralId(e: any) {
    const value = pluralize(e.target.value)
    setPlural(universalSlugify(value))
  }

  function autoFills(e: any) {
    autoFillApiId(e)
    autoFillPluralId(e)
  }

  return (
    <form onSubmit={handleSubmit} className="ml-6 flex flex-col">
      <label className="mb-2 text-base" htmlFor="display_name">
        <span className="font-extrabold">Display name</span>{' '}
        <span className="font-light">· how it shows up at the sidebar</span>
      </label>
      <input
        required
        type="text"
        className="peer mb-6 h-12 w-[550px] rounded-xl border-2 border-solid border-jaburu-100 bg-jaburu-400 p-4"
        name="display_name"
        onChange={autoFills}
      />

      <label className="mb-2 text-base" htmlFor="api_id">
        <span className="font-extrabold">API ID</span>{' '}
        <span className="font-light">
          · how single entries will be accessed via API
        </span>
      </label>
      <input
        required
        type="text"
        className="mb-6 h-12 w-[550px] cursor-not-allowed rounded-xl border-2 border-solid border-jaburu-100 bg-jaburu-400 p-4"
        name="api_id"
        value={apiId}
        readOnly
      />
      <label className="mb-2 text-base" htmlFor="plural_api_id">
        <span className="font-extrabold">Plural API ID</span>{' '}
        <span className="font-light">
          · how all entries will be accessed via API
        </span>
      </label>
      <input
        required
        type="text"
        className="mb-6 h-12 w-[550px] cursor-not-allowed rounded-xl border-2 border-solid border-jaburu-100 bg-jaburu-400 p-4"
        name="plural_api_id"
        value={plural}
        readOnly
      />
      <label className="mb-2 text-base" htmlFor="description">
        <span className="font-extrabold">Description</span>{' '}
        <span className="font-light">(optional)</span>
      </label>
      <textarea
        className="mb-6 w-[550px] rounded-xl border-2 border-solid border-jaburu-100 bg-jaburu-400 p-4"
        rows={3}
        name="description"
      />
      <input
        className=" w-fit cursor-pointer rounded-lg bg-jaburu-100 p-4 text-center text-sm font-bold tracking-widest text-white peer-invalid:pointer-events-none peer-invalid:bg-disabled"
        type="submit"
        value="CREATE TABLE"
      />
    </form>
  )
}
