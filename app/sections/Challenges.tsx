import { Button } from "@/components/ui/button"
import { ArrowBigDown, ChevronsDown, ChevronsUp, StepBack, StepForward } from "lucide-react"
import Image from "next/image"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useState } from "react"

export default function ChallengesSection() {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div className="bg-gradient-to-b from-voca-green/70 to-voca-green items-center py-16">
            <div className="max-w-5xl px-6 m-auto text-slate-200">
                <h1 className="text-center text-4xl font-semibold">Sua empresa passa por algum desses desafios?</h1>
                <div className="flex justify-between gap-6 mt-10">
                    <Image
                        src='/illustrations/superHero.png'
                        alt="Super herói"
                        width={500}
                        height={350}
                    />
                    <div className="flex flex-col gap-6">
                        <p>- Baixa frequencia de feedbacks</p>
                        <p>- Fragilidade na saúde emocional</p>
                        <p>- Transformar dados em recomendação</p>
                        <p>- Melhorar a experiência do colaborador</p>
                        <p>- Equipes espalhadas / Distância entre gestor e time</p>
                        <p>- Voz para os colaboradores</p>
                        <p>- Governança e Compliance</p>
                        {!showDetails ? (
                            <Button
                                variant='secondary'
                                onClick={() => setShowDetails((currentState) => !currentState)}
                                className="mr-auto"
                            >
                                <ChevronsDown size={18} className="mr-1"/>
                                <p>Ver Mais</p>
                            </Button>
                        ) : (
                            <Button
                                variant="secondary"
                                onClick={() => setShowDetails((currentState) => !currentState)}
                                className="mr-auto"
                            >
                                <ChevronsUp size={18} className="mr-1"/>
                                <p>Ver Menos</p>
                            </Button>
                        )}
                    </div>
                </div>
                {showDetails && (
                    <DetailsSection />
                )}
            </div>

        </div>
    )
}

function DetailsSection() {
    const [currentPage, setCurrentPage] = useState(0)
    const numberOfPages = cardsContent.length

    function CardElement({ title, content }: CardProps) {
        return (
            <Card className="w-full h-full col-span-3">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {content}
                </CardContent>
            </Card>
        )
    }

    function handlePreviousPage() {
        if (currentPage > 0) {
            setCurrentPage((page) => page - 1)
        }
    }

    function handleNextPage() {
        if (currentPage < numberOfPages) {
            setCurrentPage((page) => page + 1)
        }
    }

    return (
        <div className="mt-8 grid grid-cols-11 gap-4 items-center justify-between">
            <Button variant={"ghost"} className={`${currentPage == 0 && 'invisible'}`} onClick={handlePreviousPage}>
                <StepBack />
            </Button>

            {cardsContent[currentPage].map((card: CardProps) => (
                <CardElement key={card.title} title={card.title} content={card.content} />
            ))}

            <Button variant={"ghost"} className={`${currentPage == numberOfPages - 1 && 'invisible'}`} onClick={handleNextPage}>
                <StepForward />
            </Button>
        </div>
    )
}

interface CardProps {
    title: string,
    content: React.ReactNode
}

const cardsContent: CardProps[][] = [
    [
        {
            title: 'Equipes espalhadas / Distância entre gestor e time',
            content:
                <>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum odit deserunt voluptatem impedit excepturi ipsam eum corporis omnis cumque, sed fugit necessitatibus</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </>
        },
        {
            title: 'Avaliação de Desempenho',
            content:
                <>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum odit deserunt voluptatem impedit excepturi ipsam eum corporis omnis cumque, sed fugit necessitatibus</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </>
        },
        {
            title: 'Compliance / ESG',
            content:
                <>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum odit deserunt voluptatem impedit excepturi ipsam eum corporis omnis cumque, sed fugit necessitatibus</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </>
        }
    ],
    [
        {
            title: 'Cultura',
            content:
                <>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum odit deserunt voluptatem impedit excepturi ipsam eum corporis omnis cumque, sed fugit necessitatibus</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </>
        },
        {
            title: 'Voz para colaboradores',
            content:
                <>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum odit deserunt voluptatem impedit excepturi ipsam eum corporis omnis cumque, sed fugit necessitatibus</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </>
        },
        {
            title: 'Baixa frequencia feedback',
            content:
                <>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum odit deserunt voluptatem impedit excepturi ipsam eum corporis omnis cumque, sed fugit necessitatibus</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </>
        }
    ]
]