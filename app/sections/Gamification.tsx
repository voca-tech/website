import Image from "next/image";

export default function Gamification() {
    return (
        <div id="gamification" className="bg-[#080829] bg-gamification">
            <div className="py-16 px-6 max-w-7xl m-auto flex flex-col lg:flex-row items-center text-center gap-8 justify-center">
                <Image
                    src='/illustrations/gamification.png'
                    alt="dashboards"
                    width={450}
                    height={450}
                />

                <div className="text-blue-50">
                    <h1 className="text-3xl font-semibold">Uma experiência gamificada </h1>
                    <h3 className="text-xl mt-2"></h3>

                    <div className="mt-10 flex flex-col gap-4">
                        <p>- Dissemine conhecimentos de forma fácil e prática</p>
                        <p>- Engaje os colaboradores</p>
                        <p>- Acumular moedas</p>
                        <p>- Troque por recompensas incríveis </p>
                    </div>
                </div>

            </div>

        </div>
    )
}