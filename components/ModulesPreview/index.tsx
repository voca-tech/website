"use client"
import { useState } from "react";
import { Button } from "../ui/button";
import { ActivitySquare, GaugeCircle, GraduationCap, MessagesSquare, Newspaper } from 'lucide-react';
import Image from "next/image";

export function ModulesPreview() {
    const [selectedOption, setSelectedOption] = useState(0)

    function handleButtonVariant(index: number) {
        return selectedOption === index ? 'default' : 'ghost'
    }

    return (
        <div className="flex gap-6">
            <div className='w-fit items-start flex flex-col gap-4'>
                <Button variant={handleButtonVariant(0)} onClick={() => setSelectedOption(0)}>
                    <MessagesSquare size={16} className={selectedOption == 0 ? 'text-slate-200 mr-2' : 'text-slate-600 mr-2'} />
                    VOCA Opinião
                </Button>
                <Button variant={handleButtonVariant(1)} onClick={() => setSelectedOption(1)}>
                    <ActivitySquare size={16} className={selectedOption == 1 ? 'text-slate-200 mr-2' : 'text-slate-600 mr-2'} />
                    VOCA Pulso
                </Button>
                <Button variant={handleButtonVariant(2)} onClick={() => setSelectedOption(2)}>
                    <Newspaper size={16} className={selectedOption == 2 ? 'text-slate-200 mr-2' : 'text-slate-600 mr-2'} />
                    VOCA Integra
                </Button>
                <Button variant={handleButtonVariant(3)} onClick={() => setSelectedOption(3)}>
                    <GraduationCap size={16} className={selectedOption == 3 ? 'text-slate-200 mr-2' : 'text-slate-600 mr-2'} />
                    VOCA Conhecimento
                </Button>
                <Button variant={handleButtonVariant(4)} onClick={() => setSelectedOption(4)}>
                    <GaugeCircle size={16} className={selectedOption == 4 ? 'text-slate-200 mr-2' : 'text-slate-600 mr-2'} />
                    VOCA Desempenho
                </Button>
            </div>

            <ModuleIllustration index={selectedOption} />
        </div>
    )
}

function ModuleIllustration({ index }: { index: number }) {
    const config = [
        {src: '/illustrations/chat.png'},
        {src: '/illustrations/meeting.png'},
        {src: '/illustrations/team-work.png'},
        {src: '/illustrations/chat.png'},
        {src: '/illustrations/meeting.png'},
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