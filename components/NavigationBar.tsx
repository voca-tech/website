'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
    Menu, ChevronDown, LogIn,
    Sparkles, ArrowRight, Calculator, HelpCircle,
    Building2, Newspaper, ShieldCheck, Brain,
    type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ScrollProgressBar } from './ScrollProgressBar';

interface DropdownItem {
    name: string;
    href: string;
    icon: LucideIcon;
}

const porQueVocaItems: DropdownItem[] = [
    { name: "Por que o VOCA", href: "/por-que-voca", icon: Sparkles },
    { name: "Cases de sucesso", href: "/casos-de-sucesso", icon: ArrowRight },
    { name: "Calculadora de ROI", href: "/roi", icon: Calculator },
    { name: "Segurança & Compliance", href: "/seguranca", icon: ShieldCheck },
    { name: "NR-1 e riscos psicossociais", href: "/seguranca#nr1", icon: Brain },
];

const empresaItems: DropdownItem[] = [
    { name: "Sobre o VOCA", href: "/sobre", icon: Building2 },
    { name: "Dúvidas frequentes", href: "/faq", icon: HelpCircle },
    { name: "Blog", href: "/blog", icon: Newspaper },
];

const OnDarkContext = createContext(false)

export function NavBar() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const [onDark, setOnDark] = useState(false)
    const navRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (pathname === '/' && window.location.hash) {
            window.history.replaceState(null, '', pathname)
        }
    }, [pathname])

    useEffect(() => {
        function onScroll() {
            setScrolled(window.scrollY > 24)
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        let raf = 0

        function update() {
            raf = 0
            const nav = navRef.current
            if (!nav) return

            const probeY = nav.getBoundingClientRect().bottom + 4
            let dark = false

            document.querySelectorAll<HTMLElement>('[data-nav-dark]').forEach((section) => {
                if (dark) return
                const rect = section.getBoundingClientRect()
                if (rect.width > 0 && rect.top <= probeY && rect.bottom >= probeY) dark = true
            })

            setOnDark((prev) => (prev === dark ? prev : dark))
        }

        function onScroll() {
            if (!raf) raf = requestAnimationFrame(update)
        }

        update()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
            if (raf) cancelAnimationFrame(raf)
        }
    }, [pathname])

    return (
        <OnDarkContext.Provider value={onDark}>
        <nav
            ref={navRef}
            id="home"
            className={cn(
                "sticky top-0 inset-x-0 z-50 px-6 border-b backdrop-saturate-150 transition-[padding,background-color,backdrop-filter,border-color,box-shadow] duration-500",
                scrolled && (onDark
                    ? "py-1.5 bg-slate-950/25 backdrop-blur-2xl border-white/15 shadow-lg"
                    : "py-1.5 bg-white/30 backdrop-blur-2xl border-white/40 shadow-lg"),
                !scrolled && (onDark
                    ? "py-4 bg-slate-950/10 backdrop-blur-md border-transparent shadow-none"
                    : "py-4 bg-white/20 backdrop-blur-md border-transparent shadow-none")
            )}
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
            <ScrollProgressBar />

            <div className="grid grid-cols-2 lg:grid-cols-3 items-center max-w-7xl m-auto">
                <Link href='/' className="justify-self-start">
                    <Image
                        src={onDark ? '/logo-voca-negativo.png' : '/logo-voca.png'}
                        alt="Logomarcar VOCA"
                        width={126}
                        height={40}
                        className={cn(
                            "w-auto transition-all duration-500",
                            scrolled ? "h-6" : "h-9"
                        )}
                        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                    />
                </Link>

                <div
                    className={cn(
                        "hidden lg:flex justify-self-center items-center transition-[gap] duration-500",
                        scrolled ? "gap-5" : "gap-8"
                    )}
                    style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                >
                    <MenuItem name="Produto" reference="/produto" />
                    <NavDropdown label="Por que VOCA" items={porQueVocaItems} />
                    <MenuItem name="Soluções" reference="/publico-alvo" />
                    <NavDropdown label="Empresa" items={empresaItems} />
                </div>

                <div className="hidden lg:flex justify-self-end items-center gap-5">
                    <DemoButton />
                    <LoginLink />
                </div>

                <div className={cn(
                    "lg:hidden justify-self-end transition-colors duration-500",
                    onDark ? "text-white" : "text-slate-700"
                )}>
                    <Popover>
                        <PopoverTrigger className={cn(
                            "flex items-center p-2 -mr-2 rounded-md transition-colors",
                            onDark ? "hover:bg-white/15" : "hover:bg-slate-100"
                        )}>
                            <Menu size={22} />
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-80 max-h-[80vh] overflow-y-auto">
                            <div className="flex flex-col gap-1">
                                <MenuItem name="Início" reference="/" isMobile />
                                <MenuItem name="Produto" reference="/produto" isMobile />

                                <MobileGroup label="Por que VOCA" items={porQueVocaItems} />

                                <MenuItem name="Soluções" reference="/publico-alvo" isMobile />

                                <MobileGroup label="Empresa" items={empresaItems} />

                                <MenuItem name="Contato" reference="#contact" isMobile />

                                <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
                                    <DemoButton isMobile />
                                    <LoginLink isMobile />
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </nav>
        </OnDarkContext.Provider>
    )
}

interface NavDropdownProps {
    label: string;
    items: DropdownItem[];
    viewAllHref?: string;
}

function navTextClass(onDark: boolean) {
    return onDark
        ? "text-white hover:text-teal-300"
        : "text-slate-700 hover:text-voca-green"
}

function NavDropdown({ label, items, viewAllHref }: NavDropdownProps) {
    const onDark = useContext(OnDarkContext)

    return (
        <div className="group relative">
            <button className={cn(
                "flex items-center gap-1 py-2 text-sm font-medium transition-colors duration-300 whitespace-nowrap",
                navTextClass(onDark)
            )}>
                {label}
                <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
            </button>

            <div className="absolute z-50 left-1/2 top-full w-72 -translate-x-1/2 pt-3 opacity-0 invisible translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0">
                <div className="rounded-xl border border-slate-200 bg-white shadow-lg p-2">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-slate-50 transition-colors"
                        >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-voca-green/10 text-voca-green">
                                <item.icon size={16} />
                            </span>
                            <span className="text-sm font-medium text-slate-700">{item.name}</span>
                        </Link>
                    ))}
                    {viewAllHref && (
                        <Link
                            href={viewAllHref}
                            className="block mt-1 pt-2.5 border-t border-slate-100 px-3 py-1.5 text-sm font-semibold text-voca-green hover:underline"
                        >
                            Ver tudo →
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

function MobileGroup({ label, items, viewAllHref }: NavDropdownProps) {
    return (
        <div className="py-1">
            <p className="text-xs font-bold tracking-widest text-slate-400 uppercase px-1 pt-3 pb-1">{label}</p>
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-md px-1 py-2 hover:bg-slate-50 transition-colors"
                >
                    <item.icon size={16} className="text-voca-green shrink-0" />
                    <span className="text-base text-slate-600">{item.name}</span>
                </Link>
            ))}
            {viewAllHref && (
                <Link href={viewAllHref} className="block px-1 py-1.5 text-sm font-semibold text-voca-green">
                    Ver tudo →
                </Link>
            )}
        </div>
    )
}

interface MenuItemProps {
    name: string,
    reference: string,
    isMobile?: boolean
}

function MenuItem({ name, reference, isMobile = false }: MenuItemProps) {
    const pathname = usePathname()
    const onDark = useContext(OnDarkContext)
    const isHash = reference.startsWith('#')
    const isSamePageHash = isHash && pathname === '/'
    const href = isHash ? (pathname === '/' ? reference : `/${reference}`) : reference

    function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
        if (!isSamePageHash) return
        event.preventDefault()
        document.querySelector(reference)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={cn(
                "cursor-pointer font-medium transition-colors duration-300 whitespace-nowrap",

                isMobile ? "text-base py-2 text-slate-700 hover:text-voca-green" : cn("text-sm", navTextClass(onDark))
            )}
        >
            {name}
        </Link>
    )
}

function DemoButton({ isMobile = false }: { isMobile?: boolean }) {
    const onDark = useContext(OnDarkContext)

    return (
        <Link href='/contact'>
            <Button className={cn(
                'font-semibold transition-colors duration-300',

                !isMobile && onDark
                    ? 'bg-white text-voca-green hover:bg-white/90'
                    : 'bg-voca-green text-white hover:bg-voca-green/90',
                isMobile && 'w-full'
            )}>
                Agendar demonstração
            </Button>
        </Link>
    )
}

function LoginLink({ isMobile = false }: { isMobile?: boolean }) {
    const onDark = useContext(OnDarkContext)

    return (
        <a href="https://plataforma.voca.com.br/login" className={cn(isMobile && "w-full")}>
            <Button
                variant="outline"
                className={cn(
                    "font-semibold transition-colors duration-300",
                    !isMobile && onDark
                        ? "border-white/45 bg-transparent text-white hover:border-white hover:bg-white/15 hover:text-white"
                        : "border-slate-300 text-slate-700 hover:border-voca-green hover:text-voca-green hover:bg-voca-green/5",
                    isMobile && "w-full"
                )}
            >
                <LogIn size={15} className="mr-2" />
                Entrar
            </Button>
        </a>
    )
}
