import Image from "next/image"

export default function PartnersSection() {
    const logos = [
        { name: 'Watson', src: '/partners/watson.png', width: 90, height: 90 },
        { name: 'UFMG', src: '/partners/ufmg.png', width: 130, height: 100 },
        { name: 'FiemgLab', src: '/partners/fiemgLab.png', width: 100, height: 100 },
        { name: 'Seed', src: '/partners/seed.png', width: 70, height: 70 },
        { name: 'Plugae', src: '/partners/plugae.png', width: 150, height: 150 },
    ]

    return (
        <div className="bg-white py-8 lg:py-16 px-6">
            <div className="flex flex-col gap-8 justify-center items-center text-center">
                <div>
                    <h2 className="text-2xl text-teal-700 font-bold">PARCEIROS</h2>
                    <h4 className="text-lg lg:text-2xl text-teal-700">que comprovam nossa qualidade</h4>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
                    {logos.map(logo => (
                        <Image
                            key={logo.name}
                            src={logo.src}
                            alt={logo.name}
                            width={logo.width}
                            height={logo.height}
                            className="grayscale hover:scale-110 hover:grayscale-0 transition-all object-contain h-auto"
                        />
                    ))}

                </div>
            </div>
        </div>
    )
}