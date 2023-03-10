'use client'

import { Column } from '@/models/columns.model'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'
import {
  FaBold,
  FaCompress,
  FaExpand,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUndo,
} from 'react-icons/fa'
import {
  TbSquareNumber1,
  TbSquareNumber2,
  TbSquareNumber3,
} from 'react-icons/tb'

function MenuBar({
  editor,
  openFullscreen,
  isOpen,
}: {
  editor: Editor | null
  openFullscreen: (value: boolean) => void
  isOpen: boolean
}) {
  if (!editor) {
    return null
  }

  return (
    <div className="flex items-center justify-between p-2 ">
      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={
            'rounded p-2 ' + (editor.isActive('bold') ? 'bg-jaburu-200' : '')
          }
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={
            'rounded p-2 ' + (editor.isActive('italic') ? 'bg-jaburu-200' : '')
          }
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={
            'rounded p-2 ' + (editor.isActive('strike') ? 'bg-jaburu-200' : '')
          }
        >
          <FaStrikethrough />
        </button>
        <div className="flex w-8 gap-1 overflow-hidden duration-700 hover:w-[100%] hover:duration-700">
          <div className="rounded p-2">
            <FaHeading />
          </div>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              'rounded p-2 ' +
              (editor.isActive('heading', { level: 1 }) ? 'bg-jaburu-200' : '')
            }
          >
            <TbSquareNumber1 />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              'rounded p-2 ' +
              (editor.isActive('heading', { level: 2 }) ? 'bg-jaburu-200' : '')
            }
          >
            <TbSquareNumber2 />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              'rounded p-2 ' +
              (editor.isActive('heading', { level: 3 }) ? 'bg-jaburu-200' : '')
            }
          >
            <TbSquareNumber3 />
          </button>
        </div>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            'rounded p-2 ' +
            (editor.isActive('bulletList') ? 'bg-jaburu-200' : '')
          }
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            'rounded p-2 ' +
            (editor.isActive('orderedList') ? 'bg-jaburu-200' : '')
          }
        >
          <FaListOl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            'rounded p-2 ' +
            (editor.isActive('blockquote') ? 'bg-jaburu-200' : '')
          }
        >
          <FaQuoteLeft />
        </button>
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="rounded p-2"
        >
          <FaUndo />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="rounded p-2"
        >
          <FaRedo />
        </button>
        {isOpen ? (
          <a
            onClick={() => openFullscreen(false)}
            className="cursor-pointer rounded p-2"
          >
            <FaCompress />
          </a>
        ) : (
          <a
            onClick={() => openFullscreen(true)}
            className="cursor-pointer rounded p-2"
          >
            <FaExpand />
          </a>
        )}
      </div>
    </div>
  )
}

export default function RichTextFied({ column }: { column: [string, Column] }) {
  const [openFullscreen, setOpenFullscreen] = useState(false)
  const { display_name: displayName } = column[1]

  const handleFullscreen = (shouldOpen: boolean) => {
    setOpenFullscreen(shouldOpen)
  }

  const editor = useEditor({
    extensions: [StarterKit],
    content: ``,
  })

  return (
    <div className="mb-6">
      <p className="mb-2 text-base font-extrabold">{displayName}</p>
      <div
        className={`${
          openFullscreen
            ? 'h-[(calc(100vh-16px)] fixed top-0 left-0 z-50 box-content w-[calc(100vw-20px)]'
            : 'h-96 w-[550px]'
        }  rounded-lg border-2 border-jaburu-100 bg-jaburu-400`}
      >
        <MenuBar
          editor={editor}
          openFullscreen={handleFullscreen}
          isOpen={openFullscreen}
        />
        <EditorContent
          editor={editor}
          className={`overflow-auto ${
            openFullscreen ? 'h-[calc(100vh-56px)]' : 'h-[328px] '
          }`}
        />
      </div>
    </div>
  )
}
