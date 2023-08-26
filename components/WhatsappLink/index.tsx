import Image from "next/image";

import logo from '@/public/whatsapp.svg'

export function WhatsappLink() {
    return (
        <div className='flex gap-2 md:gap-4 px-4 text-center items-center justify-center bg-white py-2 rounded-lg shadow border border-slate-200 hover:cursor-pointer hover:bg-gradient-to-tr hover:from-green-50 hover:to-green-100 transition-all'>
            <p className='text-green-600 font-bold'>Fale com a gente no Whatsapp</p>
            <Image
                src={logo}
                alt='Whatsapp Icon'
                width={50}
                height={50}
                className='text-green-600'
            />
        </div>
    )
}