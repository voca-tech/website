'use client'

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import {
    Users, Check, ArrowLeft, ArrowRight, Minus, Plus, TrendingDown, Building, Building2, Wallet, ListChecks, Trophy, Calculator,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WhatsappLink } from "@/components/WhatsappLink";
import { ClientLogoMarquee } from "@/components/ClientLogoMarquee";
import { cn } from "@/lib/utils";
import { getLenisInstance } from "@/lib/lenis";
import { calculateCustomSavings } from "@/app/roi/constants";
import { pillars } from "@/app/produto/data";
import { cases as caseStudies, PILLARS } from "@/app/casos-de-sucesso/data";

const roiProofSlugs = [
    { slug: "sp-engenharia", value: "-40h", label: "de economia mensal do RH" },
    { slug: "woodbridge-cracha", value: "100%", label: "de redução em materiais gráficos" },
    { slug: "credi10-compliance", value: "100%", label: "de conformidade para auditoria" },
];

const roiProofCases = roiProofSlugs.map((item) => {
    const data = caseStudies.find((c) => c.slug === item.slug)!;
    return { ...item, photo: data.photo!, company: data.company, color: PILLARS[data.pillar].color };
});

const roiFaqs = [
    {
        question: "Esses números são reais?",
        answer: "Sim. A estimativa de mercado usada quando você não informa seu gasto atual é baseada em clientes reais que migraram de outras plataformas para o VOCA, com base na nossa proposta comercial oficial.",
    },
    {
        question: "Preciso usar todas as funcionalidades que selecionei para ter esse resultado?",
        answer: "Não. A economia vem de consolidar numa plataforma só o que hoje está espalhado em várias ferramentas. Mesmo usando só parte das funcionalidades, a lógica de consolidação já se aplica.",
    },
    {
        question: "E se minha empresa crescer durante o contrato?",
        answer: "Você pode ajustar o número de colaboradores a qualquer momento, sempre com o mesmo modelo de precificação por colaborador.",
    },
    {
        question: "A implementação está incluída nesse valor?",
        answer: "Sim. O onboarding guiado pelo nosso time faz parte da parceria, do kickoff estratégico até a primeira revisão trimestral.",
    },
    {
        question: "Posso simular de novo com outros números?",
        answer: "Claro. Use a seta de voltar no topo do card, ou recarregue a página, e simule quantas vezes quiser.",
    },
];

const sizePresets = [
    { label: "Pequena", sublabel: "até 50", value: 30, max: 50 },
    { label: "Média", sublabel: "50–200", value: 120, max: 200 },
    { label: "Grande", sublabel: "200+", value: 400, max: Infinity },
];

const STEP_TITLES = ["Sua operação hoje", "Suas funcionalidades", "Quanto isso custa", "Sua economia com o VOCA"];
const STEP_ICONS = [Building, ListChecks, Wallet, Trophy];
const STEP_COUNT = STEP_TITLES.length;

const CONTRACT_LENGTH_MONTHS = 36;

function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function onlyDigits(raw: string) {
    return raw.replace(/\D/g, "");
}

function useCountUp(target: number, format: (n: number) => string) {
    const [display, setDisplay] = useState(() => format(0));
    const current = useRef(0);

    useEffect(() => {
        const obj = { val: current.current };
        const tween = gsap.to(obj, {
            val: target,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: () => {
                current.current = obj.val;
                setDisplay(format(obj.val));
            },
        });
        return () => { tween.kill(); };
    }, [target, format]);

    return display;
}

const FIELD_CLASS =
    "mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base font-semibold text-slate-900 " +
    "placeholder:font-medium placeholder:text-slate-400 transition-all duration-200 " +
    "focus:border-voca-green/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-voca-green/10";

function FieldLabel({ icon: Icon, text, hint }: { icon: LucideIcon; text: string; hint?: string }) {
    return (
        <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-voca-green/10 text-voca-green">
                <Icon size={16} />
            </span>
            <span className="text-sm font-semibold text-slate-700">
                {text}
                {hint && <span className="ml-1.5 font-medium text-slate-400">({hint})</span>}
            </span>
        </div>
    );
}

function Stepper({ step, onBack }: { step: number; onBack: () => void }) {
    return (
        <div className="relative">
            {step > 0 && (
                <button
                    type="button"
                    onClick={onBack}
                    aria-label="Etapa anterior"
                    className="absolute -top-1 left-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
                >
                    <ArrowLeft size={15} />
                </button>
            )}

            <div className="mx-auto flex max-w-lg items-start">
                {STEP_TITLES.map((title, index) => {
                    const done = index < step;
                    const current = index === step;

                    return (
                        <div key={title} className="flex flex-1 flex-col items-center">
                            <div className="flex w-full items-center">

                                <span
                                    className={cn(
                                        "h-[2px] flex-1 rounded-full transition-colors duration-500",
                                        index === 0 ? "bg-transparent" : done || current ? "bg-voca-green" : "bg-slate-200"
                                    )}
                                />

                                <span
                                    className={cn(
                                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold transition-all duration-500",
                                        done && "border-voca-green bg-voca-green text-white",
                                        current && "border-voca-green bg-white text-voca-green shadow-[0_0_0_4px_rgba(0,121,128,0.12)]",
                                        !done && !current && "border-slate-200 bg-white text-slate-300"
                                    )}
                                >
                                    {done ? <Check size={13} strokeWidth={3} /> : index + 1}
                                </span>

                                <span
                                    className={cn(
                                        "h-[2px] flex-1 rounded-full transition-colors duration-500",
                                        index === STEP_TITLES.length - 1 ? "bg-transparent" : done ? "bg-voca-green" : "bg-slate-200"
                                    )}
                                />
                            </div>

                            <span
                                className={cn(
                                    "mt-2 hidden px-1 text-center text-[10px] font-bold leading-tight transition-colors duration-500 sm:block",
                                    current ? "text-voca-green" : done ? "text-slate-500" : "text-slate-300"
                                )}
                            >
                                {title}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function ROIPage() {
    const [step, setStep] = useState(0);

    const [direction, setDirection] = useState(1);
    const cardRef = useRef<HTMLDivElement>(null);
    const hasSteppedRef = useRef(false);
    const [companyName, setCompanyName] = useState("");
    const [employees, setEmployees] = useState(100);
    const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
    const [platformCount, setPlatformCount] = useState(3);
    const [monthlySpendInput, setMonthlySpendInput] = useState("");

    const isLastStep = step === STEP_COUNT - 1;
    const canAdvanceStep1 = selectedFeatures.size > 0;

    const customSpend = monthlySpendInput.trim() === "" ? undefined : Number(monthlySpendInput);
    const hasCustomSpend = customSpend !== undefined && customSpend > 0;
    const result = calculateCustomSavings(employees, hasCustomSpend ? customSpend : undefined, CONTRACT_LENGTH_MONTHS);

    const monthlyDisplay = useCountUp(result.monthlySavings, formatCurrency);
    const totalDisplay = useCountUp(result.totalSavings, formatCurrency);

    const noSavings = hasCustomSpend && result.monthlySavings <= 0;

    const milestoneMonths = Array.from({ length: 4 }, (_, i) =>
        Math.round(12 + i * ((CONTRACT_LENGTH_MONTHS - 12) / 3))
    );

    function toggleFeature(name: string) {
        setSelectedFeatures((prev) => {
            const next = new Set(prev);
            if (next.has(name)) next.delete(name);
            else next.add(name);
            return next;
        });
    }

    function handleNext() {
        setDirection(1);
        setStep((s) => Math.min(s + 1, STEP_COUNT - 1));
    }

    function handleBack() {
        setDirection(-1);
        setStep((s) => Math.max(s - 1, 0));
    }

    useEffect(() => {
        if (!hasSteppedRef.current) {
            hasSteppedRef.current = true;
            return;
        }

        const element = cardRef.current;
        if (!element) return;

        const lenis = getLenisInstance();
        if (lenis) lenis.scrollTo(element, { offset: -100, duration: 0.7 });
        else element.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [step]);

    return (
        <>
        <div data-nav-dark
            className="relative py-16 sm:py-24 px-6 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #012e31 0%, #016b72 100%)" }}
        >
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div
                    className="absolute -top-32 left-[10%] w-[26rem] h-[26rem] rounded-full blur-3xl"
                    style={{ backgroundColor: "#007980", opacity: 0.3, animation: "drift-a 26s ease-in-out infinite" }}
                />
                <div
                    className="absolute -bottom-40 right-[10%] w-[28rem] h-[28rem] rounded-full blur-3xl"
                    style={{ backgroundColor: "#2f6690", opacity: 0.25, animation: "drift-b 30s ease-in-out infinite" }}
                />
            </div>

            <div className="relative max-w-2xl mx-auto text-center">
                <h1 className="voca-title-invert text-3xl sm:text-4xl font-extrabold">
                    Quanto sua empresa pode economizar com o VOCA?
                </h1>
                <p className="text-lg text-white/70 mt-4">
                    Conte pra gente como sua empresa funciona hoje e veja uma estimativa personalizada em 4 passos.
                </p>
            </div>

            <Card
                ref={cardRef}
                className="relative max-w-5xl mx-auto mt-10 rounded-[1.75rem] border-none shadow-2xl overflow-hidden scroll-mt-28"
                style={{ background: "linear-gradient(180deg, #f0f9f8 0%, #ffffff 22%)" }}
            >
                <div
                    className="absolute inset-0 opacity-[0.35] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.14) 1px, transparent 1px)",
                        backgroundSize: "26px 26px",
                    }}
                />
                <CardHeader className="relative p-6 pb-2 sm:p-10 sm:pb-2">
                    <Stepper step={step} onBack={handleBack} />

                    <div className="flex items-center justify-center gap-2.5 pt-7">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-voca-green/10 text-voca-green">
                            {(() => {
                                const StepIcon = STEP_ICONS[step];
                                return <StepIcon size={17} />;
                            })()}
                        </span>
                        <CardTitle className="text-xl sm:text-2xl font-extrabold text-slate-900">
                            {STEP_TITLES[step]}
                        </CardTitle>
                    </div>
                </CardHeader>

                <CardContent className="relative p-5 pt-5 sm:p-10 sm:pt-6">
                    <AnimatePresence mode="wait" initial={false} custom={direction}>
                        <motion.div
                            key={step}
                            custom={direction}
                            initial={{ opacity: 0, x: direction * 28 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction * -28 }}
                            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {step === 0 && (
                                <div className="mx-auto max-w-xl">
                                    <div className="space-y-8">
                                    <p className="text-slate-500 text-base leading-relaxed text-center">
                                        Em poucos passos, mostramos quanto sua empresa pode economizar consolidando várias ferramentas de gestão de pessoas numa plataforma só.
                                    </p>

                                    <div>
                                        <FieldLabel icon={Building} text="Nome da empresa" hint="opcional" />
                                        <input
                                            type="text"
                                            placeholder="Ex: Acme Ltda"
                                            value={companyName}
                                            onChange={(event) => setCompanyName(event.target.value)}
                                            className={FIELD_CLASS}
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-end justify-between gap-4">
                                            <FieldLabel icon={Users} text="Número de colaboradores" />
                                            <span className="voca-title text-3xl font-extrabold tabular-nums leading-none">
                                                {employees}
                                            </span>
                                        </div>

                                        <div className="flex gap-2.5 mt-4">
                                            {sizePresets.map((preset, index) => {
                                                const prevMax = index === 0 ? 0 : sizePresets[index - 1].max;
                                                const isActive = employees > prevMax && employees <= preset.max;
                                                return (
                                                    <button
                                                        key={preset.label}
                                                        type="button"
                                                        onClick={() => setEmployees(preset.value)}
                                                        aria-pressed={isActive}
                                                        className={cn(
                                                            "flex-1 rounded-xl border-2 px-3 py-3 text-center transition-all duration-200 ease-out",
                                                            isActive
                                                                ? "border-voca-green bg-voca-green/[0.07] shadow-sm -translate-y-0.5"
                                                                : "border-slate-200 hover:border-slate-300 hover:-translate-y-0.5"
                                                        )}
                                                    >
                                                        <p className={cn("text-sm font-bold", isActive ? "text-voca-green" : "text-slate-700")}>
                                                            {preset.label}
                                                        </p>
                                                        <p className={cn("text-xs mt-0.5", isActive ? "text-voca-green/70" : "text-slate-400")}>
                                                            {preset.sublabel}
                                                        </p>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <input
                                            type="range"
                                            min={10}
                                            max={1000}
                                            step={10}
                                            value={employees}
                                            onChange={(event) => setEmployees(Number(event.target.value))}
                                            aria-label="Número de colaboradores"
                                            className="voca-range mt-5"
                                            style={{ "--fill": `${((employees - 10) / 990) * 100}%` } as CSSProperties}
                                        />
                                        <div className="flex justify-between text-xs text-slate-400 mt-2">
                                            <span>10</span>
                                            <span>1000+</span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            )}

                            {step === 1 && (
                                <div>
                                    <p className="text-sm font-semibold text-slate-700 text-center">
                                        Quais dessas funcionalidades vocês já usam hoje, em outras ferramentas?
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1.5 text-center">
                                        Selecione tudo que já tem, mesmo que espalhado em várias plataformas diferentes.
                                    </p>

                                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {pillars.map((pillar) => {
                                            const pillarPicked = pillar.features.filter((f) => selectedFeatures.has(f.name)).length;
                                            return (
                                            <div
                                                key={pillar.id}
                                                className="rounded-2xl border p-4 transition-colors duration-300"
                                                style={{
                                                    borderColor: pillarPicked > 0 ? `${pillar.color}55` : `${pillar.color}25`,
                                                    backgroundColor: pillarPicked > 0 ? `${pillar.color}12` : `${pillar.color}08`,
                                                }}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                                                        style={{ backgroundColor: `${pillar.color}1A`, color: pillar.color }}
                                                    >
                                                        <pillar.icon size={14} />
                                                    </span>
                                                    <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: pillar.color }}>
                                                        {pillar.title}
                                                    </p>

                                                    <span
                                                        className="ml-auto flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[10px] font-bold transition-all duration-300"
                                                        style={{
                                                            backgroundColor: pillarPicked > 0 ? pillar.color : "transparent",
                                                            color: pillarPicked > 0 ? "#ffffff" : "transparent",
                                                            transform: pillarPicked > 0 ? "scale(1)" : "scale(0.6)",
                                                        }}
                                                    >
                                                        {pillarPicked}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {pillar.features.map((feature) => {
                                                        const isSelected = selectedFeatures.has(feature.name);
                                                        return (
                                                            <button
                                                                key={feature.name}
                                                                type="button"
                                                                onClick={() => toggleFeature(feature.name)}
                                                                style={isSelected ? { backgroundColor: pillar.color, borderColor: pillar.color } : undefined}
                                                                className={cn(
                                                                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ease-out",
                                                                    isSelected
                                                                        ? "text-white shadow-sm -translate-y-px"
                                                                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:-translate-y-px"
                                                                )}
                                                            >
                                                                {isSelected ? <Check size={12} strokeWidth={3} /> : <feature.icon size={12} />}
                                                                {feature.name}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            );
                                        })}
                                    </div>
                                    <p className="text-xs text-slate-500 mt-4 text-center font-medium">
                                        <span className="font-bold text-voca-green">{selectedFeatures.size}</span> selecionadas
                                    </p>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="mx-auto max-w-xl">
                                    <div className="space-y-8">
                                        <div>
                                            <FieldLabel icon={Building2} text="Em quantas plataformas diferentes isso está hoje?" />
                                            <div className="flex items-center gap-3 mt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setPlatformCount((n) => Math.max(1, n - 1))}
                                                    aria-label="Menos uma plataforma"
                                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:border-voca-green/40 hover:text-voca-green"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="voca-title w-14 text-center text-3xl font-extrabold tabular-nums">
                                                    {platformCount}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => setPlatformCount((n) => Math.min(20, n + 1))}
                                                    aria-label="Mais uma plataforma"
                                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:border-voca-green/40 hover:text-voca-green"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <FieldLabel
                                                icon={Wallet}
                                                text="Quanto vocês gastam hoje com essas ferramentas, por mês?"
                                                hint="opcional"
                                            />
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 z-10 mt-1.5 -translate-y-1/2 text-sm font-semibold text-slate-400">
                                                    R$
                                                </span>
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    placeholder="Não sei ao certo"
                                                    value={monthlySpendInput ? Number(monthlySpendInput).toLocaleString("pt-BR") : ""}
                                                    onChange={(event) => setMonthlySpendInput(onlyDigits(event.target.value))}
                                                    className={cn(FIELD_CLASS, "pl-11")}
                                                />
                                            </div>
                                            <p className="text-xs text-slate-400 mt-2">
                                                Campo opcional. Se não souber, usamos uma estimativa baseada no mercado.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="max-w-3xl mx-auto">
                                    <div
                                        className="rounded-[1.5rem] p-6 sm:p-10 text-center overflow-hidden relative"
                                        style={{ background: "linear-gradient(135deg, #012e31 0%, #016b72 100%)" }}
                                    >

                                        <div
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-0 opacity-[0.09]"
                                            style={{
                                                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
                                                backgroundSize: "24px 24px",
                                            }}
                                        />
                                        <div
                                            aria-hidden="true"
                                            className="pointer-events-none absolute -top-24 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-teal-300/15 blur-3xl"
                                        />
                                        <svg
                                            aria-hidden="true"
                                            viewBox="0 0 28 28"
                                            className="pointer-events-none absolute -right-10 -bottom-12 h-56 w-56 text-white opacity-[0.06]"
                                            fill="currentColor"
                                        >
                                            <rect x="10" width="18" height="18" rx="5" fillOpacity="0.38" />
                                            <path d="M4 3h12a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-6l-6 7v-7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z" />
                                        </svg>

                                        <div className="relative">
                                        <p className="text-xs sm:text-sm font-bold text-white/50 uppercase tracking-widest">
                                            Hoje: {selectedFeatures.size} funcionalidades em {platformCount} {platformCount === 1 ? "plataforma" : "plataformas"} diferentes
                                        </p>

                                        {noSavings ? (
                                            <>
                                                <p className="text-2xl sm:text-3xl font-extrabold text-white mt-4 leading-snug">
                                                    Aqui o ganho não é de preço.
                                                </p>
                                                <p className="text-white/80 text-base sm:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
                                                    O valor que a{" "}
                                                    <span className="font-bold text-white">{companyName.trim() || "sua empresa"}</span>{" "}
                                                    informou já está abaixo da nossa estimativa para um time de {employees} pessoas.
                                                    O que muda é a consolidação: {selectedFeatures.size} funcionalidades num contrato só,
                                                    em vez de {platformCount}.
                                                </p>
                                                <p className="text-teal-200 text-sm mt-6">
                                                    Com os números reais da sua operação, conseguimos montar uma proposta sob medida.
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-xl sm:text-2xl font-extrabold text-white mt-3 leading-snug">
                                                    O VOCA faz tudo isso sozinho, numa única plataforma.
                                                </p>
                                                <p className="text-white/80 text-base sm:text-lg mt-5">
                                                    Com o VOCA, a <span className="font-bold text-white">{companyName.trim() || "sua empresa"}</span> pode economizar até
                                                </p>
                                                <p className="text-5xl sm:text-7xl font-extrabold text-white mt-2 leading-none">
                                                    {monthlyDisplay}
                                                    <span className="text-lg sm:text-2xl font-semibold text-white/60"> /mês</span>
                                                </p>
                                            </>
                                        )}
                                        </div>
                                    </div>

                                    {!noSavings && (
                                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mt-8">
                                        <div className="text-center">
                                            <p className="text-3xl sm:text-4xl font-extrabold text-voca-green">{totalDisplay}</p>
                                            <p className="text-sm text-slate-500 mt-1">em {CONTRACT_LENGTH_MONTHS} meses de contrato</p>
                                        </div>
                                        <div className="hidden sm:block w-px h-12 bg-slate-200" />
                                        <div className="text-center">
                                            <p className="text-3xl sm:text-4xl font-extrabold text-voca-green flex items-center gap-2 justify-center">
                                                <TrendingDown size={26} />
                                                {result.percentSavings}%
                                            </p>
                                            <p className="text-sm text-slate-500 mt-1">
                                                mais barato{!hasCustomSpend && " (estimativa de mercado)"}
                                            </p>
                                        </div>
                                    </div>
                                    )}

                                    {!noSavings && (
                                    <div className="relative mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-10">
                                        <p className="mb-6 text-sm font-semibold text-slate-600 sm:mb-8 sm:text-base">
                                            Economia acumulada ao longo do contrato
                                        </p>

                                        <div className="relative flex h-64 items-end gap-1.5 sm:gap-5">

                                            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-8 top-0">
                                                {[0, 0.5, 1].map((t) => (
                                                    <span
                                                        key={t}
                                                        className="absolute inset-x-0 h-px bg-slate-200/80"
                                                        style={{ bottom: `${t * 100}%` }}
                                                    />
                                                ))}
                                            </div>

                                            {milestoneMonths.map((month, index) => {
                                                const value = result.monthlySavings * month;
                                                const maxValue = result.monthlySavings * CONTRACT_LENGTH_MONTHS || 1;
                                                const barHeightPx = Math.max(16, (value / maxValue) * 190);
                                                const isLast = index === milestoneMonths.length - 1;

                                                return (
                                                    <div key={month} className="relative flex h-full min-w-0 flex-1 flex-col items-center justify-end">
                                                        <p
                                                            className={cn(
                                                                "mb-2 break-words text-center text-[9px] font-bold leading-tight sm:text-sm",
                                                                isLast ? "text-voca-green" : "text-slate-700"
                                                            )}
                                                            style={{
                                                                opacity: 0,
                                                                animation: `roi-bar-label 400ms ease-out ${420 + index * 110}ms forwards`,
                                                            }}
                                                        >
                                                            {formatCurrency(value)}
                                                        </p>

                                                        <div
                                                            className="w-full origin-bottom rounded-t-lg"
                                                            style={{
                                                                height: `${barHeightPx}px`,
                                                                background: isLast
                                                                    ? "linear-gradient(180deg, #2dd4bf 0%, #007980 100%)"
                                                                    : "linear-gradient(180deg, #0d9a9f 0%, #007980 100%)",
                                                                boxShadow: isLast ? "0 6px 18px -6px rgba(0,121,128,0.55)" : "none",
                                                                animation: `roi-bar-grow 620ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 110}ms both`,
                                                            }}
                                                        />

                                                        <p
                                                            className={cn(
                                                                "mt-2 text-[10px] font-semibold sm:text-xs",
                                                                isLast ? "text-voca-green" : "text-slate-400"
                                                            )}
                                                        >
                                                            {month}m
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex items-start gap-3 mt-8 max-w-2xl mx-auto">
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

                        {!isLastStep ? (
                            <Button
                                type="button"
                                onClick={handleNext}
                                disabled={step === 1 && !canAdvanceStep1}
                                className="rounded-xl w-full h-12 bg-voca-green hover:bg-voca-green/90 font-semibold shadow-md shadow-voca-green/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                            >
                                <span className="flex items-center gap-2">
                                    Próximo
                                    <ArrowRight size={16} />
                                </span>
                            </Button>
                        ) : (
                            <div className="flex flex-wrap items-center gap-3 w-full">
                                <Link href="/contact" className="flex-1 min-w-[10rem]">
                                    <Button className="w-full rounded-xl h-12 bg-voca-green hover:bg-voca-green/90 font-semibold">
                                        Agendar demonstração
                                    </Button>
                                </Link>
                                <WhatsappLink />
                            </div>
                        )}
                    </div>

                    {step === 1 && !canAdvanceStep1 && (
                        <p className="text-xs text-center text-slate-400 mt-3">Selecione ao menos uma funcionalidade pra continuar.</p>
                    )}

                    <div className="flex items-center gap-2 justify-center mt-6">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-voca-green/10 text-voca-green">
                            <Check size={11} />
                        </span>
                        <p className="text-xs font-medium text-slate-500">Seus dados estão seguros e não serão compartilhados com terceiros.</p>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="py-16 sm:py-20 px-6 bg-white">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="voca-title text-2xl sm:text-3xl font-extrabold">
                    Empresas reais já vivem essa economia
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
                {roiProofCases.map((item) => (
                    <Link
                        key={item.slug}
                        href={`/casos-de-sucesso#${item.slug}`}
                        className="group relative h-72 rounded-2xl overflow-hidden"
                    >
                        <Image
                            src={item.photo}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                            className="absolute inset-0 transition-colors duration-300"
                            style={{ background: `linear-gradient(180deg, ${item.color}00 25%, ${item.color}F0 100%)` }}
                        />
                        <div className="absolute inset-x-0 bottom-0 p-5">
                            <p className="text-3xl font-extrabold text-white">{item.value}</p>
                            <p className="text-white/80 text-sm mt-1">{item.label}</p>
                            <p className="text-xs font-bold text-white/70 uppercase tracking-wide mt-4 flex items-center gap-1">
                                {item.company}
                                <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

        <div className="py-14 sm:py-16 px-6 bg-slate-50">
            <p className="text-center text-xs font-bold tracking-widest text-slate-400 uppercase mb-6">
                Empresas que já confiam no VOCA
            </p>
            <ClientLogoMarquee />
        </div>

        <div className="py-16 sm:py-20 px-6 bg-white overflow-hidden">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="voca-title text-2xl sm:text-3xl font-extrabold">
                    Como chegamos nesse número
                </h2>
            </div>

            <div className="max-w-4xl mx-auto mt-12 flex flex-col sm:flex-row items-center gap-6 sm:gap-4">
                <div className="flex-1 text-center">
                    <span className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-voca-green/10 text-voca-green">
                        <Wallet size={24} />
                    </span>
                    <p className="font-bold text-slate-900 mt-4">Seu gasto hoje</p>
                    <p className="text-sm text-slate-500 mt-1.5 max-w-[14rem] mx-auto">
                        O que você informou, ou uma estimativa de mercado, se preferir não informar.
                    </p>
                </div>

                <ArrowRight size={20} className="hidden sm:block text-slate-300 shrink-0" />

                <div className="flex-1 text-center">
                    <span className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-voca-green/10 text-voca-green">
                        <Calculator size={24} />
                    </span>
                    <p className="font-bold text-slate-900 mt-4">Investimento VOCA</p>
                    <p className="text-sm text-slate-500 mt-1.5 max-w-[14rem] mx-auto">
                        Preço fixo por colaborador, com tudo incluso numa plataforma só.
                    </p>
                </div>

                <ArrowRight size={20} className="hidden sm:block text-slate-300 shrink-0" />

                <div className="flex-1 text-center">
                    <span className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-voca-green/10 text-voca-green">
                        <TrendingDown size={24} />
                    </span>
                    <p className="font-bold text-slate-900 mt-4">Sua economia</p>
                    <p className="text-sm text-slate-500 mt-1.5 max-w-[14rem] mx-auto">
                        A diferença entre os dois, projetada pelos meses do contrato.
                    </p>
                </div>
            </div>
        </div>

        <div className="py-16 sm:py-20 px-6 bg-slate-50">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="voca-title text-3xl sm:text-4xl font-extrabold">
                    Você viu quanto pode economizar. Agora veja tudo que está incluso.
                </h2>
                <p className="text-slate-500 mt-4 max-w-xl mx-auto">
                    21 funcionalidades, organizadas em 4 frentes, numa única plataforma, sem precisar contratar nada à parte.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
                {pillars.map((pillar) => (
                    <Link
                        key={pillar.id}
                        href={`/produto#${pillar.id}`}
                        className="group rounded-2xl border border-slate-200 bg-white p-5 text-center transition-all duration-200 hover:border-voca-green/40 hover:shadow-md"
                    >
                        <span
                            className="flex h-12 w-12 mx-auto items-center justify-center rounded-full transition-colors"
                            style={{ backgroundColor: `${pillar.color}14`, color: pillar.color }}
                        >
                            <pillar.icon size={22} />
                        </span>
                        <p className="text-sm font-bold text-slate-900 mt-3">{pillar.title}</p>
                        <p className="text-xs text-slate-400 mt-1">{pillar.features.length} funcionalidades</p>
                    </Link>
                ))}
            </div>

            <div className="text-center mt-10">
                <Link href="/produto" className="inline-flex">
                    <span className="group inline-flex items-center gap-3 rounded-full bg-voca-green text-white pl-6 pr-2 py-2 text-base font-semibold shadow-lg shadow-voca-green/25 transition-shadow hover:shadow-xl">
                        Conhecer o produto completo
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-voca-green transition-transform group-hover:translate-x-1">
                            <ArrowRight size={16} />
                        </span>
                    </span>
                </Link>
            </div>
        </div>

        <div className="py-16 sm:py-20 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center max-w-xl mx-auto">
                    <h2 className="voca-title text-2xl sm:text-3xl font-extrabold">
                        Sobre a calculadora e o contrato
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
                    {roiFaqs.map((faq, index) => (
                        <div key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-6">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-voca-green/10 text-voca-green text-xs font-extrabold">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <p className="font-bold text-slate-900 mt-3.5">{faq.question}</p>
                            <p className="text-sm text-slate-500 mt-2 leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="px-6 py-16 sm:py-20 bg-white">
            <div className="max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="p-10 sm:p-12 flex flex-col justify-center bg-white">
                        <h2 className="voca-title text-2xl sm:text-3xl font-extrabold leading-snug">
                            Pronto pra ver isso funcionando na sua empresa?
                        </h2>
                    </div>
                    <div
                        className="p-10 sm:p-12 flex flex-wrap items-center gap-3"
                        style={{ background: "linear-gradient(135deg, #012e31 0%, #016b72 100%)" }}
                    >
                        <Link href="/contact">
                            <Button className="bg-white text-voca-green hover:bg-white/90 rounded-md px-6 h-12 text-base font-semibold">
                                Agendar demonstração
                            </Button>
                        </Link>
                        <WhatsappLink
                            variant="text"
                            className="inline-flex items-center justify-center gap-1.5 h-12 px-6 rounded-md border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
                        />
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}
