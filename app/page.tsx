"use client"
import Image from 'next/image'
import { ActivitySquare, GaugeCircle, GraduationCap, MessagesSquare, Newspaper } from 'lucide-react';

import { Button } from '@/components/ui/button'
import { Lato } from 'next/font/google'
import { ContactForm } from '@/components/ContactForm';

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

      <div className='w-fit items-start flex flex-col gap-4 mt-8'>
        <Button variant={true ? 'default' : 'ghost'}><MessagesSquare size={16} className='text-slate-200 mr-2' /> VOCA Opinião</Button>
        <Button variant={'ghost'}><ActivitySquare size={16} className='text-slate-600 mr-2' />VOCA Pulso</Button>
        <Button variant={'ghost'}><Newspaper size={16} className='text-slate-600 mr-2' />VOCA Integra</Button>
        <Button variant={'ghost'}><GraduationCap size={16} className='text-slate-600 mr-2' />VOCA Conhecimento</Button>
        <Button variant={'ghost'}><GaugeCircle size={16} className='text-slate-600 mr-2' />VOCA Desempenho</Button>
      </div>
    </div>
  )
}