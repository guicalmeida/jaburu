import { ReactNode } from 'react'

export default function Card({
  children,
  containerStyle,
}: {
  children: ReactNode
  containerStyle: string
}) {
  return (
    <div
      className={`${containerStyle} m-5 overflow-y-auto rounded-2xl bg-jaburu-400 p-5`}
    >
      {children}
    </div>
  )
}
