'use client'

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    HeartHandshake, Users, LineChart, ShieldCheck,
    Layers, Users2, Sparkles, CalendarCheck, Repeat2,
    Quote, ArrowRight, Play,
    type LucideIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { WhatsappLink } from "@/components/WhatsappLink";
import { ClientLogoMarquee } from "@/components/ClientLogoMarquee";
import { cases } from "@/app/casos-de-sucesso/data";
import { pillars } from "@/app/produto/data";
import { quotes } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], display: "swap" });

interface Value {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
    photo: string;
}

const values: Value[] = [
    {
        icon: HeartHandshake,
        title: "Pessoas em primeiro lugar",
        description: "Construímos tecnologia para gestão de pessoas pensando primeiro nas pessoas, não só nos processos.",
        color: "#007980",
        photo: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=900&q=80",
    },
    {
        icon: Users,
        title: "Tecnologia com atendimento humano",
        description: "Usamos inteligência artificial para gerar insights, mas quem acompanha sua empresa é sempre um time de verdade.",
        color: "#2f6690",
        photo: "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?auto=format&fit=crop&w=900&q=80",
    },
    {
        icon: LineChart,
        title: "Dados a serviço de decisões melhores",
        description: "Acreditamos que boas decisões de gestão de pessoas vêm de dados claros, não de achismo.",
        color: "#798f4f",
        photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    },
    {
        icon: ShieldCheck,
        title: "Segurança e transparência",
        description: "Tratamos os dados que nossos clientes confiam a nós com responsabilidade, em conformidade com a LGPD.",
        color: "#85568a",
        photo: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
    },
];

const founderColors = ["#007980", "#2f6690", "#85568a"];

const founders = [
    {
        name: "Ronaldo Palermo",
        role: "CEO e Co-fundador",
        bio: [
            "Executivo comercial do mercado financeiro por mais de 20 anos.",
            "Liderança de equipes multidisciplinares de mais de 200 pessoas.",
            "MBA em Gestão Estratégica de Pessoas.",
            "Empreendedor há 10 anos, na sua 2ª startup de modelo SaaS.",
        ],
    },
    {
        name: "Cristiano Paranhos",
        role: "COO e Co-fundador",
        bio: [
            "Mais de 15 anos de experiência com analytics para B2B.",
            "Gestão de projetos, negócios e desenvolvimento de produtos.",
            "Empreendedor há 15 anos, na sua 2ª startup de modelo SaaS.",
            "Empreendedor Global no IBM SmartCamp, Califórnia.",
        ],
    },
    {
        name: "Thiago Junqueira",
        role: "CTO e Sócio",
        bio: [
            "Engenheiro de dados, desenvolvedor full stack e arquiteto cloud.",
            "Experiência na gestão e excelência de times ágeis.",
            "Formação em Engenharia de Controle e Automação.",
            "Atua há 5 anos com projetos de tecnologia internacionais.",
        ],
    },
];

const evolutionSteps = [
    { icon: Layers, title: "ERP", description: "Organizou todos os processos da empresa." },
    { icon: Users2, title: "CRM", description: "Organizou a jornada dos clientes." },
    { icon: Sparkles, title: "VOCA", description: "Veio para organizar as pessoas da empresa.", highlight: true },
];

const proofMetrics = [
    { slug: "sp-engenharia", value: "85%", label: "redução no tempo gasto", company: "SP Engenharia" },
    { slug: "credi10-compliance", value: "92%", label: "confiança nos canais de voz", company: "Credi10" },
    { slug: "credi10-treinamentos", value: "-40%", label: "tempo de integração", company: "Credi10" },
    { slug: "woodbridge-pesquisa", value: "95%", label: "taxa de resposta às pesquisas", company: "Woodbridge" },
];

const partnershipSteps = [
    {
        icon: CalendarCheck,
        title: "Kickoff estratégico",
        description: "Começamos entendendo a fundo o momento da sua empresa, antes de configurar qualquer coisa.",
    },
    {
        icon: Users2,
        title: "Onboarding guiado por gente de verdade",
        description: "Nosso time acompanha a implementação de perto, não é só um manual pra você se virar sozinho.",
    },
    {
        icon: Repeat2,
        title: "Revisão trimestral contínua",
        description: "A cada trimestre, revisamos com você o que está funcionando e o que pode melhorar.",
    },
];

const heroMainPhoto = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80";
const heroAccentPhoto = "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=700&q=80";
const resultsPhoto = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=70";
const ctaPhoto = "https://images.unsplash.com/photo-1522071901873-411886a10004?auto=format&fit=crop&w=1600&q=70";

function initials(name: string) {
    return name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
}

function AnimatedStat({ value, className }: { value: string; className?: string }) {
    const ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const el = ref.current;
        const match = value.match(/^(-?)(\d+(?:\.\d+)?)(.*)$/);
        if (!el || !match) return;
        const [, sign, numStr, suffix] = match;
        const target = parseFloat(numStr) * (sign === "-" ? -1 : 1);
        const isInt = Number.isInteger(target);

        gsap.registerPlugin(ScrollTrigger);
        const obj = { val: 0 };
        const render = () => {
            el.textContent = `${isInt ? Math.round(obj.val) : obj.val.toFixed(1)}${suffix}`;
        };

        const ctx = gsap.context(() => {
            const tween = gsap.to(obj, {
                val: target,
                duration: 1.3,
                ease: "power2.out",
                paused: true,
                onUpdate: render,
                onComplete: render,
            });

            ScrollTrigger.create({
                trigger: el,
                start: "top 88%",
                once: true,
                onEnter: () => tween.play(),
            });

            if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
                tween.play();
            }
        });

        return () => ctx.revert();
    }, [value]);

    return <p ref={ref} className={className}>{value.replace(/\d/g, "0")}</p>;
}

function EvolutionTimeline() {
    const rootRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top 80%",
                    end: "bottom 70%",
                    scrub: 0.8,
                },
            });

            timeline.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 3 }, 0);
            timeline.fromTo(
                ".evolution-node",
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, ease: "none", stagger: 1.15, duration: 0.7 },
                0.15
            );
            timeline.fromTo(
                ".evolution-card",
                { opacity: 0, y: 28 },
                { opacity: 1, y: 0, ease: "none", stagger: 1.15, duration: 0.9 },
                0.35
            );
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={rootRef} className="relative">
            <div className="hidden sm:block absolute top-7 left-[16.66%] right-[16.66%] h-0.5 rounded-full bg-white/15">
                <div ref={lineRef} className="h-full w-full origin-left rounded-full bg-teal-300/80" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
                {evolutionSteps.map((step) => (
                    <div key={step.title} className="relative flex flex-col items-center text-center">
                        <span
                            className={cn(
                                "evolution-node relative z-10 flex h-14 w-14 items-center justify-center rounded-full",
                                step.highlight
                                    ? "bg-white text-voca-green shadow-xl"
                                    : "bg-voca-green text-white ring-2 ring-white/25"
                            )}
                            style={step.highlight ? { animation: "pulse-glow 3.5s ease-in-out infinite" } : undefined}
                        >
                            <step.icon size={24} />
                        </span>

                        <div
                            className={cn(
                                "evolution-card mt-6 w-full rounded-2xl p-6",
                                step.highlight
                                    ? "bg-white shadow-xl"
                                    : "bg-white/[0.07] border border-white/15"
                            )}
                        >
                            <p className={cn("font-extrabold text-lg", step.highlight ? "text-voca-green" : "text-white")}>
                                {step.title}
                            </p>
                            <p className={cn("text-sm mt-1.5 leading-relaxed", step.highlight ? "text-slate-500" : "text-white/70")}>
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ValueRow({ value, reversed, index }: { value: Value; reversed: boolean; index: number }) {
    const rowRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const photoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo(
                textRef.current,
                { opacity: 0, x: reversed ? 24 : -24 },
                { opacity: 1, x: 0, ease: "none", scrollTrigger: { trigger: rowRef.current, start: "top 80%", end: "top 40%", scrub: 0.8 } }
            );
            gsap.fromTo(
                photoRef.current,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: rowRef.current, start: "top 75%", end: "top 35%", scrub: 0.8 } }
            );
        }, rowRef);
        return () => ctx.revert();
    }, [reversed]);

    return (
        <div
            ref={rowRef}
            className={cn("flex flex-col lg:items-center gap-10 lg:gap-14", reversed ? "lg:flex-row-reverse" : "lg:flex-row")}
        >
            <div ref={textRef} className="flex-1">
                <span
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                    style={{ backgroundColor: `${value.color}14`, color: value.color }}
                >
                    <value.icon size={14} />
                    Princípio {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4">{value.title}</h3>
                <p className="text-slate-500 mt-4 max-w-md leading-relaxed">{value.description}</p>
            </div>

            <div ref={photoRef} className="relative flex-1 w-full">
                <div
                    className="absolute -bottom-5 -right-5 h-full w-full rounded-3xl"
                    style={{ backgroundColor: `${value.color}22` }}
                />
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                    <Image
                        src={value.photo}
                        alt={value.title}
                        fill
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 55%, ${value.color}55)` }} />
                </div>
            </div>
        </div>
    );
}

export default function SobrePage() {
    const uniqueClientCount = new Set(cases.map((c) => c.company)).size;
    const totalFeatureCount = pillars.reduce((sum, pillar) => sum + pillar.features.length, 0);
    const engeformQuote = quotes.find((q) => q.caseSlug === "engeform");

    return (
        <div className="relative bg-white">
            <div className="relative py-16 sm:py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.3]"
                        style={{
                            backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                        }}
                    />
                    <div
                        className="absolute -top-24 -left-24 w-[26rem] h-[26rem] rounded-full bg-voca-green/10 blur-3xl"
                        style={{ animation: "drift-a 28s ease-in-out infinite" }}
                    />
                </div>

                <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                    <div>
                        <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Sobre o VOCA</p>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mt-3">
                            Cuidamos de pessoas para que elas possam cuidar das empresas
                        </h1>
                        <p className="text-lg text-slate-500 mt-4">
                            O VOCA nasceu para dar voz aos colaboradores e, ao mesmo tempo, entregar aos times de RH e liderança os dados que precisam para agir antes que os problemas cresçam.
                        </p>

                        <div className="flex flex-wrap gap-x-10 gap-y-6 mt-10 pt-8 border-t border-slate-200">
                            <div>
                                <AnimatedStat value={String(uniqueClientCount)} className="text-2xl font-extrabold text-voca-green" />
                                <p className="text-xs text-slate-500 mt-1">empresas reais já usam o VOCA</p>
                            </div>
                            <div>
                                <AnimatedStat value={String(totalFeatureCount)} className="text-2xl font-extrabold text-voca-green" />
                                <p className="text-xs text-slate-500 mt-1">funcionalidades em 4 pilares</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[22rem] sm:h-[28rem]">
                        <div
                            className="absolute -z-10 -top-10 -right-6 w-72 h-72 rounded-full bg-voca-green/15 blur-3xl"
                            style={{ animation: "drift-b 24s ease-in-out infinite" }}
                        />
                        <div className="absolute right-0 top-2 w-[78%] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl rotate-2">
                            <Image src={heroMainPhoto} alt="Time trabalhando em conjunto" fill sizes="40vw" className="object-cover" />
                        </div>
                        <div className="absolute left-0 bottom-2 w-[52%] aspect-square rounded-3xl overflow-hidden shadow-xl -rotate-3 border-4 border-white">
                            <Image src={heroAccentPhoto} alt="Parceria e confiança" fill sizes="25vw" className="object-cover" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-voca-green py-16 sm:py-20 px-6 relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.08] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div className="relative max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-sm font-bold tracking-widest text-white/70 uppercase">Por que o VOCA existe</p>
                        <h2 className={cn(playfair.className, "text-2xl sm:text-4xl italic font-normal text-white mt-3")}>
                            A evolução da gestão dentro das empresas
                        </h2>
                    </div>

                    <EvolutionTimeline />
                </div>
            </div>

            <div className="py-16 sm:py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
                        <p className="text-sm font-bold tracking-widest text-voca-green uppercase">No que acreditamos</p>
                        <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
                            Os princípios por trás da plataforma
                        </h2>
                    </div>

                    <div className="flex flex-col gap-16 sm:gap-24">
                        {values.map((value, index) => (
                            <ValueRow key={value.title} value={value} reversed={index % 2 === 1} index={index} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{ backgroundImage: `url(${resultsPhoto})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, rgba(1,20,22,0.9) 0%, rgba(1,70,74,0.85) 100%)" }}
                />

                <div className="relative py-20 sm:py-28 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center max-w-2xl mx-auto">
                            <p className="text-sm font-bold tracking-widest text-teal-300 uppercase">Resultados reais</p>
                            <h2 className={cn(playfair.className, "text-3xl sm:text-5xl italic font-normal text-white mt-3")}>
                                O impacto em números de quem já usa
                            </h2>
                            <p className="text-white/70 mt-4">
                                Hoje já são {uniqueClientCount} empresas de setores diferentes confiando o dia a dia de pessoas ao VOCA.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                            {proofMetrics.map((metric) => (
                                <Link
                                    key={metric.slug}
                                    href={`/casos-de-sucesso#${metric.slug}`}
                                    className="group rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
                                >
                                    <AnimatedStat value={metric.value} className="text-3xl font-extrabold text-white" />
                                    <p className="text-xs text-white/60 mt-2 leading-snug">{metric.label}</p>
                                    <p className="text-[10px] font-bold text-teal-300 mt-3 group-hover:underline underline-offset-2">
                                        {metric.company}
                                    </p>
                                </Link>
                            ))}
                        </div>

                        {engeformQuote && (
                            <div className="max-w-2xl mx-auto mt-10 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-6 flex gap-4 items-start">
                                <Quote size={26} className="shrink-0 text-teal-300/70 mt-1" />
                                <div>
                                    <p className="text-white italic leading-relaxed">{engeformQuote.text}</p>
                                    <div className="flex items-center gap-2.5 mt-4">
                                        <Avatar className="h-9 w-9 ring-2 ring-white/20">
                                            <AvatarImage src={engeformQuote.avatar} />
                                            <AvatarFallback className="text-xs text-voca-green font-bold bg-white">
                                                {initials(engeformQuote.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <p className="text-xs text-white/70">
                                            <span className="font-bold text-white">{engeformQuote.name}</span> · {engeformQuote.role} · {engeformQuote.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="text-center mt-8">
                            <Link href="/casos-de-sucesso" className="group inline-flex items-center gap-1.5 text-sm font-bold text-teal-300">
                                Ver todos os cases de sucesso
                                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-14 sm:py-16 px-6 bg-white">
                <p className="text-center text-xs font-bold tracking-widest text-slate-400 uppercase mb-6">
                    Empresas que já confiam no VOCA
                </p>
                <ClientLogoMarquee />
            </div>

            <div className="py-16 sm:py-24 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto">
                        <p className="text-sm font-bold tracking-widest text-voca-green uppercase">O que o VOCA entrega</p>
                        <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
                            Uma plataforma, {totalFeatureCount} funcionalidades reais
                        </h2>
                        <p className="text-slate-500 mt-4">
                            Tudo organizado em 4 pilares, pra cada time encontrar exatamente o que precisa.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
                        {pillars.map((pillar) => (
                            <Link
                                key={pillar.id}
                                href={`/produto#${pillar.id}`}
                                className="group relative overflow-hidden rounded-3xl p-8 min-h-[15rem] flex flex-col justify-end transition-transform duration-300 hover:-translate-y-1"
                                style={{ background: `linear-gradient(135deg, ${pillar.color} 0%, ${pillar.color}cc 100%)` }}
                            >
                                <pillar.icon
                                    size={130}
                                    strokeWidth={1}
                                    className="absolute -right-6 -top-6 text-white opacity-[0.15] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                                />
                                <div
                                    className="absolute inset-0 opacity-[0.08] pointer-events-none"
                                    style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "16px 16px" }}
                                />
                                <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white mb-4">
                                    <pillar.icon size={20} />
                                </div>
                                <h3 className="relative text-xl font-extrabold text-white">{pillar.title}</h3>
                                <p className="relative text-sm text-white/80 mt-2 leading-relaxed max-w-sm">{pillar.description}</p>
                                <span className="relative inline-flex items-center gap-1.5 text-xs font-bold text-white mt-4 group-hover:gap-2.5 transition-all">
                                    {pillar.features.length} funcionalidades
                                    <ArrowRight size={12} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-16 sm:py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto">
                        <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Como é ser cliente VOCA</p>
                        <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
                            Parceria de verdade, não só um login
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                        {partnershipSteps.map((step, index) => (
                            <div key={step.title} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6">
                                <span className="absolute -top-3 -right-1 text-8xl font-black text-slate-50 select-none pointer-events-none">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-voca-green/10 text-voca-green mb-4">
                                    <step.icon size={20} />
                                </div>
                                <h3 className="relative font-bold text-slate-900">{step.title}</h3>
                                <p className="relative text-sm text-slate-500 mt-2 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-16 sm:py-24 px-6 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto">
                        <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Quem faz</p>
                        <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
                            Time executivo
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                        {founders.map((founder, i) => (
                            <div
                                key={founder.name}
                                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="h-2" style={{ backgroundColor: founderColors[i] }} />
                                <div className="p-6">
                                    <Avatar className="h-14 w-14 mb-4">
                                        <AvatarFallback
                                            className="font-bold text-lg"
                                            style={{ backgroundColor: `${founderColors[i]}1A`, color: founderColors[i] }}
                                        >
                                            {initials(founder.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <h3 className={cn(playfair.className, "italic text-xl font-bold text-slate-900")}>{founder.name}</h3>
                                    <p className="text-sm font-semibold mt-0.5" style={{ color: founderColors[i] }}>{founder.role}</p>
                                    <ul className="mt-3 flex flex-col gap-1.5">
                                        {founder.bio.map((line) => (
                                            <li key={line} className="text-xs text-slate-500 flex gap-2">
                                                <span style={{ color: founderColors[i] }}>·</span>
                                                {line}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-16 sm:py-20 px-6 bg-white">
                <a
                    href="/#video"
                    className="group relative max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-8 rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                    <div
                        className="relative w-full sm:w-64 shrink-0 aspect-video rounded-2xl overflow-hidden shadow-lg"
                        style={{ background: "linear-gradient(135deg, #012e31 0%, #016b72 100%)" }}
                    >
                        <div
                            className="absolute inset-0 opacity-[0.15] pointer-events-none"
                            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-voca-green shadow-xl transition-transform duration-300 group-hover:scale-110">
                                <Play size={22} className="ml-0.5" fill="currentColor" />
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                        <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Conheça o VOCA</p>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                            Assista ao vídeo institucional
                        </h3>
                        <p className="text-slate-500 mt-2 max-w-md mx-auto sm:mx-0">
                            Veja em poucos minutos a história e o propósito por trás da plataforma que você acabou de conhecer.
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-voca-green mt-4 group-hover:gap-2.5 transition-all">
                            Assistir agora
                            <ArrowRight size={14} />
                        </span>
                    </div>
                </a>
            </div>

            <div className="relative overflow-hidden py-20 sm:py-24 px-6">
                <div
                    className="absolute inset-0"
                    style={{ backgroundImage: `url(${ctaPhoto})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, rgba(1,46,49,0.92) 0%, rgba(1,107,114,0.88) 100%)" }}
                />
                <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />
                <div className="relative max-w-2xl mx-auto text-center">
                    <p className="text-white font-bold text-lg">
                        Conhece a empresa. Agora veja a plataforma de perto.
                    </p>
                    <Link
                        href="/produto"
                        className="group inline-flex items-center gap-1.5 text-sm font-bold text-teal-300 mt-2"
                    >
                        Explore os 4 pilares do produto
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>

                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 mt-8">
                        <Link href="/contact">
                            <Button className="bg-white text-voca-green hover:bg-white/90 rounded-md px-6 h-12 text-base font-semibold">
                                Agendar demonstração
                            </Button>
                        </Link>
                        <WhatsappLink
                            variant="text"
                            className="font-semibold text-white hover:underline underline-offset-4"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
