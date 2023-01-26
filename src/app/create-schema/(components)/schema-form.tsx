'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

type Fields = {
  schemaName: string
  apiId: string
  pluralApiId: string
}

export default function SchemaForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>()
  const onSubmit: SubmitHandler<Fields> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="mb-3 block text-base font-medium">
        Schema name:
        <input
          type="text"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-slate-900 outline-none focus:border-[#6A64F1] focus:shadow-md"
          {...register('schemaName', { required: true })}
        />
        {errors.schemaName && <span>This field is required</span>}
      </label>
      <label className="mb-3 block text-base font-medium">
        API ID:
        <input
          type="text"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-slate-900 outline-none focus:border-[#6A64F1] focus:shadow-md"
          {...register('apiId', { required: true })}
        />
        {errors.apiId && <span>This field is required</span>}
      </label>
      <label className="mb-3 block text-base font-medium">
        Plural API ID:
        <input
          type="text"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-slate-900 outline-none focus:border-[#6A64F1] focus:shadow-md"
          {...register('pluralApiId', { required: true })}
        />
        {errors.pluralApiId && <span>This field is required</span>}
      </label>
      <input
        className="m-6 rounded-md bg-emerald-600 py-2 px-8"
        type="submit"
        value="Submit"
      />
    </form>
  )
}
