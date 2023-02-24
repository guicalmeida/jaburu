'use client'

import universalSlugify from '@/helpers/slugHelper'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/schemas`

export default function SchemaForm() {
  const router = useRouter()
  const [slug, setSlug] = useState('')

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

  function autoFillSlug(e: any) {
    const value = e.target.value
    setSlug(universalSlugify(value))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="mb-3 block text-base font-medium">
        Display name:
        <input
          type="text"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-slate-900 outline-none focus:border-[#6A64F1] focus:shadow-md"
          name="display_name"
          onChange={autoFillSlug}
        />
      </label>
      <label className="mb-3 block text-base font-medium">
        Slug:
        <input
          type="text"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-slate-900 outline-none focus:border-[#6A64F1] focus:shadow-md"
          name="slug"
          value={slug}
          readOnly
        />
      </label>
      <input
        className="m-6 rounded-md bg-emerald-600 py-2 px-8"
        type="submit"
        value="Submit"
      />
    </form>
  )
}
