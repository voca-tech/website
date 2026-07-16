'use client'

import { useRef } from "react";
import { PhoneScene } from "@/components/PhoneScene";
import { useScrollProgress } from "@/components/useScrollProgress";

export default function PhoneTestPage() {
    const rigRef = useRef<HTMLDivElement>(null);
    const progress = useScrollProgress(rigRef as React.RefObject<HTMLElement>);

    return (
        <div className="bg-white">
            <section className="min-h-screen flex items-center px-6">
                <div className="max-w-md">
                    <p className="text-sm font-bold tracking-widest text-voca-green uppercase">
                        DHO na palma da mão
                    </p>
                    <h1 className="text-4xl font-extrabold text-slate-900 mt-4">
                        Teste de animação 3D
                    </h1>
                    <p className="text-lg text-slate-500 mt-4">
                        Role a página para ver o celular atravessar a tela.
                    </p>
                </div>
            </section>

            <div ref={rigRef} className="relative" style={{ height: "150vh" }}>
                <div className="sticky top-0 h-screen w-full pointer-events-none">
                    <PhoneScene progressRef={progress} />
                </div>
            </div>

            <section className="min-h-screen flex items-center justify-end px-6">
                <div className="max-w-md text-right">
                    <h2 className="text-3xl font-extrabold leading-tight">
                        <span className="text-slate-900">Turnover não avisa.</span>
                        <br />
                        <span className="text-voca-green">Seus dados, sim.</span>
                    </h2>
                    <p className="text-lg text-slate-500 mt-4">
                        Acompanhe o clima da sua empresa em tempo real.
                    </p>
                </div>
            </section>
        </div>
    );
}
