import Image from "next/image";

export function NavBar() {
    return (
        <nav className="shadow-sm shadow-teal-900 px-4 py-3 z-10 sticky top-0 bg-gradient-to-t from-teal-700 to-teal-900">
            <div className="flex justify-between items-center max-w-7xl m-auto">
                <Image
                    src='/logo-voca-negativo.png'
                    alt="Logomarcar VOCA"
                    width={160}
                    height={80}
                />
                <div className="flex gap-6 text-slate-800">
                    <MenuItem name="Home" />
                    <MenuItem name="Quem Somos" />
                    <MenuItem name="Como Funciona" />
                    <MenuItem name="Fale Conosco" />
                </div>
            </div>
        </nav>
    )
}

function MenuItem({ name }: { name: string }) {
    return (
        <p className="text-md text-teal-50 cursor-pointer border-b-2 border-b-transparent hover:border-teal-600 ">
            {name}
        </p>
    )
}