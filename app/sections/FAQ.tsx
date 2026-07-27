'use client'

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const faqs = [
    {
        question: "O que é o VOCA?",
        answer: "O VOCA é uma plataforma de DHO (Departamento Humano e Organizacional) completa, que reúne gestão, comunicação e inteligência de dados para ajudar empresas a cuidar melhor das suas pessoas.",
    },
    {
        question: "Quanto tempo leva para implementar o VOCA na minha empresa?",
        answer: "O onboarding é guiado pela nossa equipe, sem meses de configuração até você ver resultado. O tempo exato varia de acordo com o tamanho e a complexidade da empresa, mas o acompanhamento é feito por um time de verdade do início ao fim.",
    },
    {
        question: "Os dados da minha empresa estão seguros?",
        answer: "Sim. Os dados são protegidos e o VOCA opera em conformidade com a legislação brasileira de proteção de dados (LGPD).",
    },
    {
        question: "Preciso de uma equipe técnica para usar a plataforma?",
        answer: "Não. O VOCA foi pensado para ser simples no dia a dia de RH e liderança, e além disso você conta com atendimento humano (sem robôs e sem tickets perdidos) acompanhando sua implementação e uso contínuo.",
    },
    {
        question: "O VOCA serve para empresas de qualquer tamanho?",
        answer: "Sim, a plataforma evolui junto com a sua empresa, da operação local até a expansão para novas unidades ou países.",
    },
    {
        question: "Como funciona a gamificação dentro do VOCA?",
        answer: "A plataforma usa conquistas, rankings e desafios para tornar o engajamento dos colaboradores mais divertido e consistente, incentivando participação genuína em vez de uso obrigatório.",
    },
    {
        question: "Como faço para conhecer o VOCA na prática?",
        answer: "Você pode agendar uma demonstração gratuita com nosso time ou falar direto com um especialista pelo WhatsApp. Os dois botões estão espalhados pelo site.",
    },
];

export default function FAQSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className="relative bg-white py-16 sm:py-24 px-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.3]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
            </div>

            <div className="relative max-w-3xl mx-auto">
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm font-bold tracking-widest text-voca-green uppercase">
                        Dúvidas frequentes
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                        Perguntas que a gente sempre recebe
                    </h2>
                    <p className="text-lg text-slate-500 mt-4">
                        Não achou o que procurava? Fale direto com a gente pelo WhatsApp ou agende uma demonstração.
                    </p>
                </div>

                <div className="flex flex-col gap-3 mt-10">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={faq.question}
                                className={cn(
                                    "rounded-2xl border border-slate-200 bg-white overflow-hidden transition-colors duration-300",
                                    isOpen && "border-voca-green/40",
                                    visible ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
                                )}
                                style={visible ? { animationDelay: `${index * 60}ms`, animationDuration: "500ms", animationFillMode: "both" } : undefined}
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    aria-expanded={isOpen}
                                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                                >
                                    <span className={cn("font-semibold", isOpen ? "text-voca-green" : "text-slate-900")}>
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        size={20}
                                        className={cn(
                                            "shrink-0 text-slate-400 transition-transform duration-300",
                                            isOpen && "rotate-180 text-voca-green"
                                        )}
                                    />
                                </button>

                                <div
                                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                                >
                                    <div className="overflow-hidden">
                                        <p className="text-slate-500 text-sm leading-relaxed px-5 pb-4">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
