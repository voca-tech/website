import { Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-black text-white">

            <div className='py-16 px-6 max-w-7xl m-auto flex flex-col gap-10'>
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
                            <Instagram />
                            <Linkedin />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p>Início</p>
                        <p>Termos de Uso</p>
                        <p>Política de Privacidade</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p>contato@voca.com.br</p>
                        <p>CNPJ: 28.037.495/0001-42</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}