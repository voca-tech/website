import Image from "next/image"

const logos = [
    { name: 'Akaer', src: '/clients/akaer.png', width: 140, height: 140 },
    { name: 'Credi10', src: '/clients/credi10.png', width: 140, height: 140 },
    { name: 'Belas Artes', src: '/clients/belasartes.png', width: 140, height: 140 },
    { name: 'NovoNordisk', src: '/clients/novoNordisk.png', width: 110, height: 82 },
    { name: 'Woodbridge', src: '/clients/woodbridge.png', width: 260, height: 130 },
    { name: 'HomeroCosta', src: '/clients/homeroCosta.png', width: 140, height: 140 },
]

export default function OurClientsSection() {
    return (
        <div className="bg-white py-8 lg:py-16 px-6">
            <div className="flex flex-col gap-10 justify-center items-center text-center max-w-7xl m-auto">
                <h2 className="text-lg lg:text-2xl text-teal-700">Uma jornada à quatro mãos, com empresas que <br /> dão voz aos seus colaboradores!
                </h2>

                <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                    <div
                        className="marquee-track flex items-center gap-16 md:gap-24 w-max"
                        style={{ animation: "marquee-right 22s linear infinite" }}
                    >
                        {[...logos, ...logos].map((logo, index) => (
                            <Image
                                key={`${logo.name}-${index}`}
                                src={logo.src}
                                alt={logo.name}
                                width={logo.width}
                                height={logo.height}
                                className="grayscale hover:scale-110 hover:grayscale-0 transition-all object-contain h-auto shrink-0"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
