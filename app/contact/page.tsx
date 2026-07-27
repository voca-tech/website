'use client'
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { useSearchParams } from 'next/navigation'
import { ContactForm } from "@/components/ContactForm";
import { WhatsappLink } from "@/components/WhatsappLink";
import OurClientsSection from "../sections/OurClients";

const reassurances = [
    "Atendimento humano, sem robôs",
    "Demonstração sem compromisso",
    "Resposta rápida do nosso time",
];

export default function Contact() {
    const searchParams = useSearchParams()
    const source = searchParams.get('source')
    const message = searchParams.get('message')

    const copy = source === 'get-demo'
        ? {
            eyebrow: "Quase lá",
            title: "Obrigado por concluir a demo do sistema!",
            description: "Para conhecer mais sobre o produto e suas funcionalidades, preencha o formulário abaixo e entraremos em contato o mais breve possível 😉",
        }
        : source === 'other-challenge'
            ? {
                eyebrow: "Recebemos sua mensagem",
                title: "Conte pra gente o seu desafio!",
                description: "Recebemos o que você descreveu. Preencha seus dados abaixo que nosso time entra em contato.",
            }
            : {
                eyebrow: "Fale com a gente",
                title: "Vamos mostrar como o VOCA se encaixa no dia a dia da sua empresa",
                description: "Preencha o formulário e nosso time entra em contato para agendar sua demonstração.",
            };

    return (
        <div className="bg-voca-green">
            <div className="relative py-16 sm:py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.15]"
                        style={{
                            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                        }}
                    />
                    <div
                        className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full blur-3xl"
                        style={{ backgroundColor: "rgba(255,255,255,0.08)", animation: "drift-a 24s ease-in-out infinite" }}
                    />
                    <div
                        className="absolute -bottom-28 -right-16 w-[26rem] h-[26rem] rounded-full blur-3xl"
                        style={{ backgroundColor: "rgba(255,255,255,0.06)", animation: "drift-b 28s ease-in-out infinite" }}
                    />
                </div>

                <div className="relative max-w-6xl mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors mb-10">
                        <ArrowLeft size={16} />
                        Voltar para o site
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <p className="text-sm font-bold tracking-widest text-white/70 uppercase">
                                {copy.eyebrow}
                            </p>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mt-3">
                                {copy.title}
                            </h1>
                            <p className="text-lg text-white/80 mt-4 max-w-md mx-auto lg:mx-0">
                                {copy.description}
                            </p>

                            <ul className="flex flex-col gap-3 mt-6 items-center lg:items-start">
                                {reassurances.map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-white/90 text-sm font-medium">
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 shrink-0">
                                            <Check size={12} strokeWidth={3} />
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 flex justify-center lg:justify-start">
                                <WhatsappLink />
                            </div>
                        </div>

                        <div className="max-w-md w-full mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <ContactForm
                                title="Fale com um especialista"
                                description="Descubra como o VOCA se encaixa no dia a dia da sua empresa!"
                                buttonText="Enviar"
                                defaultMessage={message || undefined}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <OurClientsSection />
        </div>
    )
}
