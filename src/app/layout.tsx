import './globals.css'
import NavBar from "./_components/NavBar"
import {Lato } from 'next/font/google'
import Footer from './_components/Footer'

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
        <NavBar/>
        <main className='min-h-screen'>
          {children}
        </main> 
        <Footer/> 
      </body>
    </html>
  )
}
