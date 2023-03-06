'use client'

import { ReactNode, useState } from 'react'
import Modal from './modal'
import TextColumnForm from './create_column_forms/textColumnForm'
import NumberColumnForm from './create_column_forms/numberColumnForm'
import BooleanColumnForm from './create_column_forms/booleanColumnForm'

function ColumnModal({ title, description, component }: ColumnItem) {
  const [openModal, setOpenModal] = useState(false)

  const handleModal = (shouldOpen: boolean) => {
    setOpenModal(shouldOpen)
  }

  return (
    <>
      <li
        className="flex h-[80px] w-[250px] cursor-pointer flex-col rounded-2xl bg-jaburu-400 p-4 drop-shadow-lg"
        key={title}
        onClick={() => {
          setOpenModal(true)
        }}
      >
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="text-sm font-light ">{description}</p>
      </li>
      {openModal && <Modal openModal={handleModal}>{component}</Modal>}
    </>
  )
}

export default function NewColumnItem({ apiUrl }: { apiUrl: string }) {
  const columnTypes = [
    {
      title: 'Simple text',
      description: 'No formatting, just plain text',
      component: <TextColumnForm apiUrl={apiUrl} type="simpleText" />,
    },
    {
      title: 'Rich text',
      description: 'Formatted text',
      component: <TextColumnForm apiUrl={apiUrl} type="richText" />,
    },
    {
      title: 'Numbers',
      description: 'Exactly what it sounds like',
      component: <NumberColumnForm apiUrl={apiUrl} />,
    },
    {
      title: 'Boolean',
      description: 'Yes or no, true or false',
      component: <BooleanColumnForm apiUrl={apiUrl} />,
    },
    {
      title: 'Media',
      description: 'Image, vector or video',
      component: '',
    },
    {
      title: 'Relational field',
      description: 'Relate to content in other tables',
      component: '',
    },
  ]
  return (
    <ul className="flex h-[100%] flex-col gap-4">
      {columnTypes.map((columnType) => {
        const { title, description, component } = columnType

        return (
          <ColumnModal
            component={component}
            description={description}
            title={title}
            key={title}
          />
        )
      })}
    </ul>
  )
}

interface ColumnItem {
  title: string
  description: string
  component: ReactNode
}
