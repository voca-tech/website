'use client'

import Image from "next/image";
import type { CSSProperties } from "react";
import { Playfair_Display } from "next/font/google";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PILLARS, type Case, type Metric } from "@/app/casos-de-sucesso/data";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], display: "swap" });

export function initials(name: string) {
    return name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
}

export function CaseLogo({ item, className }: { item: Case; className?: string }) {
    if (!item.logo) {
        return <span className={cn("text-xs font-extrabold text-slate-400", className)}>{item.company}</span>;
    }
    return (
        <Image
            src={item.logo}
            alt={item.company}
            width={160}
            height={48}
            className={cn("h-6 w-auto max-w-[7rem] object-contain", className)}
        />
    );
}

export function CasePerson({ item, size = "md", tone = "light" }: { item: Case; size?: "md" | "lg"; tone?: "light" | "dark" }) {
    const color = PILLARS[item.pillar].color;
    return (
        <div className="flex items-center gap-3 min-w-0">
            <Avatar
                className={cn("shrink-0 ring-2 ring-white shadow-sm", size === "lg" ? "h-[4.5rem] w-[4.5rem] ring-4" : "h-11 w-11")}
            >
                {item.avatar && <AvatarImage src={item.avatar} alt={item.name ?? item.company} className="object-cover object-top" />}
                <AvatarFallback className="font-bold text-sm" style={{ backgroundColor: `${color}1A`, color }}>
                    {initials(item.name ?? item.company)}
                </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
                <p className={cn("font-bold truncate", size === "lg" ? "text-base" : "text-sm", tone === "dark" ? "text-white" : "text-slate-900")}>
                    {item.name ?? item.company}
                </p>
                {item.role && (
                    <p className={cn("text-xs truncate", tone === "dark" ? "text-white/60" : "text-slate-500")}>
                        {item.role} · {item.company}
                    </p>
                )}
            </div>
        </div>
    );
}

interface CaseCardProps {
    item: Case;
    metric?: Metric;
    onClick: () => void;
    className?: string;
}

export function CaseCard({ item, metric, onClick, className }: CaseCardProps) {
    const color = PILLARS[item.pillar].color;

    return (
        <button
            type="button"
            onClick={onClick}
            style={{ "--pillar": color } as CSSProperties}
            className={cn(
                "case-card group relative flex flex-col text-left rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-transparent",
                className
            )}
        >
            <div className="h-1.5 w-full shrink-0" style={{ backgroundColor: color }} />

            <div className="flex flex-1 flex-col p-6">
                <span
                    className="self-start max-w-full rounded-lg px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider leading-snug"
                    style={{ backgroundColor: `${color}14`, color }}
                >
                    {item.theme}
                </span>

                {metric ? (
                    <div className="mt-6">
                        <p className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-none" style={{ color }}>
                            {metric.value}
                        </p>
                        <p className="text-sm text-slate-600 mt-2 leading-snug max-w-[15rem]">{metric.label}</p>
                    </div>
                ) : (
                    <p className="mt-6 text-xl font-bold text-slate-900 leading-snug">{item.theme}</p>
                )}

                <p className={cn(playfair.className, "italic text-[15px] text-slate-600 leading-relaxed line-clamp-3 mt-5 pt-5 border-t border-slate-100")}>
                    &ldquo;{item.quote}&rdquo;
                </p>

                <div className="mt-auto pt-6">
                    <CaseLogo
                        item={item}
                        className="grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <CasePerson item={item} />
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all duration-300 group-hover:border-transparent group-hover:bg-[var(--pillar)] group-hover:text-white">
                        <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                </div>
            </div>
        </button>
    );
}
