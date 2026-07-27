'use client'

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SplitText from "@/components/ui/split-text";
import { Button } from "@/components/ui/button";

export default function FinalCallToAction() {
    return (
        <div className="relative py-24 sm:py-32 px-6 overflow-hidden bg-white">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.3]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,121,128,0.18) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
            </div>

            <div className="relative max-w-6xl mx-auto">
                <SplitText
                    tag="h2"
                    text="Dê o primeiro passo hoje e transforme o dia a dia da sua empresa. "
                    className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]"
                    splitType="chars"
                    textAlign="left"
                    delay={22}
                    duration={1.1}
                    ease="power2.out"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-50px"
                    scrub={1}
                    scrubEnd="bottom 30%"
                />

                <div className="mt-10 flex justify-center">
                    <Link href="/contact" className="group">
                        <Button
                            className="relative overflow-hidden bg-voca-green hover:bg-voca-green/90 rounded-md px-8 h-14 text-base font-semibold shadow-lg shadow-voca-green/20 transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:shadow-voca-green/30 group-hover:-translate-y-0.5"
                        >
                            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
                            <span className="relative z-10 flex items-center">
                                Entrar em contato
                                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={18} />
                            </span>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
