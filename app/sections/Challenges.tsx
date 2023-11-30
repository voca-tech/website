import { Button } from "@/components/ui/button"
import { ArrowLeftSquare, ArrowRightSquare, ChevronsDown, ChevronsUp } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function ChallengesSection() {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div id="challenges" className="bg-gradient-to-b from-voca-green/70 to-voca-green items-center py-14 px-6">
            <div className="max-w-5xl m-auto text-slate-200">
                <h1 className="text-center text-4xl font-semibold">Sua empresa passa por algum desses desafios?</h1>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mt-10">
                    <Image
                        src='/illustrations/superHero.png'
                        alt="Super herói"
                        width={500}
                        height={350}
                    />
                    <div className="flex flex-col gap-6 items-center text-center lg:items-start">
                        <p>· Baixa frequencia de feedbacks</p>
                        <p>· Fragilidade na saúde emocional</p>
                        <p>· Transformar dados em recomendação</p>
                        <p>· Melhorar a experiência do colaborador</p>
                        <p>· Equipes espalhadas / Distância entre gestor e time</p>
                        <p>· Voz para os colaboradores</p>
                        <p>· Governança e Compliance</p>
                        {!showDetails ? (
                            <Button
                                variant='ghost'
                                onClick={() => setShowDetails((currentState) => !currentState)}
                                className=""
                            >
                                <ChevronsDown size={18} className="mr-1" />
                                <p>Ver Mais</p>
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                onClick={() => setShowDetails((currentState) => !currentState)}
                                className=""
                            >
                                <ChevronsUp size={18} className="mr-1" />
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
            <div className="px-4 py-6 bg-white shadow-lg rounded-2xl bg-opacity-20 border border-slate-300 h-full">
                <h2 className="text-xl font-bold leading-5 text-slate-100">{title}</h2>
                <div className="mt-4 text-slate-200 flex flex-col gap-4">{content}</div>
            </div>
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

    function MobileView() {
        return (
            <div className="mt-8 flex flex-col gap-4 items-center justify-center mx-auto">
                <div className="flex flex-col gap-4">
                    {cardsContent[currentPage].map((card: CardProps) => (
                        <CardElement key={card.title} title={card.title} content={card.content} />
                    ))}
                </div>

                <div className="flex items-center justify-between gap-4">
                    <Button variant="ghost" className={`${currentPage == 0 && 'text-slate-400'}`} onClick={handlePreviousPage}>
                        <ArrowLeftSquare size={28} />
                    </Button>
                    <p className="text-sm">{currentPage + 1} / {numberOfPages}</p>
                    <Button variant="ghost" className={`${currentPage == numberOfPages - 1 && 'text-slate-400'}`} onClick={handleNextPage}>
                        <ArrowRightSquare size={28} />
                    </Button>
                </div>

            </div>
        )
    }

    function DesktopView() {
        return (
            <div className="mt-8 grid grid-cols-12 gap-4 items-center justify-between">
                <Button variant={"ghost"} className={`${currentPage == 0 && 'invisible'} col-span-1`} onClick={handlePreviousPage}>
                    <ArrowLeftSquare size={28} />
                </Button>

                <div className="grid grid-cols-3 gap-4 col-span-10">
                    {cardsContent[currentPage].map((card: CardProps) => (
                        <CardElement key={card.title} title={card.title} content={card.content} />
                    ))}
                </div>

                <Button variant="ghost" className={`${currentPage == numberOfPages - 1 && 'invisible'} col-span-1`} onClick={handleNextPage}>
                    <ArrowRightSquare size={28} />
                </Button>
            </div>
        )
    }

    return (
        <>
            <div className="hidden lg:block">
                <DesktopView />
            </div>

            <div className="visible lg:hidden">
                <MobileView />
            </div>
        </>
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
                    <p>Em um mundo globalizado, equipes distribuídas tornaram-se comuns. No entanto, a distância física não deve significar distância emocional ou operacional.</p>
                    <p>Equipes bem conectadas e alinhadas, mesmo estando remotas, apresentam até 25% mais produtividade. (Harvard Business Review)</p>
                </>
        },
        {
            title: 'Avaliações de Desempenho, Experiência e Desligamento',
            content:
                <>
                    <p>Processos ineficientes de avaliação de desempenho podem resultar em falta de reconhecimento, o que afeta diretamente a experiência do colaborador e contribui para taxas elevadas de turnover.</p>
                    <p>Empresas com avaliações de desempenho consistentes registram um aumento de 14% na satisfação do cliente. (Gallup)</p>
                </>
        },
        {
            title: 'Treinamento de Equipes e Gamificação',
            content:
                <>
                    <p>O treinamento convencional pode ser muito chato. A gamificação transforma a aprendizagem em uma experiência mais envolvente, incentivando a participação ativa e a retenção de conhecimento.</p>
                    <p>87% dos colaboradores afirmam que a gamificação torna o seu ambiente de trabalho mais produtivo e engajador. (TalentLMS)</p>
                </>
        }
    ],
    [
        {
            title: 'Compliance, ESG e Auditorias',
            content:
                <>
                    <p>Manter-se em conformidade com regulamentações e padrões do mercado é vital, mas pode ser complexo e desafiador. Processos claros e ferramentas adequadas são essenciais para assegurar que todas as normas estão sendo seguidas.</p>
                    <p>93% dos investidores aceitariam pagar prêmio extra por ações de empresas com práticas ESG. (International Finance Corporation)</p>
                </>
        },
        {
            title: 'Desalinhamento da Cultura Corporativa',
            content:
                <>
                    <p>Uma cultura corporativa não clara ou desalinhada pode causar conflitos internos e afetar a entrega de valor ao cliente.</p>
                    <p>94% dos executivos e 88% dos funcionários acreditam que uma cultura corporativa sólida é fundamental para o sucesso dos negócios. (Deloitte)</p>
                </>
        },
        {
            title: 'Voz para os colaboradores',
            content:
                <>
                    <p>Colaboradores que sentem que não têm voz estão menos engajados e menos propensos a dar o extra pela empresa.</p>
                    <p>Empresas que promovem a escuta ativa têm 4,6 vezes mais chances de reter os melhores talentos. (Institute for Corporate Productivity)</p>
                </>
        }
    ],
    [
        {
            title: 'Baixa Frequência de Feedbacks',
            content:
                <>
                    <p>A ausência de feedback regular pode desmotivar colaboradores e gerar incertezas sobre seu desempenho.</p>
                    <p>60% dos funcionários desejam feedback diário ou semanal. (PwC)</p>
                </>
        },
        {
            title: 'Melhorar a Experiência do Colaborador',
            content:
                <>
                    <p> Uma experiência ruim do colaborador pode resultar em alta rotatividade e baixa satisfação no trabalho.</p>
                    <p>Empresas com uma experiência positiva para o colaborador superam seus concorrentes em até 82%. (Glassdoor)</p>
                </>
        },
        {
            title: 'Transformar Dados em Recomendações',
            content:
                <>
                    <p>Dados sem ação são apenas números. Transformá-los em recomendações significativas é o que realmente agrega valor.</p>
                    <p>Líderes que confiam e usam seus dados tem uma vantagem competitiva: as empresas onde atuam conquistam até 22% mais lucratividade. (Capgemini)</p>
                </>
        }
    ],
    [
        {
            title: 'Desconhecimento do Clima Organizacional',
            content:
                <>
                    <p>Ignorar o clima organizacional pode levar à desmotivação, baixa produtividade e até mesmo conflitos internos.</p>
                    <p>89% dos profissionais de RH afirmam que o feedback regular sobre o clima organizacional é essencial para o sucesso da empresa. (SHRM)</p>
                </>
        },
        {
            title: 'Fragilidade na Saúde Emocional dos Times',
            content:
                <>
                    <p>A saúde emocional dos colaboradores impacta diretamente em sua produtividade, engajamento e satisfação no trabalho.</p>
                    <p>Para cada dólar investido na saúde do colaborador, US$ 4,00 retornam como lucro para a empresa. (World Economic Forum)</p>
                </>
        }
    ]
]