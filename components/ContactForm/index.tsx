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
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { CalendarSearch } from "lucide-react"

const formSchema = z.object({
    userName: z.string().min(3),
    email: z.string().email()
})

export function ContactForm() {
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
        <Card className='shadow-md drop-shadow-md shadow-zinc-300 w-[30rem]'>
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
    )
}