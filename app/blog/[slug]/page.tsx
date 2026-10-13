import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { posts } from "../data";

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) return {};

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: `${post.title} | VOCA`,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
            images: [post.coverPhoto],
        },
    };
}

export function generateStaticParams() {
    return posts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) notFound();

    const relatedPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

    return (
        <div className="relative bg-white py-16 sm:py-20 px-6 overflow-hidden">
            <div
                className="absolute -top-32 -left-32 w-[26rem] h-[26rem] rounded-full blur-3xl opacity-[0.12] pointer-events-none"
                style={{ backgroundColor: post.color, animation: "drift-b 26s ease-in-out infinite" }}
            />

            <div className="relative max-w-2xl mx-auto">
                <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-voca-green hover:underline">
                    <ArrowLeft size={15} />
                    Voltar para o blog
                </Link>

                <div className="mt-8">
                    <span
                        className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
                        style={{ backgroundColor: `${post.color}14`, color: post.color }}
                    >
                        {post.category}
                    </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight mt-4">
                    {post.title}
                </h1>

                <div className="flex items-center gap-3 mt-6 pb-6 border-b border-slate-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-voca-green/10">
                        <Image src="/voca-symbol.png" alt="" width={14} height={17} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-900">Equipe VOCA</p>
                        <p className="text-xs text-slate-400">
                            {formatDate(post.date)} · {post.readTime}
                        </p>
                    </div>
                </div>

                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mt-8 shadow-lg">
                    <Image
                        src={post.coverPhoto}
                        alt={post.title}
                        fill
                        sizes="(min-width: 672px) 672px, 100vw"
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 60%, ${post.color}4D)` }} />
                </div>

                <div className="max-w-none mt-8 flex flex-col gap-5">
                    {post.content.map((block, i) =>
                        block.startsWith("## ") ? (
                            <h2 key={i} className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-4">
                                {block.slice(3)}
                            </h2>
                        ) : (
                            <p key={i} className="text-slate-600 leading-relaxed">{block}</p>
                        )
                    )}
                </div>
            </div>

            {relatedPosts.length > 0 && (
                <div className="relative max-w-5xl mx-auto mt-16 pt-12 border-t border-slate-100">
                    <p className="text-sm font-bold tracking-widest text-voca-green uppercase text-center">
                        Continue lendo
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
                        {relatedPosts.map((related) => (
                            <Link
                                key={related.slug}
                                href={`/blog/${related.slug}`}
                                className="group rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <Image
                                        src={related.coverPhoto}
                                        alt={related.title}
                                        fill
                                        sizes="(min-width: 640px) 33vw, 100vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 50%, ${related.color}55)` }} />
                                </div>
                                <div className="p-5">
                                    <span
                                        className="inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                                        style={{ backgroundColor: `${related.color}14`, color: related.color }}
                                    >
                                        {related.category}
                                    </span>
                                    <h3 className="font-bold text-slate-900 text-sm mt-2.5 leading-snug group-hover:text-voca-green transition-colors">
                                        {related.title}
                                    </h3>
                                    <span
                                        className="inline-flex items-center gap-1 text-xs font-bold mt-3"
                                        style={{ color: related.color }}
                                    >
                                        Ler
                                        <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
