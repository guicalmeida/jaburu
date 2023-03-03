import { ReactNode } from 'react'

export default function Modal({
  children,
  openModal,
}: {
  children: ReactNode
  openModal: (value: boolean) => void
}) {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-[100%] w-[100%] items-center justify-center overflow-hidden">
      <div
        onClick={() => openModal(false)}
        className="absolute h-[100%] w-[100%] bg-neutral-600 bg-opacity-60"
      />
      <div className="relative z-20 h-fit w-fit rounded-xl bg-jaburu-200 p-6">
        <div>{children}</div>
      </div>
    </div>
  )
}
