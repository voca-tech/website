"use client"
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { ActivitySquare, CalendarSearch, GaugeCircle, GraduationCap, MessagesSquare, Newspaper } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Lato } from 'next/font/google'

const lato = Lato({ weight: ['100', '300', '400', '700', '900'], subsets: ['latin'] })

const formSchema = z.object({
  userName: z.string().min(3),
  email: z.string().email()
})

export default function Home() {
  const contactForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className={lato.className}>
      <div className='grid grid-cols-2 gap-4 justify-center items-center align-middle'>
        <p className='text-4xl font-semibold text-teal-700 tracking-wide'>
          Damos voz ao colaborador, ajudando as empresas a cuidar das pessoas, para que as pessoas queiram cuidar das empresas
        </p>

        <div className='justify-self-center'>
          <Card className=''>
            <CardHeader>
              <CardTitle>Agendar Demonstração</CardTitle>
              <CardDescription>Entraremos em contato para marcar uma apresentação do nosso produto</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={contactForm.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seu Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite seu nome" {...field} />
                        </FormControl>
                        {/* <FormDescription>
                  Por favor informe o seu nome
                </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seu Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite seu Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" variant='link' className='p-0 text-xs'>
                    <CalendarSearch size={18} className='text-zinc-600 mr-2' />
                    Prefiro selecionar um horário disponível
                  </Button>
                  <Button type="submit" className='float-right'>Enviar</Button>
                </form>
              </Form>
            </CardContent>

          </Card>
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