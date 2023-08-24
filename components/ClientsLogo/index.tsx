import Image from "next/image"

export function ClientLogos() {
    const logos = [
        { name: 'Akaer', src: '/clients/akaer.png', width: 100, height: 100 },
        { name: 'Credi10', src: '/clients/credi10.png', width: 100, height: 100 },
        { name: 'Belas Artes', src: '/clients/belasartes.png', width: 100, height: 100 },
        { name: 'Woodbridge', src: '/clients/woodbridge.png', width: 200, height: 100 },
        // { name: 'DHS', src: '/clients/dhs.png' },
    ]

    return (
        <div className="flex flex-col gap-4 justify-center items-center ">
            <p className="text-2xl text-zinc-500">Conheça alguns dos <span className="text-teal-700 font-bold">nossos clientes</span></p>
            <div className="flex gap-16">
                {logos.map(logo => (
                    <Image
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