'use client'

import Uppy from '@uppy/core'
import { Dashboard as DashboardComponent } from '@uppy/react'
import Dashboard from '@uppy/dashboard'
import { useMemo } from 'react'
import { Column } from '@/models/columns.model'

export default function MediaField({ column }: { column: [string, Column] }) {
  const { display_name: displayName, required, type } = column[1]

  const uppy = useMemo(() => {
    return new Uppy({
      restrictions: {
        maxNumberOfFiles: type === 'multipleMedia' ? null : 1,
        minNumberOfFiles: required ? 1 : null,
      },
    }).use(Dashboard)
  }, [required, type])

  return (
    <div className="mb-6">
      <p className="mb-2 text-base font-extrabold">{displayName}</p>
      <DashboardComponent uppy={uppy} width={550} height={380} theme="dark" />
    </div>
  )
}
