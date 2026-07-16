import { NavBar } from '@/components/NavigationBar'
import { AnnouncementBar } from '@/components/AnnouncementBar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from './sections/Footer'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VOCA • Gestão de Pessoas',
  description: 'Cuidamos de pessoas para que elas possam cuidar das empresas',
  openGraph: {
    title: 'VOCA • Gestão de Pessoas',
    description: 'Cuidamos de pessoas para que elas possam cuidar das empresas',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body className={`${inter.className} overflow-x-hidden`}>
        <AnnouncementBar />
        <NavBar />

        <div className=''>
          <Toaster />
          <div className='m-auto'>
            {children}
          </div>
        </div>

        <Footer />
      </body>
    </html>
  )
}
