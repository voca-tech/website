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
  metadataBase: new URL('https://www.voca.com.br'),
  title: 'VOCA | Plataforma de DHO completa para gestão, comunicação e inteligência de dados',
  description: 'A plataforma de DHO que conecta, organiza e ativa as pessoas da sua empresa: 21 funcionalidades integradas, suporte humano e resultados desde o primeiro mês.',
  openGraph: {
    title: 'VOCA | Comunicação, engajamento e inteligência de pessoas em uma única plataforma',
    description: 'A plataforma de DHO que conecta, organiza e ativa as pessoas da sua empresa: 21 funcionalidades integradas, suporte humano e resultados desde o primeiro mês.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'VOCA',
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
