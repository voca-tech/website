'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { useForm } from 'react-hook-form'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { CheckCheck } from "lucide-react"
import { sendEmail } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "./Loading"
import { useState } from "react"

export interface FormDataProps {
    leadName: string;
    phone: string;
    email: string;
};

interface ContactFormProps {
    title?: string;
    description?: string;
    buttonText?: string
}

const formSchema = z.object({
    leadName: z.string().min(3, 'Por favor insira o seu nome'),
    phone: z.string().optional(),
    email: z.string().email('Por favor insira um Email válido')
})

export function ContactForm({ title, description, buttonText }: ContactFormProps) {
    const { toast } = useToast()
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)

    const contactForm = useForm<FormDataProps>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            leadName: "",
            phone: "",
            email: ""
        },
    })
    const { isSubmitting } = contactForm.formState

    async function onSubmit(data: FormDataProps) {
        const status = await sendEmail(data)
        if (status === 200) {
            toast({
                title: "Sucesso!",
                description: "Em breve nosso time irá entrar em contato 😉",
                variant: "success"
            })
            setIsFormSubmitted(true)
        } else {
            toast({
                title: "Algo de errado 😢",
                description: "Por favor, tente novamente mais tarde",
                variant: 'destructive'
            })
        }
    }

    const formTitle = title || 'Agendar Demonstração'
    const formDescription = description || 'Entraremos em contato para marcar uma reunião sobre como o nosso produto se encaixa na sua empresa'
    const formButtonText = buttonText || 'Agendar'

    return (
        <Card className='shadow-xl'>
            <CardHeader>
                <CardTitle>{formTitle}</CardTitle>
                <CardDescription>{formDescription}</CardDescription>
            </CardHeader>
            {/* <Button type="button" onClick={() => {
                toast({
                    title: "Sucesso!",
                    description: "Em breve nosso time irá entrar em contato 😉",
                    variant: "success"
                })
            }}>
                Toast
            </Button> */}
            <CardContent className="pt-0 pb-4">
                <Form {...contactForm}>
                    <form onSubmit={contactForm.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={contactForm.control}
                            name="leadName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Seu Nome*</FormLabel>
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
                                    <FormLabel>Seu Email Corporativo*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite seu Email" className="bg-white/80" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={contactForm.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Telefone para Contato</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o seu telefone" className="bg-white/80" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <div className="flex flex-col justify-between md:flex-row-reverse gap-2"> */}
                        {isFormSubmitted ? (
                            <p className="flex gap-2 items-center justify-center text-center text-sm text-teal-900">
                                <CheckCheck size={16} />
                                Informações enviadas com sucesso!
                            </p>
                        ) : (
                            <Button type="submit" variant='default' className='rounded w-full bg-voca-green/90' disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <LoadingSpinner />
                                ) : (
                                    <span>{formButtonText}</span>
                                )}
                            </Button>
                        )}
                        {/* <Button type="button" variant='link' className='p-0 text-xs'>
                                <CalendarSearch size={18} className='text-zinc-600 mr-2' />
                                Prefiro selecionar um horário disponível
                            </Button> */}
                        {/* </div> */}
                    </form>
                </Form>
            </CardContent>

        </Card >
    )
}