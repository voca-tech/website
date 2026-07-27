'use client'

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Logo {
    name: string;
    src: string;
    width: number;
    height: number;
    caseSlug?: string;
    boxClassName?: string;
}

const clientLogos: Logo[] = [
    { name: 'Akaer', src: '/clients/akaer.png', width: 140, height: 140, caseSlug: 'akaer' },
    { name: 'Credi10', src: '/clients/credi10.png', width: 140, height: 140, caseSlug: 'credi10-compliance' },
    { name: 'Belas Artes', src: '/clients/belasartes.png', width: 140, height: 140, caseSlug: 'belas-artes' },
    { name: 'NovoNordisk', src: '/clients/novoNordisk.png', width: 110, height: 82 },
    { name: 'Woodbridge', src: '/clients/woodbridge.png', width: 260, height: 130, caseSlug: 'woodbridge-pesquisa' },
    { name: 'HomeroCosta', src: '/clients/homeroCosta.png', width: 140, height: 140, boxClassName: 'h-20 w-20' },
    { name: 'DHS', src: '/clients/DHS.png', width: 140, height: 140 },
];

const partnerLogos: Logo[] = [
    { name: 'Watson', src: '/partners/watson.png', width: 90, height: 90 },
    { name: 'UFMG', src: '/partners/ufmg.png', width: 130, height: 100 },
    { name: 'FiemgLab', src: '/partners/fiemgLab.png', width: 100, height: 100 },
    { name: 'Seed', src: '/partners/seed.png', width: 70, height: 70 },
    { name: 'Plugae', src: '/partners/plugae.png', width: 150, height: 150 },
];

const allLogos = [...clientLogos, ...partnerLogos];
const findLogo = (name: string) => allLogos.find((logo) => logo.name === name)!;

const logosRowTop = ["Akaer", "NovoNordisk", "HomeroCosta", "Credi10", "Watson", "UFMG"].map(findLogo);
const logosRowBottom = ["Belas Artes", "DHS", "FiemgLab", "Woodbridge", "Seed", "Plugae"].map(findLogo);

function LogoItem({ logo }: { logo: Logo }) {
    const hasCase = Boolean(logo.caseSlug);

    const inner = (
        <>
            <div className={cn("relative shrink-0", logo.boxClassName ?? "h-14 w-28")}>
                <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all object-contain"
                />
            </div>
            {hasCase && (
                <span className="rounded-md bg-amber-50 text-amber-700 text-[10px] font-semibold px-2 py-1 whitespace-nowrap border border-amber-200/80">
                    caso real +
                </span>
            )}
        </>
    );

    const className = cn(
        "group flex items-center w-72 h-24 shrink-0 border border-slate-200 -ml-px px-8 gap-3",
        hasCase ? "justify-start hover:bg-slate-50 transition-colors" : "justify-center"
    );

    if (hasCase) {
        return (
            <Link href={`/casos-de-sucesso#${logo.caseSlug}`} className={className}>
                {inner}
            </Link>
        );
    }

    return <div className={className}>{inner}</div>;
}

interface ClientLogoMarqueeProps {
    caption?: ReactNode;
}

export function ClientLogoMarquee({ caption }: ClientLogoMarqueeProps) {
    return (
        <div>
            <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <div
                    className="marquee-track flex items-center w-max"
                    style={{ animation: "marquee-right 26s linear infinite" }}
                >
                    {[...logosRowTop, ...logosRowTop].map((logo, index) => (
                        <LogoItem key={`${logo.name}-top-${index}`} logo={logo} />
                    ))}
                </div>
            </div>

            {caption && (
                <div
                    style={{
                        background: "linear-gradient(to right, transparent, #f1f5f9 15%, #f1f5f9 85%, transparent)",
                    }}
                >
                    <p className="text-center text-base sm:text-lg py-4 sm:py-5">{caption}</p>
                </div>
            )}

            <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <div
                    className="marquee-track flex items-center w-max"
                    style={{ animation: "marquee-left 26s linear infinite" }}
                >
                    {[...logosRowBottom, ...logosRowBottom].map((logo, index) => (
                        <LogoItem key={`${logo.name}-bottom-${index}`} logo={logo} />
                    ))}
                </div>
            </div>
        </div>
    );
}
