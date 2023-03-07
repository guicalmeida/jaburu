import './globals.css'
import Sidebar from '../components/sidebar'
import { Nunito } from 'next/font/google'
import { ReactNode } from 'react'

const nunito = Nunito({
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${nunito.className} max-w-[100vw] overflow-x-hidden bg-jaburu-300 text-white`}
    >
      <head />
      <body className="w-7xl relative mx-auto flex">
        {/* @ts-expect-error Server Component */}
        <Sidebar />
        <div className="w-[100%]">{children}</div>
      </body>
    </html>
  )
}
