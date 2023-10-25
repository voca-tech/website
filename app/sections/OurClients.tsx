import Image from "next/image"

export default function OurClientsSection() {
    const logos = [
        { name: 'Akaer', src: '/clients/akaer.png', width: 100, height: 100 },
        { name: 'Credi10', src: '/clients/credi10.png', width: 100, height: 100 },
        { name: 'Belas Artes', src: '/clients/belasartes.png', width: 100, height: 100 },
        { name: 'Woodbridge', src: '/clients/woodbridge.png', width: 200, height: 100 },
        // { name: 'DHS', src: '/clients/dhs.png' },
    ]

    return (
        <div className="bg-white py-16 px-6">

            <div className="flex flex-col gap-10 justify-center items-center text-center max-w-7xl m-auto">
                <h2 className="text-2xl text-teal-700">Uma jornada à quatro mãos, com empresas que <br /> dão voz aos seus colaboradores!
                    {/* <span className="text-teal-700 font-bold">nossos clientes</span> */}
                </h2>
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
        </div>
    )
}