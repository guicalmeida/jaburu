'use client'

import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

type Fields = {
  fieldName: string
  fieldType: string
  required: boolean
}

export default function ColumnForm({ slug }: { slug: string }) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>({ defaultValues: { required: false } })

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${slug}`

  const onSubmit: SubmitHandler<Fields> = async (data) => {
    await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then(() => {
      router.refresh()
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="mb-3 block text-base font-medium">
        field name:
        <input
          type="text"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-slate-900 outline-none focus:border-[#6A64F1] focus:shadow-md"
          {...register('fieldName', { required: true })}
        />
        {errors.fieldName && <span>This field is required</span>}
      </label>
      <label className="mb-3 block text-base font-medium">
        Field type:
        <select {...register('fieldType', { required: true })}>
          <option value="string">short text</option>
          <option value="markdown">markdown</option>
          <option value="integer">integer</option>
        </select>
        {errors.fieldType && <span>This field is required</span>}
      </label>
      <label className="mb-3 block text-base font-medium">
        Required?
        <input
          type="checkbox"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-slate-900 outline-none focus:border-[#6A64F1] focus:shadow-md"
          {...register('required')}
        />
        {errors.required && <span>This field is required</span>}
      </label>
      <input
        className="m-6 rounded-md bg-emerald-600 py-2 px-8"
        type="submit"
        value="Submit"
      />
    </form>
  )
}
