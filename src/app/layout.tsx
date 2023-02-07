import './globals.css'
import Sidebar from './(components)/sidebar'
import { Nunito } from '@next/font/google'

const nunito = Nunito({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={nunito.className}>
      <head />
      <body className="pl-[300px]">
        <Sidebar />
        {children}
      </body>
    </html>
  )
}
