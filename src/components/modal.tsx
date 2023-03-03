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
        className="absolute h-[100%] w-[100%] bg-neutral-900 bg-opacity-80"
      />
      <div className="relative z-20 h-fit w-fit rounded-xl bg-jaburu-300 p-6 shadow-lg">
        <div
          className=" absolute right-[-12px] top-[-12px] cursor-pointer rounded-full bg-jaburu-200 p-2 text-base shadow-md"
          onClick={() => openModal(false)}
        >
          <CloseSvg />
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

function CloseSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 256 256"
    >
      <path
        fill="white"
        d="M208.5 191.5a12 12 0 0 1 0 17a12.1 12.1 0 0 1-17 0L128 145l-63.5 63.5a12.1 12.1 0 0 1-17 0a12 12 0 0 1 0-17L111 128L47.5 64.5a12 12 0 0 1 17-17L128 111l63.5-63.5a12 12 0 0 1 17 17L145 128Z"
      />
    </svg>
  )
}
