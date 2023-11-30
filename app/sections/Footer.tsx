'use client'

import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const pathname = usePathname()

    return (
        <footer className="bg-slate-800 py-16 px-6">

            <div className='max-w-7xl m-auto flex flex-col gap-10 text-white'>
                <Image
                    src='/logo-voca-negativo.png'
                    alt="Logo da empresa VOCA"
                    width={200}
                    height={100}
                />

                <div className="grid grid-cols-3 w-full gap-12">
                    <div className="flex flex-col gap-4">
                        <p>Cuidamos de pessoas para que elas possam cuidar das empresas</p>

                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/vocarh/" target="_blank">
                                <Button variant='link' size='icon'><Instagram /></Button>
                            </a>
                            <a href="https://www.linkedin.com/company/vocarh/" target="_blank">
                                <Button variant='link' size='icon'><Linkedin /></Button>
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <MenuItem name="Início" reference={pathname === '/' ? '#home' : '/'} />
                        <MenuItem name='Termos de Uso' reference='/termsOfUse' />
                        <MenuItem name='Política de Privacidade' reference='/privacyPolicy' />
                    </div>

                    <div className="flex flex-col gap-4">
                        <p>contato@voca.com.br</p>
                        <p>CNPJ: 28.037.495/0001-42</p>
                        <p>Copyright © 2023 · VOCA · Todos os direitos reservados</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

interface MenuItemProps {
    name: string,
    reference: string
}

function MenuItem({ name, reference }: MenuItemProps) {
    return (
        <Link
            href={`${reference}`}
            className="text-md w-fit text-slate-50 cursor-pointer border-b-2 border-b-transparent hover:border-slate-200 "
        >
            {name}
        </Link>
    )
}