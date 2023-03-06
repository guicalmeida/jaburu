'use client'

import universalSlugify from '@/helpers/slugHelper'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function BooleanColumnForm({ apiUrl }: { apiUrl: string }) {
  const router = useRouter()
  const [apiId, setApiId] = useState('')

  function handleSubmit(e: any) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const formJson: any = Object.fromEntries(formData.entries())

    formJson.unique = formJson?.unique === 'on'
    formJson.required = formJson?.required === 'on'
    formJson.editable = true
    formJson.type = 'boolean'

    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(formJson),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then(() => {
      router.refresh()
    })
  }

  function autoFillApiId(e: any) {
    const value = e.target.value
    setApiId(universalSlugify(value))
  }

  return (
    <>
      <div className="mb-8">
        <h3 className="text-2xl font-bold">Boolean</h3>
        <p className="ml-1 mt-2">Yes or no, true or false</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="mb-2 text-base" htmlFor="display_name">
          <span className="font-extrabold">Display name</span>{' '}
          <span className="font-light">· how it shows up at the form</span>
        </label>
        <input
          required
          type="text"
          className="peer mb-6 h-12 w-[550px] rounded-xl border-2 border-solid border-jaburu-100 bg-jaburu-400 p-4"
          name="display_name"
          onChange={autoFillApiId}
        />

        <label className="mb-2 text-base" htmlFor="api_id">
          <span className="font-extrabold">API ID</span>{' '}
          <span className="font-light">· how it will be accessed via API</span>
        </label>
        <input
          required
          type="text"
          className="mb-6 h-12 w-[550px] cursor-not-allowed rounded-xl border-2 border-solid border-jaburu-100 bg-jaburu-400 p-4"
          name="api_id"
          value={apiId}
          readOnly
        />
        <div className="flex gap-10">
          <div className="mb-4 flex gap-4">
            <input
              className={checkboxStyle}
              type="checkbox"
              id="required"
              name="required"
            />
            <label className="" htmlFor="required">
              Required?
            </label>
          </div>
        </div>
        <input
          className="mt-4 h-3 w-fit cursor-pointer rounded-lg bg-jaburu-100 py-4 px-5 text-center text-sm font-bold leading-[0] text-white peer-invalid:pointer-events-none peer-invalid:bg-disabled"
          type="submit"
          value="Create column"
        />
      </form>
    </>
  )
}

const checkboxStyle =
  "h-5 w-5 appearance-none rounded-md bg-jaburu-200 checked:after:relative checked:after:ml-[5px] checked:after:mt-[1px] checked:after:block checked:after:h-3 checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:transition-all checked:after:content-[''] border border-[0.125rem] border-solid border-jaburu-400"
