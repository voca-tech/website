import Image from "next/image";

import logo from '@/public/whatsapp.svg'
import { Button } from "./ui/button";

interface WhatsappLinkProps {
    variant?: 'button' | 'text';
    className?: string;
}

export function WhatsappLink({ variant = 'button', className }: WhatsappLinkProps) {
    const href = "https://wa.me//553175303000?text=Olá!%20Gostaria%20de%20entender%20mais%20sobre%20o%20VOCA"

    if (variant === 'text') {
        return (
            <a
                aria-label="Conversar no Whatsapp"
                href={href}
                target="_blank"
                className={className ?? "font-semibold text-voca-green hover:underline underline-offset-4"}
            >
                Falar com especialista →
            </a>
        )
    }

    return (
        <a
            aria-label="Conversar no Whatsapp"
            href={href}
            target="_blank"
            className="w-full max-w-72"
        >
            <Button
                variant={"outline"}
                className="w-full flex gap-2 shadow-xl hover:bg-green-50"
            >
                <p className='text-green-700 font-bold'>Falar com um Especialista</p>
                <Image
                    src={logo}
                    alt='Whatsapp Icon'
                    width={30}
                    height={30}
                    className='text-green-600'
                />
            </Button>
        </a>
    )
}