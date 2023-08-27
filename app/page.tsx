"use client"
import Image from 'next/image'
import { Lexend } from 'next/font/google'
import { ContactForm } from '@/components/ContactForm';
import { ModulesPreview } from '@/components/ModulesPreview';
import { ClientLogos } from '@/components/ClientsLogo';
import { ListChecks, Star } from 'lucide-react';
import { BenefitsAndKPIs } from '@/components/BenefitsAndKpis';
import { Testimonials } from '@/components/Testimonials';
import { WhatsappLink } from '@/components/WhatsappLink';

const lexendFont = Lexend({ weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin'] })

export default function Home() {
  return (
    <div className={`${lexendFont.className} flex flex-col gap-4 md:gap-16`}>
      <div className='flex flex-col lg:flex-row gap-4 items-center justify-between font-light'>
        <div className='flex flex-col text-center sm:text-start gap-4'>
          <h1 className="text-3xl sm:text-5xl tracking-tight text-slate-900 ">
            Gestão{' '}
            <span className="relative whitespace-nowrap text-teal-700">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute top-2/3 left-0 h-[0.58em] w-full fill-teal-700/30"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
              <span className="relative font-semibold">inteligente</span>
            </span>{' '}
            de pessoas, clima organizacional, desempenho e muito mais.
          </h1>
          <p className="mt-2 text-md sm:text-xl text-md tracking-tight text-slate-600">
            Conheça o <span className='font-medium text-teal-800'>VOCA</span>. Ajudamos a sua empresa a <strong>cuidar das pessoas</strong>, para que elas queiram cuidar da empresa!
          </p>

          {/* <div className='flex gap-2 items-center text-teal-800 mt-6'>
            <Star className='text-teal-700' size={20} />
            <span className='text-sm'>Nota 10 em Atendimento</span>
          </div>
          <div className='flex gap-2 items-center text-teal-800'>
            <ListChecks className='text-teal-700' size={20} />
            <span className='text-sm'>Plataforma Completa</span>
          </div> */}

        </div>

        <div className='flex flex-col gap-4 w-full'>
          <ContactForm />
          <WhatsappLink />
        </div>
      </div>

      <ModulesPreview />

      <ClientLogos />

      <BenefitsAndKPIs />

      <Testimonials />
    </div>
  )
}