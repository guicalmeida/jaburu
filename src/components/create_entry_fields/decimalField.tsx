'use client'

import { Column } from '@/models/columns.model'
import { useState } from 'react'

export default function DecimalField({ column }: { column: [string, Column] }) {
  const apiId = column[0]
  const [number, setNumber] = useState('')

  const handleNumber = (e: any) => {
    let input = e.target.value

    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setNumber(input)
  }
  const { display_name: displayName, required } = column[1]
  return (
    <div className="mb-6 flex flex-col">
      <label className="mb-2 text-base font-extrabold" htmlFor={apiId}>
        {displayName}
      </label>
      <input
        required={required}
        type="text"
        className="peer h-12 w-[550px] rounded-xl border-2 border-solid border-jaburu-100 bg-jaburu-400 p-4"
        name={apiId}
        placeholder="input a decimal number"
        value={number}
        onChange={handleNumber}
      />
      <p className="hidden text-red-500 peer-invalid:block">
        Only integer allowed
      </p>
    </div>
  )
}
