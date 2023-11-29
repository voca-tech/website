"use client"
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionLayoutProps {
    Image: JSX.Element;
    title: string;
    children: React.ReactNode;
}

export default function Functionalities() {
    const options = [
        { value: 0, name: 'Termômetro de Humor', color: 'bg-teal-600', component: <Thermometer /> },
        { value: 1, name: 'Voz para os colaboradores', color: 'bg-zinc-600', component: <Opinion /> },
        { value: 2, name: 'Pesquisas em tempo real', color: 'bg-zinc-600', component: <Thermometer /> },
        { value: 3, name: 'Rede Social Corporativa', color: 'bg-zinc-600', component: <Thermometer /> },
        { value: 4, name: 'Treinamentos e Gamificação', color: 'bg-zinc-600', component: <Thermometer /> },
        { value: 5, name: 'Avaliação de Desempenho', color: 'bg-zinc-600', component: <Thermometer /> },
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
                    <h1 className="text-5xl">{title}</h1>
                    <div className="mt-8">
                        {children}
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
                <p>Saiba o humor do seu time</p>
            </SectionLayout>
        )
    }

    function Opinion() {
        return (
            <SectionLayout
                Image={<Image src="/illustrations/functionalities/opiniao.png" width={500} height={500} alt="Imagem Opinião" />}
                title="VOCA Opinião"
            >
                <p>5 canais customizados</p>
                <p>Incentive a cultura de feedback</p>
                <p>Reconheça as pessoas do seu time</p>
            </SectionLayout>
        )
    }

    return (
        <div className={`${selectedOption.color} py-14 px-4`}>
            <div className="max-w-7xl mx-auto">
                <div className="inline-flex gap-4 bg-white/70 w-full p-4 rounded-md shadow-md">
                    {options.map(option => (
                        <Button
                            key={option.value}
                            variant={option.value == selectedOption.value ? 'default' : 'ghost'}
                            onClick={() => setSelectedIndex(option.value)}
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


function ModuleIllustration({ index }: { index: number }) {
    const config = [
        { src: '/illustrations/chat.png' },
        { src: '/illustrations/meeting.png' },
        { src: '/illustrations/team-work.png' },
        { src: '/illustrations/chat.png' },
        { src: '/illustrations/meeting.png' },
    ]

    return (
        <Image
            src={config[index].src}
            alt="Ilustração"
            width={500}
            height={300}
            className="h-96 aspect-square"
        />
    )
}