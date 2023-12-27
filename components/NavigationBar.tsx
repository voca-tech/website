'use client'

import { usePathname } from 'next/navigation'
import { Menu } from "lucide-react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function NavBar() {
    return (
        <nav id="home" className="px-4 py-3 z-10 bg-voca-green">
            <div className="flex justify-between items-center max-w-7xl m-auto">
                <Link href='/'>
                    <Image
                        src='/logo-voca-negativo.png'
                        alt="Logomarcar VOCA"
                        width={160}
                        height={80}
                    />
                </Link>
                <div className="hidden lg:visible lg:flex justify-center items-center gap-6 text-slate-800">
                    <MenuItem name="Início" reference="#home" />
                    <MenuItem name="Dores que resolvemos" reference="#challenges" />
                    <MenuItem name="Funcionalidades" reference="#functionalities" />
                    <MenuItem name="Gamificação" reference="#gamification" />
                    <MenuItem name="Depoimentos" reference="#testimonials" />
                    <LoginButton />
                    {/* <MenuItem name="Fale Conosco" reference="#contact" /> */}
                </div>

                <div className="lg:hidden text-white hover:cursor-pointer">
                    <Popover>
                        <PopoverTrigger className="flex items-center"><Menu /></PopoverTrigger>
                        <PopoverContent>
                            <div className="flex flex-col gap-6 text-teal-800">
                                <MenuItem name="Início" reference="#home" isMobile />
                                <MenuItem name="Dores que resolvemos" reference="#challenges" isMobile />
                                <MenuItem name="Funcionalidades" reference="#functionalities" isMobile />
                                <MenuItem name="Gamificação" reference="#gamification" isMobile />
                                <MenuItem name="Depoimentos" reference="#testimonials" isMobile />
                                <LoginButton isMobile/>
                                {/* <PopoverMenuItem name="Fale Conosco" reference="#contact" /> */}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </nav>
    )
}

interface MenuItemProps {
    name: string,
    reference: string,
    isMobile?: boolean
}

function MenuItem({ name, reference, isMobile = false }: MenuItemProps) {
    const pathname = usePathname()

    return (
        <Link
            href={pathname === '/' ? `${reference}` : `/${reference}`}
            className={cn("text-md cursor-pointer border-b-2 border-b-transparent hover:border-teal-600 w-fit", isMobile ? "text-teal-700" : "text-teal-50")}
        >
            {name}
        </Link>
    )
}

function LoginButton({ isMobile = false}: { isMobile?: boolean }) {
    return (
        <a href='https://plataforma.voca.com.br/login'>
            <Button variant={isMobile ? 'default' : 'outline'} className={cn('text-sm', isMobile && '')}>
                Entrar
            </Button>
        </a>
    )
}