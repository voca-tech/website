'use client'
import { ContactForm } from "@/components/ContactForm";
import { useSearchParams } from 'next/navigation'

export default function Contact() {
    const searchParams = useSearchParams()
    const source = searchParams.get('source')

    return (
        <div className="bg-voca-green text-white">
            <div className="max-w-2xl m-auto py-12 px-4">
                {source === 'get-demo' && (
                    <div className="text-center mb-4">
                        <p className="text-2xl font-bold">Obrigado por concluir a demo do sistema!</p>
                        <p className="text-sm text-slate-300">Para conhecer mais sobre o produto e suas funcionalidades, preencha o formulário abaixo e entraremos em contato o mais breve possível! 😉</p>
                    </div>
                )}

                <ContactForm 
                    title="Falar com um especialista"
                    description="Descubra como o VOCA se encaixa no dia a dia da sua empresa!"
                    buttonText="Enviar"
                />
            </div>
        </div>
    )
}
