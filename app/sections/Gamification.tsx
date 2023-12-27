import Image from "next/image";

export default function Gamification() {
    return (
        <div id="gamification" className="bg-[#070725] bg-gamification">
            <div className="py-16 px-6 max-w-7xl m-auto flex flex-col lg:flex-row items-center text-center gap-8 justify-center">
                <Image
                    src='/illustrations/gamification.png'
                    alt="dashboards"
                    width={450}
                    height={450}
                />

                <div className="text-blue-50">
                    <h1 className="text-3xl font-semibold">Uma experiência gamificada </h1>
                    <h3 className="text-xl mt-2">Engajamento em alta escala para seus colaboradores</h3>

                    <div className="mt-10 flex flex-col gap-4">
                        <p>- Promova o engajamento sem perder o foco</p>
                        <p>- Facilite o aprendizado de forma dinâmica e divertida</p>
                        <p>- Forneça feedback imediato e reconhecimento pelas conquistas</p>
                        <p>- Envolva as equipes com desafios e recompensas</p>
                        <p>- Acompanhe o progresso e desempenho através dos dados</p>
                    </div>
                </div>

            </div>

        </div>
    )
}