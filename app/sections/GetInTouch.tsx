'use client'

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { WhatsappLink } from "@/components/WhatsappLink";
import { cn } from "@/lib/utils";

const reassurances = [
    "Atendimento humano, sem robôs",
    "Demonstração sem compromisso",
    "Resposta rápida do nosso time",
];

export default function GetInTouchSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

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
        <div id="contact" ref={sectionRef} className="relative bg-voca-green py-16 sm:py-24 px-6 overflow-hidden">
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
                <div
                    className={cn(
                        "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
                        visible ? "animate-in fade-in slide-in-from-bottom-6" : "opacity-0"
                    )}
                    style={visible ? { animationDuration: "600ms", animationFillMode: "both" } : undefined}
                >
                    <div className="text-center lg:text-left">
                        <p className="text-sm font-bold tracking-widest text-white/70 uppercase">
                            Fale com a gente
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mt-3">
                            Pronto para transformar a gestão de pessoas da sua empresa?
                        </h2>
                        <p className="text-lg text-white/80 mt-4 max-w-md mx-auto lg:mx-0">
                            Preencha o formulário e nosso time entra em contato para te mostrar o VOCA na prática.
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

                    <div className="max-w-md w-full mx-auto lg:mx-0">
                        <ContactForm
                            title="Fale com um especialista"
                            description="Descubra como o VOCA se encaixa no dia a dia da sua empresa!"
                            buttonText="Enviar"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
