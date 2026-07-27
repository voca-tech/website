'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShieldCheck, ArrowRight, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappLink } from "@/components/WhatsappLink";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ClientLogoMarquee } from "@/components/ClientLogoMarquee";
import { cn } from "@/lib/utils";
import { securityFeatures, nr1Support, digitalShieldLayers, awsPillars } from "./data";

const credi10Metrics = [
    { value: "100%", label: "conformidade para auditoria" },
    { value: "+50", label: "interações anônimas" },
    { value: "92%", label: "confiança nos canais de voz" },
];

const featureProof: Record<string, { company: string; metric: string; slug: string }> = {
    "Trilhas com certificação": { company: "Credi10", metric: "100% na trilha obrigatória", slug: "credi10-treinamentos" },
};

const securityFaqs = [
    {
        question: "Vocês têm certificação ISO 27001 ou SOC 2?",
        answer: "Ainda não. O VOCA segue a LGPD e mantém processos rastreáveis e auditáveis, mas ainda não possui certificações internacionais como ISO 27001 ou SOC 2.",
    },
    {
        question: "Como funciona a conformidade com a LGPD na prática?",
        answer: "Os dados dos colaboradores são tratados em conformidade com a legislação brasileira de proteção de dados desde o primeiro dia de uso da plataforma.",
    },
    {
        question: "A ouvidoria é realmente anônima?",
        answer: "Sim. É um canal de denúncia e escuta com anonimato garantido, com relatórios prontos para auditoria externa. O colaborador decide se quer se identificar ou não.",
    },
    {
        question: "Os relatórios servem para auditoria externa e ESG?",
        answer: "Sim. O histórico de treinamentos, políticas internas e interações fica rastreável e pronto para uso em processos de ESG e por reguladores.",
    },
    {
        question: "Quem pode acessar os dados dos colaboradores?",
        answer: "O acesso é organizado por perfil dentro da plataforma (RH, liderança, colaborador), e cada um vê só o que é relevante para a sua função.",
    },
];

export default function SegurancaPage() {
    const [activeFaq, setActiveFaq] = useState(0);

    return (
        <div className="relative bg-white">
            <div className="relative py-24 sm:py-36 px-6 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=80')",
                        backgroundAttachment: "fixed",
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, rgba(1,20,22,0.72) 25%, rgba(1,70,74,0.5) 100%)" }}
                />
                <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "26px 26px",
                    }}
                />

                <div className="relative max-w-3xl mx-auto text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-white uppercase backdrop-blur-sm">
                        <ShieldCheck size={13} />
                        Segurança & Compliance
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-[1.05] mt-5">
                        Dados protegidos, processos rastreáveis
                    </h1>
                    <p className="text-lg text-white/70 mt-5 max-w-xl mx-auto">
                        Segurança da informação e governança não são um adicional, fazem parte de como o VOCA foi construído.
                    </p>
                </div>
            </div>

            <div className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #012e31 0%, #0a1f21 100%)" }}>
                <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "26px 26px",
                    }}
                />

                <div className="relative max-w-6xl mx-auto px-6 py-20 sm:py-24">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <p className="text-sm font-mono font-bold tracking-widest text-teal-300 uppercase">{"// Segurança em camadas"}</p>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
                            O que já protege seus dados hoje
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {securityFeatures.map((feature) => {
                            const Icon = feature.icon;
                            const proof = featureProof[feature.title];
                            return (
                                <div
                                    key={feature.title}
                                    className="group relative rounded-xl overflow-hidden bg-white/[0.04] border-l-4 p-6 flex flex-col transition-all duration-300 hover:bg-white/[0.08]"
                                    style={{ borderLeftColor: feature.color }}
                                >
                                    <Icon
                                        size={104}
                                        strokeWidth={1}
                                        aria-hidden="true"
                                        className="absolute -right-5 -bottom-5 pointer-events-none opacity-[0.05] transition-opacity duration-300 group-hover:opacity-[0.09]"
                                        style={{ color: feature.color }}
                                    />

                                    <div className="relative">
                                        <div
                                            className="flex h-12 w-12 items-center justify-center rounded-lg"
                                            style={{
                                                backgroundColor: `${feature.color}22`,
                                                color: feature.color,
                                                boxShadow: `0 8px 20px -8px ${feature.color}80`,
                                            }}
                                        >
                                            <Icon size={22} />
                                        </div>
                                        <h3 className="font-bold text-white mt-5">{feature.title}</h3>
                                        <p className="text-sm text-white/50 mt-2 leading-relaxed">{feature.description}</p>

                                        {proof && (
                                            <Link
                                                href={`/casos-de-sucesso#${proof.slug}`}
                                                className="group/proof inline-flex items-center gap-1.5 text-xs font-bold mt-4 pt-4 border-t border-white/10"
                                                style={{ color: feature.color }}
                                            >
                                                {proof.company} · {proof.metric}
                                                <ArrowRight size={12} className="transition-transform group-hover/proof:translate-x-0.5" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="relative mt-8 rounded-2xl border-l-4 border-teal-300 bg-white/[0.04] overflow-hidden p-8 sm:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
                            <div>
                                <div className="flex items-center gap-2.5 mb-4">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white p-1.5">
                                        <Image
                                            src="/clients/credi10.png"
                                            alt="Credi10"
                                            width={22}
                                            height={22}
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-300">
                                        {"// Caso verificado · Credi10"}
                                    </span>
                                </div>
                                <p className="text-xl sm:text-2xl font-bold text-white leading-snug">
                                    &ldquo;O Voca é um canal de ouvidoria seguro e confiável. Hoje, nossos colaboradores se sentem ouvidos e protegidos, e a ferramenta é parte essencial da cultura da Credi10.&rdquo;
                                </p>
                                <div className="flex items-center gap-3 mt-6">
                                    <Avatar className="h-11 w-11 ring-2 ring-white/20 shadow-sm">
                                        <AvatarImage src="/avatars/credi10-erika.jpg" />
                                    </Avatar>
                                    <div>
                                        <p className="font-bold text-white text-sm">Erika Freitas</p>
                                        <p className="text-white/50 text-xs">Coordenadora de RH · Credi10</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl bg-white/[0.06] grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 divide-y sm:divide-x sm:divide-y-0 lg:divide-x-0 lg:divide-y divide-white/10">
                                {credi10Metrics.map((metric) => (
                                    <div key={metric.label} className="p-4 text-center sm:text-center lg:text-left">
                                        <p className="text-2xl sm:text-3xl font-extrabold text-teal-300">{metric.value}</p>
                                        <p className="text-xs text-white/50 mt-1 leading-snug">{metric.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-14 sm:py-16 px-6 bg-white">
                <p className="text-center text-xs font-bold tracking-widest text-slate-400 uppercase mb-6">
                    Empresas que já confiam seus dados ao VOCA
                </p>
                <ClientLogoMarquee />
            </div>

            <div className="relative overflow-hidden py-20 sm:py-28 px-6" style={{ background: "linear-gradient(160deg, #0a1520 0%, #16283a 100%)" }}>
                <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />

                <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-300/10 px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-blue-300 uppercase">
                            {"// Blindagem digital"}
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-5 leading-tight">
                            Camadas de proteção, não só uma trava na porta
                        </h2>
                        <p className="text-white/60 mt-4 leading-relaxed">
                            Nenhuma barreira sozinha é suficiente. Por isso os dados da sua empresa passam por três camadas de proteção que trabalham ao mesmo tempo.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {digitalShieldLayers.map((layer, index) => {
                            const Icon = layer.icon;
                            return (
                                <div
                                    key={layer.title}
                                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                                    style={{ marginLeft: `${index * 1.25}rem` }}
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-400/15 text-blue-300">
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">{layer.title}</p>
                                        <p className="text-sm text-white/50 mt-1 leading-relaxed">{layer.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="relative py-20 sm:py-24 px-6 bg-slate-50 overflow-hidden">
                <Cloud size={420} strokeWidth={0.5} className="absolute -right-24 -top-24 text-voca-green/[0.05] pointer-events-none" />

                <div className="relative max-w-4xl mx-auto text-center">
                    <span className="inline-flex items-center rounded-full bg-voca-green/10 px-4 py-1.5 text-xs font-bold tracking-widest text-voca-green uppercase">
                        Infraestrutura
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-5">
                        Rodando na nuvem AWS
                    </h2>
                    <p className="text-slate-500 mt-4 max-w-xl mx-auto leading-relaxed">
                        O VOCA roda sobre a infraestrutura da Amazon Web Services, a mesma nuvem usada por empresas do mundo inteiro.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                    {awsPillars.map((pillar) => {
                        const Icon = pillar.icon;
                        return (
                            <div key={pillar.title} className="text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-voca-green/10 text-voca-green mx-auto">
                                    <Icon size={22} />
                                </div>
                                <h3 className="font-bold text-slate-900 mt-4">{pillar.title}</h3>
                                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{pillar.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div id="nr1" className="relative py-24 sm:py-36 px-6 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=2000&q=80')",
                        backgroundAttachment: "fixed",
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(160deg, rgba(1,46,49,0.88) 0%, rgba(1,107,114,0.8) 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-[0.08]"
                        style={{
                            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p
                            aria-hidden="true"
                            className="text-[9rem] sm:text-[18rem] font-black text-white/[0.06] leading-none select-none whitespace-nowrap"
                        >
                            NR-1
                        </p>
                    </div>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto">
                        <span className="inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/10 px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-teal-300 uppercase">
                            Atenção especial · NR-1
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-5 leading-tight">
                            Apoio para a gestão de riscos psicossociais
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
                        <div>
                            <p className="text-white/70 text-lg leading-relaxed">
                                A NR-1 passou a exigir que empresas mapeiem e gerenciem riscos psicossociais no ambiente de trabalho, como estresse, sobrecarga e assédio. O VOCA não substitui a avaliação técnica exigida pela norma, mas oferece as ferramentas de escuta e dados que sustentam esse trabalho no dia a dia.
                            </p>
                            <div className="mt-8">
                                <Link href="/contact">
                                    <Button className="bg-white text-voca-green hover:bg-white/90 rounded-md px-6 h-12 text-base font-semibold">
                                        Falar sobre NR-1 com o time
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-2xl border-l-4 border-teal-300 bg-white/[0.06] backdrop-blur-sm p-6 sm:p-8">
                            <div className="flex items-center gap-2.5 mb-5">
                                <ShieldCheck size={20} className="text-teal-300" />
                                <p className="font-bold text-white text-sm font-mono uppercase tracking-wide">Como o VOCA ajuda</p>
                            </div>
                            <ul className="flex flex-col gap-3.5">
                                {nr1Support.map((item) => (
                                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
                                        <Check size={16} className="shrink-0 mt-0.5 text-teal-300" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-16 sm:py-20 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center max-w-xl mx-auto">
                        <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Perguntas frequentes</p>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                            Sobre segurança e conformidade
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 lg:gap-8 mt-10">
                        <div className="flex flex-col gap-1.5">
                            {securityFaqs.map((faq, index) => {
                                const isActive = index === activeFaq;
                                return (
                                    <button
                                        key={faq.question}
                                        type="button"
                                        onClick={() => setActiveFaq(index)}
                                        className={cn(
                                            "text-left rounded-lg px-4 py-3.5 text-sm font-semibold transition-colors duration-150 border-l-4",
                                            isActive
                                                ? "bg-voca-green/5 border-voca-green text-voca-green"
                                                : "border-transparent text-slate-600 hover:bg-slate-50"
                                        )}
                                    >
                                        {faq.question}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="rounded-xl border-l-4 border-voca-green bg-slate-50 p-8 sm:p-10">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                                {String(activeFaq + 1).padStart(2, "0")} / {String(securityFaqs.length).padStart(2, "0")}
                            </span>
                            <p className="text-xl font-bold text-slate-900 mt-2">
                                {securityFaqs[activeFaq].question}
                            </p>
                            <p className="text-slate-500 mt-3 leading-relaxed">
                                {securityFaqs[activeFaq].answer}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-12 pt-8 border-t border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Documentos legais</p>
                        <Link href="/privacyPolicy" className="text-sm font-semibold text-voca-green hover:underline underline-offset-4">
                            Política de Privacidade
                        </Link>
                        <Link href="/termsOfUse" className="text-sm font-semibold text-voca-green hover:underline underline-offset-4">
                            Termos de Uso
                        </Link>
                    </div>
                </div>
            </div>

            <div className="relative overflow-hidden py-20 sm:py-24 px-6" style={{ background: "linear-gradient(135deg, #012e31 0%, #016b72 100%)" }}>
                <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />
                <div className="relative max-w-2xl mx-auto text-center">
                    <p className="text-white font-bold text-lg">
                        Segurança é só uma parte da história.
                    </p>
                    <Link
                        href="/por-que-voca"
                        className="group inline-flex items-center gap-1.5 text-sm font-bold text-teal-300 mt-2"
                    >
                        Veja por que empresas escolhem o VOCA
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>

                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 mt-8">
                        <Link href="/contact">
                            <Button className="bg-white text-voca-green hover:bg-white/90 rounded-md px-6 h-12 text-base font-semibold">
                                Agendar demonstração
                            </Button>
                        </Link>
                        <WhatsappLink
                            variant="text"
                            className="font-semibold text-white hover:underline underline-offset-4"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
