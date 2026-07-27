import { Instagram, Linkedin, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const contentLinks = [
    { name: "Produto", href: "/produto" },
    { name: "Por que o VOCA", href: "/por-que-voca" },
    { name: "Cases de sucesso", href: "/casos-de-sucesso" },
    { name: "Segurança & Compliance", href: "/seguranca" },
    { name: "Calculadora de ROI", href: "/roi" },
    { name: "Soluções por perfil", href: "/publico-alvo" },
    { name: "Sobre o VOCA", href: "/sobre" },
    { name: "Dúvidas frequentes", href: "/faq" },
    { name: "Blog", href: "/blog" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative bg-slate-900 pt-16 pb-8 px-6 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-voca-green to-transparent" />
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
                }}
            />
            <Image
                src="/voca-symbol.png"
                alt=""
                width={280}
                height={344}
                aria-hidden="true"
                className="absolute -right-10 -bottom-16 opacity-[0.04] brightness-0 invert select-none pointer-events-none"
            />

            <div className="relative max-w-7xl mx-auto">
                <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12 pb-12 border-b border-white/10">
                    <div className="col-span-2 lg:col-span-1 flex flex-col gap-5">
                        <Link href="/">
                            <Image
                                src="/logo-voca-negativo.png"
                                alt="Logo da empresa VOCA"
                                width={140}
                                height={70}
                                className="h-9 w-auto"
                            />
                        </Link>
                        <p className="text-sm text-white/60 max-w-xs leading-relaxed">
                            Cuidamos de pessoas para que elas possam cuidar das empresas.
                        </p>
                        <div className="flex gap-3">
                            <SocialIcon href="https://www.instagram.com/vocarh/" label="Instagram" icon={Instagram} />
                            <SocialIcon href="https://www.linkedin.com/company/vocarh/" label="LinkedIn" icon={Linkedin} />
                        </div>
                    </div>

                    <FooterColumn title="Conteúdo">
                        {contentLinks.map((item) => (
                            <FooterLink key={item.href} href={item.href}>{item.name}</FooterLink>
                        ))}
                    </FooterColumn>

                    <FooterColumn title="Contato">
                        <a
                            href="mailto:contato@voca.com.br"
                            className="flex items-start gap-2.5 text-sm text-white/70 hover:text-white transition-colors duration-200"
                        >
                            <Mail size={15} className="shrink-0 mt-0.5 text-voca-green" />
                            contato@voca.com.br
                        </a>
                        <a
                            href="https://wa.me/553175303000?text=Olá!%20Gostaria%20de%20entender%20mais%20sobre%20o%20VOCA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-2.5 text-sm text-white/70 hover:text-white transition-colors duration-200"
                        >
                            <Phone size={15} className="shrink-0 mt-0.5 text-voca-green" />
                            (31) 7530-3000
                        </a>
                        <div className="flex items-start gap-2.5 text-sm text-white/70">
                            <MapPin size={15} className="shrink-0 mt-0.5 text-voca-green" />
                            <span>
                                Rua Joaquim Lustosa, 15, Apto. 302
                                <br />
                                Anchieta, Belo Horizonte/MG
                                <br />
                                CEP 30310-410
                            </span>
                        </div>
                    </FooterColumn>

                    <FooterColumn title="Legal">
                        <FooterLink href="/privacyPolicy">Política de Privacidade</FooterLink>
                        <FooterLink href="/termsOfUse">Termos de Uso</FooterLink>
                    </FooterColumn>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 text-xs text-white/40 text-center sm:text-left">
                    <p>Copyright © {year} · VOCA · Todos os direitos reservados</p>
                    <p>CRP Soluções Comunicativas Ltda-ME · CNPJ 28.037.495/0001-42</p>
                </div>
            </div>
        </footer>
    )
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="flex flex-col gap-3.5">
            <p className="text-xs font-bold uppercase tracking-widest text-white/40">{title}</p>
            {children}
        </div>
    )
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
    return (
        <Link href={href} className="text-sm text-white/70 hover:text-white transition-colors duration-200 w-fit">
            {children}
        </Link>
    )
}

function SocialIcon({ href, label, icon: Icon }: { href: string; label: string; icon: LucideIcon }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors duration-200 hover:bg-voca-green hover:border-voca-green hover:text-white"
        >
            <Icon size={18} />
        </a>
    )
}
