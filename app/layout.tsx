import { NavBar } from '@/components/NavigationBar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Footer from './sections/Footer'
import { Toaster } from '@/components/ui/toaster'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

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
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
              if (location.hash) { history.replaceState(null, '', location.pathname + location.search); }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <SmoothScrollProvider>
          <NavBar />

          <div className=''>
            <Toaster />
            <div className='m-auto'>
              {children}
            </div>
          </div>

          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
