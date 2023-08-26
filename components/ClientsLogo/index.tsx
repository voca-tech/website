import Image from "next/image"

export function ClientLogos() {
    const logos = [
        { name: 'Akaer', src: '/clients/akaer.png', width: 80, height: 80 },
        { name: 'Credi10', src: '/clients/credi10.png', width: 80, height: 80 },
        { name: 'Belas Artes', src: '/clients/belasartes.png', width: 80, height: 80 },
        { name: 'Woodbridge', src: '/clients/woodbridge.png', width: 160, height: 80 },
        // { name: 'DHS', src: '/clients/dhs.png' },
    ]

    return (
        <div className="flex flex-col gap-4 justify-center items-center ">
            <h2 className="text-2xl text-zinc-500">Conheça alguns dos <span className="text-teal-700 font-bold">nossos clientes</span></h2>
            <div className="flex flex-wrap justify-center gap-6 md:gap-16">
                {logos.map(logo => (
                    <Image
                        key={logo.name}
                        src={logo.src}
                        alt={logo.name}
                        width={logo.width}
                        height={logo.height}
                        className="grayscale hover:scale-110 transition-all"
                    />
                ))}

            </div>
        </div>
    )
}