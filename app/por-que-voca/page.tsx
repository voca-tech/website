'use client'

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, X, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappLink } from "@/components/WhatsappLink";
import { ShieldCheckIcon } from "@/components/ui/shield-check";
import { ClientLogoMarquee } from "@/components/ClientLogoMarquee";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { quotes } from "@/lib/testimonials";
import { PERCENT_SAVINGS } from "@/app/roi/constants";
import { reasons, whyVocaStats as stats, type Reason, type AnimatedIconHandle } from "./data";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], display: "swap" });

const featuredQuote = quotes.find((q) => q.name === "Walter Rodrigues")!;

const comparison = [
    { label: "Suporte pós-venda", voca: "Atendimento reconhecido pelos clientes, inclusive em cases de migração.", others: "Reclamações recorrentes de lentidão, acesso e burocracia." },
    { label: "Integração com DP", voca: "Senior, Microsoft, Synergy e SSO Google, com API para outros ERPs.", others: "Nativa com foco maior no parceiro atual do fornecedor." },
    { label: "Experiência do colaborador", voca: "Método VOCA de engajamento contínuo, com jornada integrada e intuitiva.", others: "Interface corporativa e fria, com usabilidade difícil na web e no app." },
    { label: "Flexibilidade de roadmap", voca: "Parceiro de inovação, aberto a customizações estratégicas.", others: "Burocracia corporativa, processo longo e que raramente acontece." },
    { label: "Estabilidade de relacionamento", voca: "100% humano, dedicado e customizado. Você fala com quem decide.", others: "Engessado e frio, com chatbots e processos sem olhar humano." },
    { label: "Produto", voca: "DHO na palma da mão: 21 funcionalidades em 1 plataforma.", others: "Normalmente, foco maior em algumas funcionalidades específicas." },
];

function PersonAvatar({ size = 32, color }: { size?: number; color: string }) {
    return (
        <div
            className="shrink-0 rounded-full flex items-center justify-center"
            style={{ width: size, height: size, backgroundColor: `${color}1A`, color }}
        >
            <User size={size * 0.55} />
        </div>
    );
}

function HumanChatMockup({ color }: { color: string }) {
    return (
        <div className="relative rounded-2xl border border-slate-200 bg-white shadow-xl p-5 w-full max-w-sm">
            <div className="flex items-center gap-1.5 pb-3 border-b border-slate-100">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="ml-2 text-xs font-medium text-slate-400">Chat com o time VOCA</span>
            </div>
            <div className="flex flex-col gap-3 mt-4">
                <div className="self-end max-w-[75%] rounded-2xl rounded-br-sm bg-slate-100 px-3 py-2 text-sm text-slate-600">
                    Consigo falar com alguém de verdade?
                </div>
                <div className="flex items-start gap-2 max-w-[85%]">
                    <PersonAvatar size={32} color={color} />
                    <div className="rounded-2xl rounded-bl-sm px-3 py-2 text-sm text-slate-700" style={{ backgroundColor: `${color}14` }}>
                        Claro! Sou eu mesma :) Como posso ajudar?
                        <span className="block mt-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color }}>
                            Humano · Time VOCA
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function OnboardingMockup({ color }: { color: string }) {
    const steps = [
        { label: "Alinhamento estratégico", done: true },
        { label: "Capacitação dos embaixadores", done: true },
        { label: "Onboarding (Go Live)", done: true },
        { label: "Primeiros dados gerados", done: false },
    ];
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl p-5 w-full max-w-sm">
            <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-900">Seu onboarding</p>
                <span className="text-xs font-bold" style={{ color }}>60%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 mt-2 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: "60%", backgroundColor: color }} />
            </div>
            <div className="flex flex-col gap-2.5 mt-4">
                {steps.map((step) => (
                    <div key={step.label} className="flex items-center gap-2 text-sm">
                        <span
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                            style={step.done ? { backgroundColor: color, color: "white" } : { backgroundColor: "#f1f5f9", color: "#cbd5e1" }}
                        >
                            <Check size={12} />
                        </span>
                        <span className={step.done ? "text-slate-700" : "text-slate-400"}>{step.label}</span>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-slate-100">
                <PersonAvatar size={28} color={color} />
                <p className="text-xs text-slate-500">Especialista dedicado te acompanha nessa etapa</p>
            </div>
        </div>
    );
}

function SecurityMockup({ color }: { color: string }) {
    const items = ["Criptografia de dados", "Conformidade com a LGPD", "Controle de acesso por perfil"];
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl p-5 w-full max-w-sm">
            <div className="flex items-center gap-2">
                <ShieldCheckIcon size={18} className="text-current" />
                <p className="text-sm font-bold text-slate-900">Conformidade e segurança</p>
            </div>
            <div className="flex flex-col gap-3.5 mt-4">
                {items.map((item) => (
                    <div key={item} className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{item}</span>
                        <span className="flex h-5 w-9 items-center rounded-full px-0.5" style={{ backgroundColor: color }}>
                            <span className="h-4 w-4 rounded-full bg-white ml-auto" />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function GrowthMockup({ color }: { color: string }) {
    const scopes = ["Local", "Nacional", "Internacional"];
    const bars = [40, 65, 90];
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl p-5 w-full max-w-sm">
            <p className="text-sm font-bold text-slate-900 mb-4">Sua operação, em qualquer escala</p>
            <div className="flex gap-2">
                {scopes.map((label, i) => (
                    <div
                        key={label}
                        className="flex-1 rounded-xl border p-2.5 text-center"
                        style={i === 1 ? { borderColor: color, backgroundColor: `${color}0D` } : { borderColor: "#e2e8f0" }}
                    >
                        <p className="text-xs font-bold" style={{ color: i === 1 ? color : "#94a3b8" }}>{label}</p>
                    </div>
                ))}
            </div>
            <div className="flex items-end gap-2 h-20 mt-5">
                {bars.map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-lg" style={{ height: `${h}%`, backgroundColor: `${color}${i === bars.length - 1 ? "" : "B3"}` }} />
                ))}
            </div>
        </div>
    );
}

const mockups = [HumanChatMockup, OnboardingMockup, SecurityMockup, GrowthMockup];

function FeatureRow({ reason, mockup: Mockup, reversed, index }: { reason: Reason; mockup: (props: { color: string }) => JSX.Element; reversed: boolean; index: number }) {
    const rowRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const mockupRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<AnimatedIconHandle | null>(null);
    const Icon = reason.icon;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo(
                textRef.current,
                { opacity: 0, x: reversed ? 24 : -24 },
                {
                    opacity: 1,
                    x: 0,
                    ease: "none",
                    scrollTrigger: { trigger: rowRef.current, start: "top 80%", end: "top 40%", scrub: 0.8 },
                }
            );
            gsap.fromTo(
                mockupRef.current,
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "none",
                    scrollTrigger: { trigger: rowRef.current, start: "top 75%", end: "top 35%", scrub: 0.8 },
                }
            );
            ScrollTrigger.create({
                trigger: rowRef.current,
                start: "top 70%",
                onEnter: () => iconRef.current?.startAnimation(),
                onLeaveBack: () => iconRef.current?.stopAnimation(),
            });
        }, rowRef);
        return () => ctx.revert();
    }, [reversed]);

    return (
        <div
            ref={rowRef}
            className={cn(
                "flex flex-col lg:items-center gap-10 lg:gap-16",
                reversed ? "lg:flex-row-reverse" : "lg:flex-row"
            )}
        >
            <div ref={textRef} className="flex-1">
                <span
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                    style={{ backgroundColor: `${reason.color}14`, color: reason.color }}
                >
                    <Icon ref={iconRef} size={14} />
                    Motivo {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4">{reason.title}</h2>
                <p className="text-slate-500 mt-4 max-w-md">{reason.description}</p>
                {reason.href && (
                    <Link
                        href={reason.href}
                        className="inline-flex items-center gap-1.5 text-sm font-bold mt-4 group"
                        style={{ color: reason.color }}
                    >
                        {reason.linkLabel ?? "Saiba mais"}
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                )}
            </div>

            <div ref={mockupRef} className="relative flex-1 flex justify-center">
                <div
                    className="absolute w-56 h-56 rounded-full blur-3xl opacity-[0.18] pointer-events-none"
                    style={{ backgroundColor: reason.color }}
                />
                <Mockup color={reason.color} />
            </div>
        </div>
    );
}

function RadialStat({ percent, color, size = 56 }: { percent: number; color: string; size?: number }) {
    const stroke = 6;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    return (
        <div className="relative shrink-0" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - percent / 100)}
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-slate-900">
                {percent}%
            </span>
        </div>
    );
}

function CountUpStat({ target, suffix, className = "text-4xl sm:text-5xl font-extrabold text-white" }: { target: number; suffix: string; className?: string }) {
    const ref = useRef<HTMLParagraphElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const el = ref.current;
        const wrapper = wrapperRef.current;
        if (!el || !wrapper) return;

        const counter = { value: 0 };
        const render = () => {
            el.textContent = Math.round(counter.value) + suffix;
        };

        const ctx = gsap.context(() => {
            gsap.to(counter, {
                value: target,
                ease: "none",
                onUpdate: render,
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top 85%",
                    end: "top 45%",
                    scrub: 0.8,
                    onRefresh: (self) => {
                        counter.value = self.progress * target;
                        render();
                    },
                },
            });
        }, wrapper);

        return () => ctx.revert();
    }, [target, suffix]);

    return (
        <div ref={wrapperRef}>
            <p ref={ref} className={className}>0{suffix}</p>
        </div>
    );
}

const noPromiseLines: { before: string; value: string; after: string; align: string }[] = [
    { before: "Hoje, ", value: "62%", after: " dos colaboradores usam a plataforma todos os dias.", align: "text-left" },
    { before: "", value: "-40 horas", after: " por mês no tempo gasto com processos manuais de DHO.", align: "text-right" },
    { before: "Onboarding ", value: "54%", after: " mais eficiente.", align: "text-left" },
    { before: "", value: "100%", after: " de conformidade em auditorias externas e internas.", align: "text-right" },
];

function NoPromiseSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".no-promise-line",
                { opacity: 0, y: 36 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.3,
                    ease: "none",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "bottom 55%", scrub: 0.8 },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="py-24 sm:py-32 px-6 bg-white">
            <p className="text-2xl sm:text-4xl font-extrabold tracking-wide text-voca-green uppercase text-center mb-14 sm:mb-20">
                Não é promessa
            </p>

            <div className="max-w-3xl mx-auto flex flex-col gap-10 sm:gap-12">
                {noPromiseLines.map((line, i) => (
                    <p
                        key={i}
                        className={cn(
                            playfair.className,
                            "no-promise-line italic text-2xl sm:text-4xl text-slate-800 leading-snug",
                            line.align
                        )}
                    >
                        {line.before}
                        <span className="font-sans not-italic font-extrabold text-voca-green">{line.value}</span>
                        {line.after}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default function PorQueVocaPage() {
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
                </div>

                <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <h1 className="voca-title text-3xl sm:text-5xl font-extrabold leading-tight">
                            Tecnologia forte. Time de verdade.
                        </h1>
                        <p className="text-lg text-slate-500 mt-5">
                            A tecnologia é só metade da equação. A outra metade é um time que se importa de verdade com o que acontece depois da implementação, todos os dias, não só no lançamento.
                        </p>
                    </div>

                    <div className="relative mt-6 lg:mt-0 max-w-sm mx-auto w-full">
                        <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/5]">
                            <Image
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                                alt=""
                                fill
                                sizes="(max-width: 1024px) 100vw, 400px"
                                className="object-cover"
                            />
                        </div>

                        <div className="absolute -bottom-7 -left-6 sm:-left-10 rounded-2xl border border-slate-200 bg-white shadow-xl p-4 flex items-center gap-3">
                            <RadialStat percent={47} color="#007980" />
                            <div>
                                <p className="text-xs text-slate-500 leading-snug max-w-[9.5rem]">
                                    menos chance de procurar outro emprego, entre colaboradores conectados com a cultura
                                </p>
                            </div>
                        </div>

                        <div className="absolute -top-5 -right-3 sm:-right-8 rounded-2xl border border-slate-200 bg-white shadow-lg px-4 py-3">
                            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-2">
                                Empresas que confiam
                            </p>
                            <div className="flex items-center gap-2.5">
                                <Image src="/clients/akaer.png" alt="Akaer" width={36} height={36} className="object-contain grayscale opacity-70" />
                                <Image src="/clients/credi10.png" alt="Credi10" width={36} height={36} className="object-contain grayscale opacity-70" />
                                <Image src="/clients/belasartes.png" alt="Belas Artes" width={36} height={36} className="object-contain grayscale opacity-70" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative max-w-6xl mx-auto px-6">
                <p className="text-center text-xs font-bold tracking-widest text-slate-400 uppercase mb-6">
                    Times que já confiam no VOCA
                </p>
                <ClientLogoMarquee />
            </div>

            <div className="relative max-w-5xl mx-auto px-6 py-16 sm:py-20 flex flex-col gap-20 sm:gap-28">
                {reasons.map((reason, i) => (
                    <FeatureRow key={reason.title} reason={reason} mockup={mockups[i]} reversed={i % 2 === 1} index={i} />
                ))}
            </div>

            <div className="max-w-2xl mx-auto px-6 pb-16 sm:pb-20">
                <div className="relative rounded-[2rem] border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
                    <p className="text-xl sm:text-2xl font-medium text-slate-700 leading-relaxed">
                        &ldquo;{featuredQuote.text}&rdquo;
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <Avatar className="h-11 w-11 ring-2 ring-white shadow-sm">
                            <AvatarImage src={featuredQuote.avatar} />
                            <AvatarFallback className="bg-voca-green/10 text-voca-green text-xs font-bold">
                                {featuredQuote.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                            <p className="font-bold text-slate-900 text-sm">{featuredQuote.name}</p>
                            <p className="text-slate-500 text-xs">{featuredQuote.role} · {featuredQuote.company}</p>
                        </div>
                        {featuredQuote.logo && (
                            <Image
                                src={featuredQuote.logo}
                                alt={featuredQuote.company}
                                width={200}
                                height={60}
                                className="h-7 w-auto max-w-[7rem] object-contain grayscale opacity-60 ml-2"
                            />
                        )}
                    </div>
                </div>
            </div>

            <div data-nav-dark className="relative py-16 sm:py-20 px-6 overflow-hidden" style={{ background: "linear-gradient(135deg, #012e31 0%, #016b72 100%)" }}>
                <Image
                    src="/voca-symbol.png"
                    alt=""
                    width={300}
                    height={369}
                    aria-hidden="true"
                    className="absolute -left-10 -bottom-16 opacity-[0.06] brightness-0 invert select-none pointer-events-none"
                />
                <div
                    className="absolute inset-0 opacity-[0.08] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />

                <div className="relative max-w-4xl mx-auto text-center">
                    <h2 className="voca-title-invert text-2xl sm:text-3xl font-extrabold">
                        Comunicação ruim custa caro
                    </h2>
                </div>

                <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                    {stats.map((stat) => (
                        <div key={stat.label} className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
                            <CountUpStat target={Number(stat.value)} suffix={stat.suffix} />
                            <p className="text-sm text-white/70 mt-3 leading-relaxed">{stat.label}</p>
                            {stat.source && <p className="text-xs text-white/40 mt-3">Fonte: {stat.source}</p>}
                        </div>
                    ))}
                </div>
            </div>

            <NoPromiseSection />

            <div className="py-16 sm:py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="voca-title text-3xl font-extrabold">
                            VOCA vs. ferramentas tradicionais
                        </h2>
                        <p className="text-slate-500 mt-4">
                            Clientes escolhem o VOCA, inclusive migrando de outras plataformas do mercado.
                        </p>
                    </div>

                    <div
                        className="relative mt-10 rounded-[2.5rem] border border-white/60 bg-white/40 shadow-xl overflow-hidden"
                        style={{ backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)" }}
                    >
                        <div
                            className="absolute inset-0 opacity-[0.3] pointer-events-none"
                            style={{
                                backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                                backgroundSize: "28px 28px",
                            }}
                        />
                        <div
                            className="absolute inset-x-0 top-0 h-px pointer-events-none"
                            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)" }}
                        />

                        <div className="relative p-6 sm:p-10">
                            <div className="hidden sm:grid grid-cols-[1.1fr_1fr_1fr] gap-6 pb-5">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Critério</p>
                                <div className="flex items-center gap-2">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-voca-green text-white">
                                        <Check size={11} />
                                    </span>
                                    <p className="text-xs font-bold uppercase tracking-widest text-voca-green">Com o VOCA</p>
                                </div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Ferramentas tradicionais</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                {comparison.map((row) => (
                                    <div
                                        key={row.label}
                                        className="grid grid-cols-1 sm:grid-cols-[1.1fr_1fr_1fr] gap-2 sm:gap-6 sm:items-center"
                                    >
                                        <p className="text-sm font-bold text-slate-900">{row.label}</p>
                                        <div className="flex items-center gap-2.5 rounded-xl bg-voca-green/[0.06] border border-voca-green/10 px-3.5 py-2.5">
                                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-voca-green text-white">
                                                <Check size={11} />
                                            </span>
                                            <p className="text-sm font-semibold text-slate-800">{row.voca}</p>
                                        </div>
                                        <p className="flex items-start gap-2 text-sm text-slate-400 px-3.5">
                                            <X size={15} className="shrink-0 mt-0.5 text-slate-300" />
                                            {row.others}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="relative flex justify-center pt-8">
                        <Link
                            href="/casos-de-sucesso"
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-voca-green group"
                        >
                            Veja isso em resultados reais nos cases de sucesso
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="py-16 sm:py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
                    <div className="relative order-2 lg:order-1 max-w-sm mx-auto lg:max-w-none w-full">
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] lg:-rotate-2">
                            <Image
                                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80"
                                alt=""
                                fill
                                sizes="(max-width: 1024px) 100vw, 500px"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 text-center lg:text-left">
                        <p className={cn(playfair.className, "italic text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-snug")}>
                            &ldquo;Tecnologia sem gente é só mais uma ferramenta parada na prateleira.&rdquo;
                        </p>
                        <p className="text-slate-500 mt-6 max-w-md mx-auto lg:mx-0">
                            Por isso, cada implementação do VOCA tem um time de verdade do outro lado da tela, do primeiro dia em diante e em cada decisão que a sua empresa toma depois.
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-6 pb-16">
                <div className="max-w-4xl mx-auto relative rounded-[2.5rem] border border-white/60 bg-gradient-to-br from-teal-50 via-white to-emerald-50/60 shadow-xl overflow-hidden">
                    <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-voca-green/10 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-teal-300/20 blur-3xl pointer-events-none" />

                    <div className="relative flex flex-col lg:flex-row items-center gap-10 p-8 sm:p-12">
                        <div className="flex-1 text-center lg:text-left">
                            <h2 className="voca-title text-2xl sm:text-3xl font-extrabold max-w-md mx-auto lg:mx-0">
                                Veja o retorno em números, não em promessas
                            </h2>
                            <p className="text-slate-500 mt-3 max-w-md mx-auto lg:mx-0">
                                Em menos de um minuto, simule a economia da sua empresa com base em clientes reais que migraram pra VOCA.
                            </p>
                            <Link href="/roi" className="inline-flex mt-6">
                                <span className="group inline-flex items-center gap-3 rounded-full bg-voca-green text-white pl-6 pr-2 py-2 text-base font-semibold shadow-lg shadow-voca-green/25 transition-shadow hover:shadow-xl">
                                    Simular agora
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-voca-green transition-transform group-hover:translate-x-1">
                                        <ArrowRight size={16} />
                                    </span>
                                </span>
                            </Link>
                        </div>

                        <div className="shrink-0 rounded-2xl border border-white bg-white/80 shadow-lg p-5 w-full max-w-[15rem]">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Economia acumulada</p>
                            <div className="flex items-end gap-2 h-20">
                                {[35, 55, 75, 100].map((height, i) => (
                                    <div
                                        key={height}
                                        className="flex-1 rounded-t-lg bg-voca-green"
                                        style={{ height: `${height}%`, opacity: 0.4 + i * 0.2 }}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-400 mt-2">
                                <span>6m</span>
                                <span>24m</span>
                            </div>
                            <p className="text-2xl font-extrabold text-voca-green mt-3">Até {PERCENT_SAVINGS}%</p>
                            <p className="text-xs text-slate-400">mais barato que o mercado</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pb-16 px-6">
                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4">
                    <Link href="/contact">
                        <Button className="bg-voca-green hover:bg-voca-green/90 rounded-md px-6 h-12 text-base font-semibold">
                            Agendar demonstração
                        </Button>
                    </Link>
                    <WhatsappLink variant="text" />
                </div>
            </div>
        </div>
    )
}
