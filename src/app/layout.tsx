import './globals.css'
import Sidebar from '@/components/sidebar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className="ml-[300px]">
        <Sidebar />
        {children}
      </body>
    </html>
  )
}
