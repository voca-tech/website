import Image from "next/image"

export function ClientLogos() {
    const logos = [
        { name: 'Akaer', src: '/clients/akaer.png' },
        { name: 'Credi10', src: '/clients/credi10.png' },
        { name: 'Belas Artes', src: '/clients/belasartes.png' },
        { name: 'Woodbridge', src: '/clients/woodbridge.png' },
        { name: 'DHS', src: '/clients/dhs.png' },
    ]

    return (
        <div className="flex gap-4">
            {logos.map(logo => (
                <Image
                    src={logo.src}
                    alt={logo.name}
                    width={200}
                    height={200}
                    className="grayscale hover:grayscale-0"
                />
            ))}

        </div>
    )
}