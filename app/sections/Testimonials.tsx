'use client'

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { WhatsappLink } from "@/components/WhatsappLink";

type Testimonial = {
    id: number;
    name: string;
    role: string;
    avatar: string;
    logo?: string;
    testimonial: string;
};

const testimonials: Testimonial[] = [
    { id: 3, name: 'Cristiano', role: 'Gestor de RH da Belas Artes', avatar: '/avatars/ba-cristiano.jpg', logo: '/clients/belasartes.png', testimonial: 'O VOCA é uma ferramenta muito importante para fortalecer a comunicação no ambiente corporativo. Não há dúvidas que tem ajudado muito o RH.' },
    { id: 5, name: 'André', role: 'CEO na Engeform', avatar: '/avatars/engeform-andre.png', testimonial: 'O VOCA nos ajudou de forma simples a resolver problemas complexos.' },
    { id: 6, name: 'Erika', role: 'Coordenadora de RH da Credi10', avatar: '/avatars/credi10-erika.jpg', logo: '/clients/credi10.png', testimonial: 'O VOCA é mais do que um sistema, é a voz dos nossos colaboradores que nos traz ideias, feedbacks e engajamento entre todos.' },
    { id: 8, name: 'Mauricio', role: 'Head de Pessoas e Cultura na Akaer', avatar: '/avatars/akaer-mauricio.jpg', logo: '/clients/akaer.png', testimonial: 'O VOCA se destaca como uma ferramenta que vai além do convencional, promovendo uma cultura de inclusão e participação ativa. Sua contribuição para a melhoria da experiência do colaborador é evidente.' },
];

export default function TestimonialsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".testimonial-card",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        end: "top 30%",
                        scrub: 0.8,
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <div id="testimonials" ref={sectionRef} className="relative bg-gradient-to-b from-[#012e31] to-[#016b72] py-16 sm:py-24 px-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <Image
                    src="/voca-symbol.png"
                    alt=""
                    width={260}
                    height={320}
                    className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-8 opacity-[0.08] brightness-0 invert select-none"
                />
            </div>

            <div className="relative max-w-6xl mx-auto">
                <div className="text-center max-w-2xl mx-auto">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest text-white uppercase backdrop-blur-sm">
                        Depoimentos
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">
                        Quem usa, recomenda
                    </h2>
                    <p className="text-lg text-white/70 mt-4">
                        Clientes que fazem do VOCA uma extensão de suas empresas
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    {testimonials.map((user) => (
                        <div
                            key={user.id}
                            className="group testimonial-card rounded-2xl bg-white p-6 shadow-2xl shadow-black/20 flex flex-col gap-4 text-left transition-transform duration-300 hover:-translate-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-voca-green/10 transition-colors duration-300 group-hover:bg-voca-green">
                                    <Image
                                        src="/voca-symbol.png"
                                        alt=""
                                        width={16}
                                        height={20}
                                        className="transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                                    />
                                </div>
                                {user.logo && (
                                    <Image
                                        src={user.logo}
                                        alt={user.role}
                                        width={32}
                                        height={32}
                                        className="object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                                    />
                                )}
                            </div>

                            <p className="text-slate-600 text-sm leading-relaxed flex-1">{user.testimonial}</p>

                            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
                                    <AvatarImage src={user.avatar} />
                                </Avatar>
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                                    <p className="text-slate-500 text-xs">{user.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 mt-14">
                    <Link href="/casos-de-sucesso">
                        <Button className="bg-white text-voca-green hover:bg-white/90 rounded-md px-6 h-12 text-base font-semibold">
                            Ver todos os cases
                            <ArrowRight className="ml-2" size={16} />
                        </Button>
                    </Link>
                    <WhatsappLink />
                </div>
            </div>
        </div>
    )
}
