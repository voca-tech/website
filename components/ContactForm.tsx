'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { useForm } from 'react-hook-form'

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
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { CalendarSearch } from "lucide-react"

export interface FormDataProps {
    userName: string;
    email: string;
  };

const formSchema = z.object({
    userName: z.string().min(3, 'Por favor insira o seu nome'),
    email: z.string().email('Por favor insira um Email válido')
})

export function ContactForm() {
    const contactForm = useForm<FormDataProps>({
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
        <Card className='shadow-xl'>
            <CardHeader>
                <CardTitle>Agendar Demonstração</CardTitle>
                <CardDescription>Entraremos em contato para marcar uma reunião sobre como o nosso produto se encaixa na sua empresa</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 pb-4">
                <Form {...contactForm}>
                    <form onSubmit={contactForm.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={contactForm.control}
                            name="userName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Seu Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite seu nome" className="bg-white/80" {...field} />
                                    </FormControl>
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
                                        <Input placeholder="Digite seu Email" className="bg-white/80" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <div className="flex flex-col justify-between md:flex-row-reverse gap-2"> */}
                        <Button type="submit" variant='default' className='rounded w-full bg-voca-green/90'>Agendar</Button>
                        {/* <Button type="button" variant='link' className='p-0 text-xs'>
                                <CalendarSearch size={18} className='text-zinc-600 mr-2' />
                                Prefiro selecionar um horário disponível
                            </Button> */}
                        {/* </div> */}
                    </form>
                </Form>
            </CardContent>

        </Card>
    )
}