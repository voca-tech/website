import Image from "next/image";

import logo from '@/public/whatsapp.svg'
import { Button } from "../ui/button";

export function WhatsappLink() {
    return (
        <a aria-label="Conversar no Whatsapp" href="https://wa.me//553175303000?text=Olá!%20Gostaria%20de%20entender%20mais%20sobre%20o%20VOCA" target="_blank">
            <Button
                variant={"outline"}
                className="w-72 flex gap-2 shadow-xl hover:bg-green-50"
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