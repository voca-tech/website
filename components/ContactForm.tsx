'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { AnimatePresence, motion } from "motion/react"
import { useRef, useState, type KeyboardEvent } from "react"

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
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { ArrowLeft, ArrowRight, CheckCheck, Mail, MessageSquare, Phone, Send, User, type LucideIcon } from "lucide-react"
import { sendEmail } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "./Loading"

export interface FormDataProps {
    leadName: string;
    phone: string;
    email: string;
    message?: string;
};

interface ContactFormProps {
    title?: string;
    description?: string;
    buttonText?: string;
    defaultMessage?: string;
}

const formSchema = z.object({
    leadName: z.string().min(3, 'Por favor insira o seu nome'),
    phone: z.string().optional(),
    email: z.string().email('Por favor insira um Email válido'),
    message: z.string().optional()
})

type StepField = keyof FormDataProps;

interface Step {
    field: StepField;
    label: string;
    placeholder: string;
    icon: LucideIcon;
    optional?: boolean;
    multiline?: boolean;
}

const steps: Step[] = [
    { field: "leadName", label: "Qual é o seu nome?", placeholder: "Digite seu nome", icon: User },
    { field: "email", label: "Qual o seu e-mail corporativo?", placeholder: "Digite seu e-mail", icon: Mail },
    { field: "phone", label: "Um telefone para contato", placeholder: "Digite o seu telefone", icon: Phone, optional: true },
    { field: "message", label: "Conte um pouco sobre o seu desafio", placeholder: "Descreva em poucas palavras", icon: MessageSquare, optional: true, multiline: true },
];

export function ContactForm({ title, description, buttonText, defaultMessage }: ContactFormProps) {
    const { toast } = useToast()
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)
    const [step, setStep] = useState(0)
    const hasInteracted = useRef(false)

    const contactForm = useForm<FormDataProps>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            leadName: "",
            phone: "",
            email: "",
            message: defaultMessage || ""
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

    const current = steps[step]
    const Icon = current.icon
    const isLastStep = step === steps.length - 1

    async function handleNext() {
        const valid = await contactForm.trigger(current.field)
        if (valid) {
            hasInteracted.current = true
            setStep((s) => Math.min(s + 1, steps.length - 1))
        }
    }

    function handleBack() {
        hasInteracted.current = true
        setStep((s) => Math.max(s - 1, 0))
    }

    function handleKeyDown(e: KeyboardEvent<HTMLFormElement>) {
        if (e.key === "Enter" && !isLastStep) {
            e.preventDefault()
            handleNext()
        }
    }

    const formTitle = title || 'Agendar Demonstração'
    const formDescription = description || 'Entraremos em contato para marcar uma reunião sobre como o nosso produto se encaixa na sua empresa'
    const formButtonText = buttonText || 'Agendar'

    return (
        <Card className="relative rounded-[1.75rem] border border-slate-100 bg-white shadow-2xl shadow-voca-green/10 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-slate-100">
                <div
                    className="h-full bg-gradient-to-r from-voca-green to-teal-400 transition-all duration-500 ease-out"
                    style={{ width: isFormSubmitted ? "100%" : `${((step + 1) / steps.length) * 100}%` }}
                />
            </div>

            <CardHeader className="p-7 pb-2 sm:p-8 sm:pb-2">
                <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-xl sm:text-2xl font-extrabold text-slate-900">{formTitle}</CardTitle>
                    {!isFormSubmitted && (
                        <span className="text-xs font-bold text-slate-400 tracking-wide shrink-0">
                            {step + 1}/{steps.length}
                        </span>
                    )}
                </div>
                <CardDescription className="text-slate-500">{formDescription}</CardDescription>
            </CardHeader>
            <CardContent className="p-7 pt-4 sm:p-8 sm:pt-4">
                {isFormSubmitted ? (
                    <p className="flex gap-2 items-center justify-center text-center text-sm font-semibold text-voca-green bg-voca-green/10 rounded-xl py-3.5">
                        <CheckCheck size={16} />
                        Informações enviadas com sucesso!
                    </p>
                ) : (
                    <Form {...contactForm}>
                        <form onSubmit={contactForm.handleSubmit(onSubmit)} onKeyDown={handleKeyDown} className="space-y-5">
                            <div className="min-h-[6.5rem] sm:min-h-[5.5rem]">
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={current.field}
                                        initial={{ opacity: 0, x: 16 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -16 }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                    >
                                        <FormField
                                            control={contactForm.control}
                                            name={current.field}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-slate-700 font-medium text-sm">
                                                        {current.label}
                                                        {current.optional && <span className="text-slate-400 font-normal"> (opcional)</span>}
                                                    </FormLabel>
                                                    <FormControl>
                                                        {current.multiline ? (
                                                            <div className="relative">
                                                                <Icon size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                                                                <Textarea
                                                                    autoFocus={hasInteracted.current}
                                                                    placeholder={current.placeholder}
                                                                    className="rounded-xl border-slate-200 bg-slate-50 pl-10 min-h-[92px] focus-visible:ring-voca-green/40 focus-visible:bg-white"
                                                                    {...field}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="relative">
                                                                <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                                                <Input
                                                                    autoFocus={hasInteracted.current}
                                                                    placeholder={current.placeholder}
                                                                    className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10 focus-visible:ring-voca-green/40 focus-visible:bg-white"
                                                                    {...field}
                                                                />
                                                            </div>
                                                        )}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <div className="flex items-center gap-3">
                                {step > 0 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleBack}
                                        className="h-12 w-12 shrink-0 rounded-xl border-slate-200 text-slate-500 hover:text-slate-700 px-0"
                                    >
                                        <ArrowLeft size={18} />
                                    </Button>
                                )}

                                {isLastStep ? (
                                    <Button
                                        type="submit"
                                        className="rounded-xl w-full h-12 bg-voca-green hover:bg-voca-green/90 font-semibold shadow-md shadow-voca-green/20 transition-all duration-300 hover:shadow-lg hover:shadow-voca-green/30"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <LoadingSpinner />
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                {formButtonText}
                                                <Send size={16} />
                                            </span>
                                        )}
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        onClick={handleNext}
                                        className="rounded-xl w-full h-12 bg-voca-green hover:bg-voca-green/90 font-semibold shadow-md shadow-voca-green/20 transition-all duration-300 hover:shadow-lg hover:shadow-voca-green/30"
                                    >
                                        <span className="flex items-center gap-2">
                                            Próximo
                                            <ArrowRight size={16} />
                                        </span>
                                    </Button>
                                )}
                            </div>

                            <p className="text-center text-xs text-slate-400">
                                Seus dados estão seguros e não serão compartilhados com terceiros.
                            </p>
                        </form>
                    </Form>
                )}
            </CardContent>
        </Card>
    )
}
