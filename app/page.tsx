"use client"
import Image from 'next/image'
import { Red_Hat_Display } from 'next/font/google'
import { ContactForm } from '@/components/ContactForm';
import { ModulesPreview } from '@/components/ModulesPreview';
import { ClientLogos } from '@/components/ClientsLogo';
import { ListChecks, Star } from 'lucide-react';
import { BenefitsAndKPIs } from '@/components/BenefitsAndKpis';
import { Testimonials } from '@/components/Testimonials';
import { WhatsappLink } from '@/components/WhatsappLink';

const redHatDisplayFont = Red_Hat_Display({ weight: ['300', '400', '700'], subsets: ['latin'] })

export default function Home() {
  return (
    <div className={`${redHatDisplayFont.className} flex flex-col gap-4 md:gap-16`}>
      <div className='flex flex-col lg:flex-row gap-4 items-center justify-between'>
        <div className='flex flex-col gap-4'>
          <p className='text-4xl font-semibold text-teal-800 tracking-wide'>
            Você está pronto para revolucionar a gestão de pessoas da sua empresa?
          </p>
          <p className='text-lg text-teal-900'>
            Conheça o VOCA: Integrando ideias, potencializando pessoas.
          </p>

          <div className='flex gap-2 items-center text-teal-800 mt-6'>
            <Star className='text-teal-700' size={20} />
            <span className='text-sm'>Nota 10 em Atendimento</span>
          </div>
          <div className='flex gap-2 items-center text-teal-800'>
            <ListChecks className='text-teal-700' size={20} />
            <span className='text-sm'>Plataforma Completa</span>
          </div>

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