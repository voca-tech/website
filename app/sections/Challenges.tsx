import Image from "next/image"

export default function ChallengesSection() {
    return (
        <div className="bg-gradient-to-br from-voca-gray-600 to-voca-gray-600/75 items-center py-16">
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
                    </div>
                </div>
            </div>

        </div>
    )
}