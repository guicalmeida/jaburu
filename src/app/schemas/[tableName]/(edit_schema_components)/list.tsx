import { ReactNode } from 'react'

export default function List({ children }: { children: ReactNode }) {
  return <ul className="flex flex-wrap gap-3">{children}</ul>
}
