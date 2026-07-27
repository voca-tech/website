'use client'

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { posts } from "./data";

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

const [featured, ...rest] = posts;

export default function BlogPage() {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".blog-card",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.12,
                    ease: "none",
                    scrollTrigger: { trigger: gridRef.current, start: "top 85%", end: "top 50%", scrub: 0.8 },
                }
            );
        }, gridRef);
        return () => ctx.revert();
    }, []);

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
                <div
                    className="absolute -top-32 right-[10%] w-[30rem] h-[30rem] rounded-full bg-voca-green/10 blur-3xl"
                    style={{ animation: "drift-a 28s ease-in-out infinite" }}
                />
            </div>

            <div className="relative max-w-2xl mx-auto text-center">
                <p className="text-sm font-bold tracking-widest text-voca-green uppercase">Blog</p>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight mt-3">
                    Conteúdo para quem cuida de pessoas
                </h1>
                <p className="text-lg text-slate-500 mt-5">
                    Artigos sobre cultura, engajamento, dados e gestão de pessoas, direto do time VOCA.
                </p>
                <p className="text-xs text-slate-400 mt-4">
                    Página de exemplo com conteúdo fictício (lorem ipsum), só para visualizar o layout.
                </p>
            </div>

            <div className="relative max-w-5xl mx-auto mt-14">
                <Link
                    href={`/blog/${featured.slug}`}
                    className="group grid grid-cols-1 md:grid-cols-2 rounded-3xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                    <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                        <Image
                            src={featured.coverPhoto}
                            alt={featured.title}
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 40%, ${featured.color}55)` }} />
                    </div>
                    <div className="p-8 sm:p-10 flex flex-col justify-center">
                        <p className="text-xs font-bold tracking-widest text-voca-green uppercase">Mais recente</p>
                        <span
                            className="inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide mt-3"
                            style={{ backgroundColor: `${featured.color}14`, color: featured.color }}
                        >
                            {featured.category}
                        </span>
                        <h2 className="font-extrabold text-slate-900 text-2xl sm:text-3xl mt-4 leading-snug group-hover:text-voca-green transition-colors">
                            {featured.title}
                        </h2>
                        <p className="text-slate-500 mt-3 leading-relaxed">{featured.excerpt}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-5">
                            <span>{formatDate(featured.date)}</span>
                            <span>·</span>
                            <span>{featured.readTime}</span>
                        </div>
                        <span
                            className="inline-flex items-center gap-1.5 text-sm font-bold mt-6"
                            style={{ color: featured.color }}
                        >
                            Ler artigo
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                        </span>
                    </div>
                </Link>
            </div>

            <div ref={gridRef} className="relative max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {rest.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="blog-card group rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className="relative aspect-[16/9] overflow-hidden">
                            <Image
                                src={post.coverPhoto}
                                alt={post.title}
                                fill
                                sizes="(min-width: 640px) 50vw, 100vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 50%, ${post.color}55)` }} />
                            <div
                                className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm"
                                style={{ color: post.color }}
                            >
                                <post.icon size={16} strokeWidth={2} />
                            </div>
                        </div>
                        <div className="p-6">
                            <span
                                className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
                                style={{ backgroundColor: `${post.color}14`, color: post.color }}
                            >
                                {post.category}
                            </span>
                            <h2 className="font-bold text-slate-900 text-lg mt-3 leading-snug group-hover:text-voca-green transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-sm text-slate-500 mt-2 leading-relaxed">{post.excerpt}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-400 mt-4">
                                <span>{formatDate(post.date)}</span>
                                <span>·</span>
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
