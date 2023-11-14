"use client"
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function FunctionalitiesSection() {
    const options = [
        {value: 0, name: 'Termômetro de Humor', color: 'bg-teal-600'},
        {value: 1, name: 'Voz para os colaboradores', color: 'bg-zinc-600'}
    ]

    const [selectedOption, setSelectedOption] = useState(options[0])

    function Section() {
        switch (selectedOption.value) {
            case 0:
                return <Thermometer />
            case 1:
                return <Opinion />
            // case 2:
            //     return <Pulse />
            // case 3:
            //     return <SocialNetwork />
            // case 4:
            //     return <Knowledge />
            // case 5:
            //     return <Performance />
            default:
                return <Thermometer />
        }
    }

    return (
        <div className={`${selectedOption.color}`}>
            <div className="inline-flex">
                {options.map(option => (
                    <Button key={option.value} onClick={() => setSelectedOption(option)}>
                        {option.name}
                    </Button>
                ))}
            </div>
            <Section />
        </div>
    )
}

interface DefaultLayoutProps {
    Image: JSX.Element;
    title: string;
    children: React.ReactNode;
}

function DefaultLayout({ Image, title, children }: DefaultLayoutProps) {
    return (
        <div className="py-8 px-6 max-w-7xl m-auto grid grid-cols-1 md:grid-cols-2">
            {Image}
            <div className="text-white">
                <h1 className="text-5xl">{title}</h1>
                <div className="mt-8">
                    {children}
                </div>
            </div>
        </div>
    )
}

function Thermometer() {
    return (
        <DefaultLayout
            Image={<Image src="/illustrations/functionalities/termometro.png" width={500} height={500} alt="Imagem Termômetro" />}
            title="Termômetro de Humor"
        >
            <p>Saiba o humor do seu time</p>
        </DefaultLayout>
    )
}

function Opinion() {
    return (
        <DefaultLayout
            Image={<Image src="/illustrations/functionalities/opiniao.png" width={500} height={500} alt="Imagem Opinião" />}
            title="VOCA Opinião"
        >
            <p>5 canais customizados</p>
            <p>Incentive a cultura de feedback</p>
            <p>Reconheça as pessoas do seu time</p>
        </DefaultLayout>
    )
}

// function Pulse() {
//     return (
//         <DefaultLayout customStyles="bg-zinc-600" />
//     )
// }

// function SocialNetwork() {
//     return (
//         <DefaultLayout customStyles="bg-orange-600" />
//     )
// }

// function Knowledge() {
//     return (
//         <DefaultLayout customStyles="bg-purple-600" />
//     )
// }

// function Performance() {
//     return (
//         <DefaultLayout customStyles="bg-yellow-600" />
//     )
// }






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