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
  const options = [
    {
      name: 'create schema',
      path: 'create-schema',
    },
  ]
  return (
    <html lang="en" className={nunito.className}>
      <head />
      <body className="ml-[300px]">
        <Sidebar options={options} />
        {children}
      </body>
    </html>
  )
}
