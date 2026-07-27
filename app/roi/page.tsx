'use client'

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import {
    Users, Check, ArrowLeft, ArrowRight, Minus, Plus, TrendingDown, Building, Building2, Wallet, ListChecks, Trophy, Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WhatsappLink } from "@/components/WhatsappLink";
import { ClientLogoMarquee } from "@/components/ClientLogoMarquee";
import { cn } from "@/lib/utils";
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

export default function ROIPage() {
    const [step, setStep] = useState(0);
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
        setStep((s) => Math.min(s + 1, STEP_COUNT - 1));
    }

    function handleBack() {
        setStep((s) => Math.max(s - 1, 0));
    }

    return (
        <>
        <div
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
                <p className="text-sm font-bold tracking-widest text-white/60 uppercase">Calculadora de ROI</p>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
                    Quanto sua empresa pode economizar com o VOCA?
                </h1>
                <p className="text-lg text-white/70 mt-4">
                    Conte pra gente como sua empresa funciona hoje e veja uma estimativa personalizada em 4 passos.
                </p>
            </div>

            <Card
                className="relative max-w-5xl mx-auto mt-10 rounded-[1.75rem] border-none shadow-2xl overflow-hidden"
                style={{ background: "linear-gradient(180deg, #f0f9f8 0%, #ffffff 22%)" }}
            >
                <div
                    className="absolute inset-0 opacity-[0.35] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.14) 1px, transparent 1px)",
                        backgroundSize: "26px 26px",
                    }}
                />
                <div className="absolute inset-x-0 top-0 h-1.5 bg-slate-100 z-10">
                    <div
                        className="h-full bg-gradient-to-r from-voca-green to-teal-400 transition-all duration-500 ease-out"
                        style={{ width: `${((step + 1) / STEP_COUNT) * 100}%` }}
                    />
                </div>

                <CardHeader className="relative p-8 pb-2 sm:p-10 sm:pb-2">
                    <div className="flex items-center justify-between gap-3">
                        {step > 0 ? (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 transition-colors"
                            >
                                <ArrowLeft size={16} />
                            </button>
                        ) : (
                            <div className="h-9 w-9 shrink-0" />
                        )}

                        <div className="flex items-center gap-2.5">
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

                        <span className="h-9 w-9 shrink-0 flex items-center justify-end text-xs font-bold text-slate-400 tracking-wide">
                            {step + 1}/{STEP_COUNT}
                        </span>
                    </div>
                </CardHeader>

                <CardContent className="relative p-5 pt-5 sm:p-10 sm:pt-6">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -16 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            {step === 0 && (
                                <div className="max-w-md mx-auto space-y-8">
                                    <p className="text-slate-500 text-sm leading-relaxed text-center">
                                        Em poucos passos, mostramos quanto sua empresa pode economizar consolidando várias ferramentas de gestão de pessoas numa plataforma só.
                                    </p>

                                    <div>
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Building size={18} />
                                            <span className="text-sm font-semibold">Nome da empresa (opcional)</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Ex: Acme Ltda"
                                            value={companyName}
                                            onChange={(event) => setCompanyName(event.target.value)}
                                            className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 mt-3 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-voca-green/40 focus:bg-white"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-slate-700">
                                                <Users size={18} />
                                                <span className="text-sm font-semibold">Número de colaboradores</span>
                                            </div>
                                            <span className="text-xl font-extrabold text-voca-green">{employees}</span>
                                        </div>

                                        <div className="flex gap-2 mt-3">
                                            {sizePresets.map((preset, index) => {
                                                const prevMax = index === 0 ? 0 : sizePresets[index - 1].max;
                                                const isActive = employees > prevMax && employees <= preset.max;
                                                return (
                                                    <button
                                                        key={preset.label}
                                                        type="button"
                                                        onClick={() => setEmployees(preset.value)}
                                                        className={cn(
                                                            "flex-1 rounded-xl border px-2 py-1.5 text-center transition-colors duration-150",
                                                            isActive
                                                                ? "bg-voca-green border-voca-green"
                                                                : "border-slate-200 hover:border-slate-300"
                                                        )}
                                                    >
                                                        <p className={cn("text-xs font-bold", isActive ? "text-white" : "text-slate-700")}>
                                                            {preset.label}
                                                        </p>
                                                        <p className={cn("text-[10px]", isActive ? "text-white/70" : "text-slate-400")}>
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
                                            className="w-full h-2 mt-4 rounded-full appearance-none cursor-pointer bg-slate-100 accent-voca-green"
                                        />
                                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                                            <span>10</span>
                                            <span>1000+</span>
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
                                        {pillars.map((pillar) => (
                                            <div
                                                key={pillar.id}
                                                className="rounded-2xl border p-4"
                                                style={{ borderColor: `${pillar.color}25`, backgroundColor: `${pillar.color}08` }}
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
                                                                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-150",
                                                                    isSelected ? "text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                                                )}
                                                            >
                                                                <feature.icon size={12} />
                                                                {feature.name}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-400 mt-4 text-center">{selectedFeatures.size} selecionadas</p>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="max-w-md mx-auto space-y-8">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-2 text-slate-700">
                                            <Building2 size={18} />
                                            <span className="text-sm font-semibold">Em quantas plataformas diferentes isso está hoje?</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-3 mt-3">
                                            <button
                                                type="button"
                                                onClick={() => setPlatformCount((n) => Math.max(1, n - 1))}
                                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:border-slate-300"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-12 text-center text-xl font-extrabold text-slate-900">{platformCount}</span>
                                            <button
                                                type="button"
                                                onClick={() => setPlatformCount((n) => Math.min(20, n + 1))}
                                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:border-slate-300"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-2 text-slate-700">
                                            <Wallet size={18} />
                                            <span className="text-sm font-semibold">
                                                Quanto vocês gastam hoje com essas ferramentas, por mês? (opcional)
                                            </span>
                                        </div>
                                        <div className="relative mt-3">
                                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">R$</span>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                placeholder="Não sei ao certo"
                                                value={monthlySpendInput ? Number(monthlySpendInput).toLocaleString("pt-BR") : ""}
                                                onChange={(event) => setMonthlySpendInput(onlyDigits(event.target.value))}
                                                className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-center text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-voca-green/40 focus:bg-white"
                                            />
                                        </div>
                                        <p className="text-xs text-slate-400 mt-2">
                                            Se não souber, sem problema: usamos uma estimativa baseada no mercado.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="max-w-3xl mx-auto">
                                    <div
                                        className="rounded-[1.5rem] p-6 sm:p-10 text-center overflow-hidden relative"
                                        style={{ background: "linear-gradient(135deg, #012e31 0%, #016b72 100%)" }}
                                    >
                                        <p className="text-xs sm:text-sm font-bold text-white/50 uppercase tracking-widest">
                                            Hoje: {selectedFeatures.size} funcionalidades em {platformCount} {platformCount === 1 ? "plataforma" : "plataformas"} diferentes
                                        </p>
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
                                    </div>

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

                                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-10 mt-8">
                                        <p className="text-sm sm:text-base font-semibold text-slate-600 mb-6 sm:mb-8">Economia acumulada ao longo do contrato</p>
                                        <div className="flex items-end gap-1.5 sm:gap-5 h-64">
                                            {milestoneMonths.map((month) => {
                                                const value = result.monthlySavings * month;
                                                const maxValue = result.monthlySavings * CONTRACT_LENGTH_MONTHS || 1;
                                                const barHeightPx = Math.max(16, (value / maxValue) * 190);
                                                return (
                                                    <div key={month} className="flex-1 flex flex-col items-center justify-end h-full min-w-0">
                                                        <p className="text-[9px] sm:text-sm font-bold text-slate-700 mb-2 text-center leading-tight break-words">
                                                            {formatCurrency(value)}
                                                        </p>
                                                        <div
                                                            className="w-full rounded-t-lg bg-voca-green transition-all duration-500 ease-out"
                                                            style={{ height: `${barHeightPx}px` }}
                                                        />
                                                        <p className="text-[10px] sm:text-xs text-slate-400 mt-2 font-semibold">{month}m</p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
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
                <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Não é só simulação</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
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
                <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Sem letra miúda</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
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
                <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Tudo incluso</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                    Você viu quanto pode economizar. Agora veja tudo que está incluso.
                </h2>
                <p className="text-slate-500 mt-4 max-w-xl mx-auto">
                    18 funcionalidades, organizadas em 4 frentes, numa única plataforma, sem precisar contratar nada à parte.
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
                    <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Perguntas frequentes</p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
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
                        <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Sua vez</p>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 leading-snug">
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
