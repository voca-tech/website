'use client'

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
    TrendingDown, Users, Check,
    Megaphone, Gauge, LayoutDashboard, FolderOpen,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappLink } from "@/components/WhatsappLink";
import { cn } from "@/lib/utils";

// Estimativa interna com base em clientes que migraram de outras plataformas
// para o VOCA (fonte: proposta comercial oficial). Os valores de referência de
// mercado e do plano VOCA não são exibidos publicamente — só o resultado da economia.
const MARKET_RATE_PER_EMPLOYEE = 40;
const VOCA_RATE_PER_EMPLOYEE = 20;
const CONTRACT_MONTHS = 24;
const SAVINGS_RATIO = (MARKET_RATE_PER_EMPLOYEE - VOCA_RATE_PER_EMPLOYEE) / MARKET_RATE_PER_EMPLOYEE;

interface Bundle {
    title: string;
    icon: LucideIcon;
    color: string;
    examples: string[];
}

const sizePresets = [
    { label: "Pequena", sublabel: "até 50", value: 30 },
    { label: "Média", sublabel: "50–200", value: 120 },
    { label: "Grande", sublabel: "200+", value: 400 },
];

const milestoneMonths = [6, 12, 18, 24];

const bundles: Bundle[] = [
    {
        title: "Cultura & Engajamento",
        icon: Megaphone,
        color: "#007980",
        examples: [
            "Termômetro de Humor",
            "Rede Social Corporativa",
            "Mural de Elogios",
            "Aniversários",
            "Caixa de Ideias",
            "Fale com a Liderança",
            "Ouvidoria",
        ],
    },
    {
        title: "Performance & Desenvolvimento",
        icon: Gauge,
        color: "#5f7480",
        examples: [
            "Avaliação de Desempenho",
            "Plano de Desenvolvimento Individual",
            "Feedback",
            "Treinamentos",
            "Gamificação",
        ],
    },
    {
        title: "Inteligência & People Analytics",
        icon: LayoutDashboard,
        color: "#2f6690",
        examples: [
            "Pesquisas Customizadas",
            "Análise de Turnover",
            "Perfil do Usuário 360º",
            "Leitura de Sentimento (IA)",
            "Indicadores e Relatórios",
        ],
    },
    {
        title: "Operações & Serviços Internos",
        icon: FolderOpen,
        color: "#85568a",
        examples: [
            "Repositório de Arquivos",
            "Crachá Digital",
            "Classificados (Marketplace)",
            "Integração com Sistemas",
        ],
    },
];

function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function useCountUp(target: number, format: (n: number) => string) {
    const ref = useRef<HTMLParagraphElement>(null);
    const current = useRef(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obj = { val: current.current };
        gsap.to(obj, {
            val: target,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: () => {
                current.current = obj.val;
                el.textContent = format(obj.val);
            },
        });
    }, [target, format]);

    return ref;
}

export default function ROIPage() {
    const [employees, setEmployees] = useState(100);
    const [activeBundle, setActiveBundle] = useState(0);
    const [displayedBundle, setDisplayedBundle] = useState(0);
    const bundleContentRef = useRef<HTMLDivElement>(null);

    const monthlySavings = employees * (MARKET_RATE_PER_EMPLOYEE - VOCA_RATE_PER_EMPLOYEE);
    const totalSavings = monthlySavings * CONTRACT_MONTHS;
    const percentSavings = Math.round(SAVINGS_RATIO * 100);

    const monthlyRef = useCountUp(monthlySavings, formatCurrency);
    const totalRef = useCountUp(totalSavings, formatCurrency);

    // Staggered content swap for the "O que está incluso" tab panel, same technique as /produto.
    useEffect(() => {
        if (activeBundle === displayedBundle || !bundleContentRef.current) return;
        const pieces = bundleContentRef.current.querySelectorAll(".stagger-item");
        gsap.to(pieces, {
            opacity: 0,
            y: -10,
            duration: 0.15,
            stagger: 0.02,
            ease: "power1.in",
            onComplete: () => setDisplayedBundle(activeBundle),
        });
    }, [activeBundle, displayedBundle]);

    useEffect(() => {
        if (!bundleContentRef.current) return;
        const pieces = bundleContentRef.current.querySelectorAll(".stagger-item");
        gsap.fromTo(
            pieces,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: "power2.out" }
        );
    }, [displayedBundle]);

    return (
        <div className="relative bg-white py-16 sm:py-24 px-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.3]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
            </div>

            <div className="relative max-w-2xl mx-auto text-center">
                <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Calculadora de ROI</p>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                    Quanto sua empresa pode economizar com o VOCA?
                </h1>
                <p className="text-lg text-slate-500 mt-4">
                    Ajuste os controles e veja a estimativa em tempo real, com base em clientes que migraram de outras plataformas para o VOCA.
                </p>
            </div>

            <div className="relative max-w-2xl mx-auto mt-10 rounded-3xl bg-voca-green p-8 sm:p-10 shadow-xl overflow-hidden">
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
                <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />

                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white/80">
                            <Users size={18} />
                            <span className="text-sm font-semibold">Número de colaboradores</span>
                        </div>
                        <span className="text-2xl font-extrabold text-white">{employees}</span>
                    </div>

                    <div className="flex gap-2 mt-3">
                        {sizePresets.map((preset) => (
                            <button
                                key={preset.label}
                                type="button"
                                onClick={() => setEmployees(preset.value)}
                                className={cn(
                                    "flex-1 rounded-xl border px-2 py-1.5 text-center transition-colors duration-150",
                                    employees === preset.value
                                        ? "bg-white border-white"
                                        : "border-white/25 hover:border-white/50"
                                )}
                            >
                                <p className={cn("text-xs font-bold", employees === preset.value ? "text-voca-green" : "text-white")}>
                                    {preset.label}
                                </p>
                                <p className={cn("text-[10px]", employees === preset.value ? "text-voca-green/70" : "text-white/60")}>
                                    {preset.sublabel}
                                </p>
                            </button>
                        ))}
                    </div>

                    <input
                        type="range"
                        min={10}
                        max={1000}
                        step={10}
                        value={employees}
                        onChange={(event) => setEmployees(Number(event.target.value))}
                        className="w-full h-2 mt-4 rounded-full appearance-none cursor-pointer bg-white/20 accent-white"
                    />
                    <div className="flex justify-between text-xs text-white/50 mt-1">
                        <span>10</span>
                        <span>1000+</span>
                    </div>

                    <div className="mt-8 flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs text-white/70">
                            <span>VOCA</span>
                            <span>Ferramentas tradicionais</span>
                        </div>
                        <div className="flex gap-1.5">
                            <div
                                className="h-3 rounded-full bg-white transition-all duration-500"
                                style={{ width: `${(1 - SAVINGS_RATIO) * 100}%` }}
                            />
                            <div className="h-3 rounded-full bg-white/20 flex-1" />
                        </div>
                        <p className="text-white/60 text-xs">
                            Até <span className="font-bold text-white">{percentSavings}% mais barato</span> que a média de mercado
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="rounded-2xl bg-white/10 p-5">
                            <p ref={monthlyRef} className="text-2xl sm:text-3xl font-extrabold text-white">{formatCurrency(0)}</p>
                            <p className="text-xs text-white/70 mt-1">de economia por mês</p>
                        </div>
                        <div className="rounded-2xl bg-white/10 p-5">
                            <p ref={totalRef} className="text-2xl sm:text-3xl font-extrabold text-white">{formatCurrency(0)}</p>
                            <p className="text-xs text-white/70 mt-1">em {CONTRACT_MONTHS} meses de contrato</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <p className="text-xs font-semibold text-white/70 mb-3">Economia acumulada ao longo do contrato</p>
                        <div className="flex items-end gap-3 h-28">
                            {milestoneMonths.map((month) => {
                                const value = monthlySavings * month;
                                const maxValue = monthlySavings * CONTRACT_MONTHS || 1;
                                const heightPct = Math.max(6, (value / maxValue) * 100);
                                return (
                                    <div key={month} className="flex-1 flex flex-col items-center justify-end h-full">
                                        <p className="text-[11px] font-bold text-white mb-1.5 whitespace-nowrap">
                                            {formatCurrency(value)}
                                        </p>
                                        <div className="w-full rounded-t-lg bg-white/80 transition-all duration-500 ease-out" style={{ height: `${heightPct}%` }} />
                                        <p className="text-[10px] text-white/50 mt-1.5">{month}m</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <p className="text-white/50 text-xs mt-6 flex items-center gap-1.5">
                        <TrendingDown size={14} className="shrink-0" />
                        Estimativa baseada em clientes que migraram de outras plataformas para o VOCA.
                    </p>
                </div>
            </div>

            <div className="relative max-w-4xl mx-auto mt-16">
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm font-bold tracking-widest text-voca-green uppercase">O que está incluso</p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                        Um sistema só, em vez de várias ferramentas separadas
                    </h2>
                    <p className="text-slate-500 mt-3">
                        A economia acima já considera que você deixa de pagar por ferramentas isoladas para cada uma dessas frentes.
                    </p>
                </div>

                <div
                    className="relative mt-10 rounded-[2.5rem] border border-slate-200 bg-white shadow-xl overflow-hidden"
                >
                    <div
                        className="absolute inset-x-0 top-0 h-px pointer-events-none"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(0,121,128,0.15), transparent)" }}
                    />

                    <div className="relative flex flex-wrap gap-2 p-5 border-b border-slate-100">
                        {bundles.map((bundle, i) => {
                            const isActive = i === activeBundle;
                            return (
                                <button
                                    key={bundle.title}
                                    type="button"
                                    onClick={() => setActiveBundle(i)}
                                    style={{ backgroundColor: isActive ? bundle.color : "transparent" }}
                                    className={cn(
                                        "flex-1 min-w-[45%] sm:min-w-[11rem] flex items-center gap-2.5 rounded-2xl px-4 py-3 text-left transition-colors duration-300",
                                        isActive ? "shadow-md" : "hover:bg-slate-50"
                                    )}
                                >
                                    <div
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300"
                                        style={{
                                            backgroundColor: isActive ? "rgba(255,255,255,0.25)" : `${bundle.color}1A`,
                                            color: isActive ? "white" : bundle.color,
                                        }}
                                    >
                                        <bundle.icon size={17} />
                                    </div>
                                    <p className={cn("text-sm font-bold leading-snug", isActive ? "text-white" : "text-slate-700")}>
                                        {bundle.title}
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                    <div ref={bundleContentRef} className="relative p-6 sm:p-8 min-h-[16rem] sm:min-h-[12rem]">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                            {bundles[displayedBundle].examples.map((example) => (
                                <li key={example} className="stagger-item flex items-center gap-2.5 text-sm text-slate-600">
                                    <span
                                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                                        style={{ backgroundColor: `${bundles[displayedBundle].color}1A`, color: bundles[displayedBundle].color }}
                                    >
                                        <Check size={12} />
                                    </span>
                                    {example}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="relative max-w-2xl mx-auto mt-12 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                    <Button className="bg-voca-green hover:bg-voca-green/90 font-semibold px-6 h-12 rounded-md">
                        Falar com um especialista
                    </Button>
                </Link>
                <WhatsappLink />
            </div>
        </div>
    )
}
