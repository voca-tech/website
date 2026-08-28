'use client'

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappLink } from "@/components/WhatsappLink";
import { cn } from "@/lib/utils";
import { getLenisInstance } from "@/lib/lenis";
import { faqs, faqCategories } from "../sections/FAQ";

const SPRING = { type: "spring", stiffness: 210, damping: 26, mass: 0.9 } as const;

function normalize(text: string) {
    return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export default function FAQPage() {
    const [category, setCategory] = useState("all");
    const [query, setQuery] = useState("");
    const [openQuestion, setOpenQuestion] = useState<string | null>(null);
    const [returningQuestion, setReturningQuestion] = useState<string | null>(null);

    const visible = useMemo(() => {
        const term = normalize(query.trim());
        return faqs
            .filter((faq) => category === "all" || faq.category === category)
            .filter((faq) => (term ? normalize(`${faq.question} ${faq.answer}`).includes(term) : true));
    }, [category, query]);

    const selected = faqs.find((faq) => faq.question === openQuestion) ?? null;

    const closePanel = useCallback(() => {
        setReturningQuestion(openQuestion);
        setOpenQuestion(null);
    }, [openQuestion]);

    useEffect(() => {
        if (!selected) return;

        const lenis = getLenisInstance();
        lenis?.stop();

        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") closePanel();
        }
        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            lenis?.start();
        };
    }, [selected, closePanel]);

    function categoryLabel(id: string) {
        return faqCategories.find((item) => item.id === id)?.label;
    }

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

            <motion.div
                animate={{ scale: selected ? 0.985 : 1 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="relative max-w-5xl mx-auto"
            >
                <div className="text-center max-w-2xl mx-auto">
                    <h1 className="voca-title text-3xl sm:text-4xl font-extrabold">
                        Perguntas que a gente sempre recebe
                    </h1>
                    <p className="text-lg text-slate-500 mt-4">
                        Filtre por assunto ou busque pela sua dúvida. Se não achar, fale direto com a gente.
                    </p>
                </div>

                <div className="relative max-w-xl mx-auto mt-10">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Buscar por LGPD, app, integração..."
                        className="w-full rounded-full border border-slate-200 bg-white py-3.5 pl-11 pr-11 text-sm text-slate-700 shadow-sm outline-none transition-all duration-300 focus:border-voca-green/50 focus:ring-4 focus:ring-voca-green/10"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery("")}
                            aria-label="Limpar busca"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-6">
                    {[{ id: "all", label: "Todas" }, ...faqCategories].map((item) => {
                        const isActive = category === item.id;
                        const count = item.id === "all"
                            ? faqs.length
                            : faqs.filter((faq) => faq.category === item.id).length;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setCategory(item.id)}
                                className={cn(
                                    "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all duration-300 ease-out",
                                    isActive
                                        ? "border-voca-green bg-voca-green text-white shadow-md -translate-y-0.5"
                                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:-translate-y-0.5"
                                )}
                            >
                                {item.label}
                                <span className={cn("text-[11px]", isActive ? "text-white/70" : "text-slate-400")}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {visible.length === 0 ? (
                    <div className="rounded-2xl border-2 border-dashed border-slate-200 py-16 text-center mt-8">
                        <p className="text-slate-500 font-medium">Nenhuma pergunta encontrada.</p>
                        <p className="text-slate-400 text-sm mt-1">
                            Tente outro termo, ou fale com a gente pelo WhatsApp.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                        {visible.map((faq, index) => (
                            <motion.button
                                key={faq.question}
                                layoutId={`faq-${faq.question}`}
                                type="button"
                                onClick={() => setOpenQuestion(faq.question)}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
                                whileHover={{ y: -6 }}
                                whileTap={{ scale: 0.98 }}
                                style={{ visibility: openQuestion === faq.question || returningQuestion === faq.question ? "hidden" : "visible" }}
                                className="group min-h-[11rem] flex flex-col justify-between text-left rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-voca-green/40 focus-visible:ring-offset-2"
                            >
                                <motion.div layoutId={`faq-head-${faq.question}`}>
                                    <span className="block text-[10px] font-bold uppercase tracking-widest text-voca-green">
                                        {categoryLabel(faq.category)}
                                    </span>
                                    <p className="font-bold text-slate-900 leading-snug mt-1.5">
                                        {faq.question}
                                    </p>
                                </motion.div>

                                <span className="self-end flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-all duration-300 group-hover:bg-voca-green group-hover:text-white group-hover:rotate-90">
                                    <Plus size={16} />
                                </span>
                            </motion.button>
                        ))}
                    </div>
                )}

                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 mt-14">
                    <Link href="/contact">
                        <Button className="bg-voca-green hover:bg-voca-green/90 rounded-md px-6 h-12 text-base font-semibold">
                            Agendar demonstração
                        </Button>
                    </Link>
                    <WhatsappLink variant="text" />
                </div>
            </motion.div>

            <AnimatePresence>
                {selected && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        onClick={closePanel}
                        className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            <div className="fixed inset-0 z-50 flex items-center justify-center p-5 pointer-events-none">
                <AnimatePresence onExitComplete={() => setReturningQuestion(null)}>
                    {selected && (
                            <motion.div
                                key={selected.question}
                                layoutId={`faq-${selected.question}`}
                                transition={SPRING}
                                className="pointer-events-auto w-full max-w-xl overflow-hidden rounded-[1.75rem] bg-white p-7 sm:p-9 shadow-2xl"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <motion.div layoutId={`faq-head-${selected.question}`}>
                                        <span className="block text-[10px] font-bold uppercase tracking-widest text-voca-green">
                                            {categoryLabel(selected.category)}
                                        </span>
                                        <p className="font-bold text-slate-900 leading-snug mt-1.5 text-xl sm:text-2xl">
                                            {selected.question}
                                        </p>
                                    </motion.div>

                                    <motion.button
                                        onClick={closePanel}
                                        aria-label="Fechar"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                        transition={{ delay: 0.12, duration: 0.35, ease: "easeOut" }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.92 }}
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-voca-green hover:text-white transition-colors duration-300"
                                    >
                                        <X size={17} />
                                    </motion.button>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                                    transition={{ delay: 0.14, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <div className="h-px bg-slate-100 my-5" />
                                    <p className="text-slate-600 leading-relaxed">{selected.answer}</p>
                                </motion.div>
                            </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
