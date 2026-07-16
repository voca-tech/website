'use client'

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappLink } from "@/components/WhatsappLink";
import { cn } from "@/lib/utils";
import { faqs } from "../sections/FAQ";

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

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

            <div className="relative max-w-3xl mx-auto">
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm font-bold tracking-widest text-voca-green uppercase">
                        Dúvidas frequentes
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                        Perguntas que a gente sempre recebe
                    </h1>
                    <p className="text-lg text-slate-500 mt-4">
                        Não achou o que procurava? Fale direto com a gente pelo WhatsApp ou agende uma demonstração.
                    </p>
                </div>

                <div className="flex flex-col gap-3 mt-10">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={faq.question}
                                className={cn(
                                    "rounded-2xl border border-slate-200 bg-white overflow-hidden transition-colors duration-300",
                                    isOpen && "border-voca-green/40"
                                )}
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    aria-expanded={isOpen}
                                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                                >
                                    <span className={cn("font-semibold", isOpen ? "text-voca-green" : "text-slate-900")}>
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        size={20}
                                        className={cn(
                                            "shrink-0 text-slate-400 transition-transform duration-300",
                                            isOpen && "rotate-180 text-voca-green"
                                        )}
                                    />
                                </button>

                                <div
                                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                                >
                                    <div className="overflow-hidden">
                                        <p className="text-slate-500 text-sm leading-relaxed px-5 pb-4">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 mt-12">
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
