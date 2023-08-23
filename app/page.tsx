"use client"
import Image from 'next/image'
import { Lato } from 'next/font/google'
import { ContactForm } from '@/components/ContactForm';
import { ModulesPreview } from '@/components/ModulesPreview';

const lato = Lato({ weight: ['100', '300', '400', '700', '900'], subsets: ['latin'] })
export default function Home() {
  return (
    <div className={lato.className}>
      <div className='grid grid-cols-2 gap-4 justify-self-center items-center align-middle'>
        <p className='text-4xl font-semibold text-teal-700 tracking-wide'>
          Damos voz ao colaborador, ajudando as empresas a cuidar das pessoas, para que as pessoas queiram cuidar das empresas
        </p>

        <div className='justify-self-center'>
          <ContactForm />
        </div>
      </div>

      <ModulesPreview />
    </div>
  )
}