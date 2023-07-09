import './globals.css'
import Navbar from './_components/navbar'
import {Lato } from 'next/font/google'

const lato = Lato({ subsets: ['latin'], weight: '400' })

export const metadata = {
  title: 'To The Closet',
  description: 'Fashion Clothing Rental Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <Navbar/>
        <main>
          {children}
        </main>    
      </body>
    </html>
  )
}