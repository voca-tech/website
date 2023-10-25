import Image from "next/image"

export default function PartnersSection() {
    const logos = [
        { name: 'Akaer', src: '/clients/akaer.png', width: 100, height: 100 },
        { name: 'Credi10', src: '/clients/credi10.png', width: 100, height: 100 },
        { name: 'Belas Artes', src: '/clients/belasartes.png', width: 100, height: 100 },
        { name: 'Woodbridge', src: '/clients/woodbridge.png', width: 200, height: 100 },
        // { name: 'DHS', src: '/clients/dhs.png' },
    ]

    return (
        <div className="bg-white py-16 px-6">

            <div className="flex flex-col gap-8 justify-center items-center text-center">
                <div>
                    <h2 className="text-2xl text-teal-700 font-bold">PARCEIROS</h2>
                    <h4 className="text-teal-700">que comprovam nossa qualidade</h4>
                </div>
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