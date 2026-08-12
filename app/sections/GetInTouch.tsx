'use client'

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CalendarCheck, Headphones, Zap, type LucideIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactForm } from "@/components/ContactForm";
import { WhatsappLink } from "@/components/WhatsappLink";

const reassurances: { icon: LucideIcon; text: string }[] = [
    { icon: Headphones, text: "Atendimento humano, sem robôs" },
    { icon: CalendarCheck, text: "Demonstração sem compromisso" },
    { icon: Zap, text: "Resposta rápida do nosso time" },
];

export default function GetInTouchSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo(
                revealRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        end: "top 35%",
                        scrub: 0.8,
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <div
            id="contact"
            ref={sectionRef}
            className="relative py-20 sm:py-28 px-6 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #012e31 0%, #016b72 100%)" }}
        >
            <Image
                src="/voca-symbol.png"
                alt=""
                width={320}
                height={394}
                aria-hidden="true"
                className="absolute -left-14 -bottom-20 opacity-[0.06] brightness-0 invert select-none pointer-events-none"
            />
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.12]"
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
                    style={{ backgroundColor: "rgba(45,212,191,0.14)", animation: "drift-b 28s ease-in-out infinite" }}
                />
            </div>

            <div className="relative max-w-6xl mx-auto">
                <div
                    ref={revealRef}
                    className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 items-center"
                >
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                            Pronto para transformar a gestão de pessoas na sua empresa?
                        </h2>
                        <p className="text-lg text-white/70 mt-4 max-w-md mx-auto lg:mx-0">
                            Preencha o formulário e entraremos em contato para te mostrar o VOCA na prática.
                        </p>

                        <ul className="flex flex-col gap-3.5 mt-8 items-center lg:items-start">
                            {reassurances.map(({ icon: Icon, text }) => (
                                <li key={text} className="flex items-center gap-3 text-white/90 text-sm font-medium">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/10 shrink-0 text-teal-300">
                                        <Icon size={16} />
                                    </span>
                                    {text}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-9 flex justify-center lg:justify-start">
                            <WhatsappLink />
                        </div>
                    </div>

                    <div className="relative max-w-md w-full mx-auto lg:mx-0">
                        <div
                            className="absolute -inset-6 rounded-[2.5rem] opacity-70 blur-2xl pointer-events-none"
                            style={{ background: "radial-gradient(circle, rgba(45,212,191,0.25), transparent 70%)" }}
                        />
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
