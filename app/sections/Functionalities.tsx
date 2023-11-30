"use client"
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsappLink } from "@/components/WhatsappLink";

interface SectionLayoutProps {
    Image: JSX.Element;
    title: string;
    children: React.ReactNode;
}

interface SectionProps {
    value: number,
    name: string,
    customStyles: string,
    component: React.ReactNode
}

export default function Functionalities() {
    const options: SectionProps[] = [
        { value: 0, name: 'Termômetro de Humor', customStyles: 'from-[#47ad7f] to-[#4d836b]', component: <Thermometer /> },
        { value: 1, name: 'Voz para os colaboradores', customStyles: 'from-[#007980] to-[#1b4547]', component: <Opinion /> },
        { value: 2, name: 'Pesquisas em tempo real', customStyles: 'from-[#c77924] to-[#81592e]', component: <Pulse /> },
        { value: 3, name: 'Rede Social Corporativa', customStyles: 'from-[#798f4f] to-[#555f41]', component: <SocialNetwork /> },
        { value: 4, name: 'Treinamentos e Gamificação', customStyles: 'from-[#85568a] to-[#503d52]', component: <Knowledge /> },
        { value: 5, name: 'Avaliação de Desempenho', customStyles: 'from-[#90a4ad] to-[#39484e]', component: <PerformanceEvaluation /> },
    ]

    const [selectedIndex, setSelectedIndex] = useState(0)
    const selectedOption = options[selectedIndex]
    const numberOfOptions = options.length

    function handleNextSection() {
        if (selectedIndex == numberOfOptions - 1) {
            return;
        } else {
            setSelectedIndex(selectedIndex + 1)
        }
    }

    function handlePreviousSection() {
        if (selectedIndex == 0) {
            return;
        } else {
            setSelectedIndex(selectedIndex - 1)
        }
    }

    function SectionLayout({ Image, title, children }: SectionLayoutProps) {
        return (
            <div className="mt-10 grid grid-cols-12 gap-2">
                <Button className={cn("my-auto rounded-full aspect-square text-white", selectedIndex == 0 && 'invisible')} variant='ghost' onClick={handlePreviousSection}>
                    <ChevronsLeft />
                </Button>
                <div className="col-span-5">
                    {Image}
                </div>
                <div className="text-white col-span-5">
                    <h1 className="text-4xl font-semibold">{title}</h1>
                    <div className="mt-16 flex flex-col gap-8 font-light">
                        {children}
                        <WhatsappLink />
                    </div>
                </div>
                <Button className={cn("my-auto rounded-full aspect-square text-white", selectedIndex == numberOfOptions && 'invisible')} variant='ghost' onClick={handleNextSection}>
                    <ChevronsRight className="my-auto" />
                </Button>
            </div>
        )
    }

    function Thermometer() {
        return (
            <SectionLayout
                Image={<Image src="/illustrations/functionalities/termometro.png" width={500} height={500} alt="Imagem Termômetro" />}
                title="Termômetro de Humor"
            >
                <p>✔ Captura ativa do sentimento diário da empresa</p>
                <p>✔ Captura passiva do sentimento do colaborador</p>
                <p>✔ Alertas para RH e Lideranças</p>
                <p>✔ Relatórios segmentados em tempo real</p>
            </SectionLayout>
        )
    }

    function Opinion() {
        return (
            <SectionLayout
                Image={<Image src="/illustrations/functionalities/opiniao.png" width={500} height={500} alt="Imagem Opinião" />}
                title="Voz na veia para colaboradores"
            >
                <p>5 canais customizados para transformar pessoas e a empresa</p>
                <p>✔ Incentive a cultura de feedback contínuo</p>
                <p>✔ Reconheça as pessoas do seu time</p>
                <p>✔ Tenha voz com a garantia do anonimato</p>
                <p>✔ Potencialize idéias inovadoras da equipe</p>

            </SectionLayout>
        )
    }

    function Pulse() {
        return (
            <SectionLayout
                Image={<Image src="/illustrations/functionalities/pulso.png" width={500} height={500} alt="Imagem Termômetro" />}
                title="Pesquisas diversas em tempo real"
            >
                <p>Saiba como está a satisfação do time em tempo real</p>
                <p>✔ Crie pesquisas customizadas em poucos cliques</p>
                <p>✔ Tenha insights da empresa toda ou segmentado por área</p>
                <p>✔ Dispare pesquisas automáticas nos processos da empresa.</p>

            </SectionLayout>
        )
    }

    function SocialNetwork() {
        return (
            <SectionLayout
                Image={<Image src="/illustrations/functionalities/integra.png" width={500} height={500} alt="Imagem Termômetro" />}
                title="Rede social corporativa com IA"
            >
                <p>Rede social corporativa com IA</p>
                <p>✔ Integre idéias e potencialize a comunicação interna</p>
                <p>✔ Facilite o engajamento dos colaboradores com a empresa</p>
                <p>✔ Dissemine a cultura corporativa pela gamificação</p>
                <p>✔ Garanta a eficácia da comunicação interna</p>

            </SectionLayout>
        )
    }

    function Knowledge() {
        return (
            <SectionLayout
                Image={<Image src="/illustrations/functionalities/conhecimento.png" width={500} height={500} alt="Imagem Termômetro" />}
                title="Treinamentos e Gamificação"
            >
                <p>Capacite e potencialize o desenvolvimento das pessoas</p>
                <p>✔ Permita um onboarding mais escalável dos times</p>
                <p>✔ Crie trilhas de desenvolvimento individuais ou por equipes</p>
                <p>✔ Potencialize o aprendizado através da gamificação</p>
                <p>✔ Centralize a gestão de documentos entre os times</p>

            </SectionLayout>
        )
    }

    function PerformanceEvaluation() {
        return (
            <SectionLayout
                Image={<Image src="/illustrations/functionalities/desempenho.png" width={500} height={500} alt="Imagem Termômetro" />}
                title="Avaliação de desempenho, experiência e desligamento"
            >
                <p>✔ Avalie o colaborador em poucos cliques dentro da sua jornada na empresa</p>
                <p>✔ Flexibilize avaliações por equipes ao longo do ano</p>
                <p>✔ Avalie gaps de habilidades nas equipes e direcione trilhas de aprendizado</p>
                <p>✔ Saiba o quanto o novo colaborador está aderente à cultura e ao cargo</p>
                <p>✔ Entenda os motivos pelos quais sua empresa perde talentos</p>

            </SectionLayout>
        )
    }

    return (
        <div id="functionalities" className={`bg-gradient-to-br ${selectedOption.customStyles} py-14 px-4`}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 bg-white/70 w-full p-4 rounded-md shadow-md">
                    {options.map(option => (
                        <Button
                            key={option.value}
                            variant={option.value == selectedOption.value ? 'default' : 'ghost'}
                            onClick={() => setSelectedIndex(option.value)}
                            className="md:py-7"
                        >
                            {option.name}
                        </Button>
                    ))}
                </div>
                {selectedOption.component}
            </div>
        </div>
    )
}