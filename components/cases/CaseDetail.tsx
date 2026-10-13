'use client'

import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { Check } from "lucide-react";
import { DialogTitle } from "@/components/ui/dialog";
import { PILLARS, type Case, type Metric } from "@/app/casos-de-sucesso/data";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CaseLogo, initials } from "./CaseCard";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], display: "swap" });

function SectionLabel({ children, color }: { children: string; color: string }) {
    return (
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color }}>
            {children}
        </p>
    );
}

export function CaseDetail({ item, heroMetric }: { item: Case; heroMetric?: Metric }) {
    const color = PILLARS[item.pillar].color;
    const metric = heroMetric ?? item.metrics[item.heroMetricIndex ?? 0];

    return (
        <>
            <DialogTitle className="sr-only">{item.company}</DialogTitle>

            <div className="flex-1 min-h-0 overflow-y-auto bg-white">
                <div
                    className="relative px-6 sm:px-10 pt-8 pb-16 overflow-hidden"
                    style={{ background: `linear-gradient(135deg, rgba(1,20,25,0.55) 0%, rgba(1,20,25,0) 70%), ${color}` }}
                >
                    <div
                        className="absolute inset-0 opacity-[0.1] pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                            backgroundSize: "22px 22px",
                        }}
                    />
                    <Image
                        src="/voca-symbol.png"
                        alt=""
                        width={220}
                        height={270}
                        aria-hidden="true"
                        className="absolute -right-8 -bottom-16 w-44 h-auto opacity-[0.08] brightness-0 invert select-none pointer-events-none"
                    />

                    <div className="relative flex flex-wrap items-center gap-3 pr-10">
                        <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                            {item.theme}
                        </span>
                        {item.logo && (
                            <span className="inline-flex items-center rounded-lg bg-white px-2.5 py-1.5">
                                <CaseLogo item={item} className="h-5" />
                            </span>
                        )}
                    </div>

                    <p className="relative text-3xl sm:text-4xl font-extrabold text-white mt-5">{item.company}</p>
                    {metric && (
                        <p className="relative text-white/80 mt-2">
                            <span className="font-extrabold text-white">{metric.value}</span> {metric.label}
                        </p>
                    )}
                </div>

                <div className="px-6 sm:px-10 pb-10">
                    <div className="relative flex items-start gap-4">
                        <Avatar className="-mt-12 h-24 w-24 shrink-0 ring-4 ring-white shadow-md">
                            {item.avatar && <AvatarImage src={item.avatar} alt={item.name ?? item.company} className="object-cover object-top" />}
                            <AvatarFallback className="font-bold" style={{ backgroundColor: `${color}1A`, color }}>
                                {initials(item.name ?? item.company)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 pt-2.5">
                            <p className="font-bold text-slate-900">{item.name ?? item.company}</p>
                            {item.role && <p className="text-sm text-slate-500">{item.role} · {item.company}</p>}
                        </div>
                    </div>

                    <p className={cn(playfair.className, "italic text-xl sm:text-2xl text-slate-900 leading-snug mt-6")}>
                        &ldquo;{item.quote}&rdquo;
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-[14rem_1fr] gap-8 lg:gap-10 mt-8 pt-8 border-t border-slate-100">
                        {item.metrics.length > 0 && (
                            <div>
                                <SectionLabel color={color}>Métricas</SectionLabel>
                                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 mt-3">
                                    {item.metrics.map((entry, i) => (
                                        <div
                                            key={entry.label}
                                            className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 animate-in fade-in slide-in-from-bottom-1 duration-500"
                                            style={{ animationDelay: `${140 + i * 70}ms`, animationFillMode: "both" }}
                                        >
                                            <p className="text-xl font-extrabold leading-none" style={{ color }}>{entry.value}</p>
                                            <p className="text-xs text-slate-600 mt-1.5 leading-snug">{entry.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col gap-7">
                            {item.objective && (
                                <div>
                                    <SectionLabel color={color}>Objetivo</SectionLabel>
                                    <p className="text-slate-700 mt-2 leading-relaxed">{item.objective}</p>
                                </div>
                            )}

                            {item.solution && (
                                <div>
                                    <SectionLabel color={color}>Solução</SectionLabel>
                                    <ul className="mt-3 flex flex-col gap-2.5">
                                        {item.solution.map((point) => (
                                            <li key={point} className="text-sm text-slate-700 flex gap-2.5 leading-relaxed">
                                                <Check size={16} className="shrink-0 mt-0.5" style={{ color }} />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {item.result && (
                                <div className="rounded-xl p-5" style={{ backgroundColor: `${color}0F` }}>
                                    <SectionLabel color={color}>Resultado</SectionLabel>
                                    <p className="text-slate-700 mt-2 leading-relaxed">{item.result}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
