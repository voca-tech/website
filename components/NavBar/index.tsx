import Image from "next/image";

export function NavBar() {
    return (
        <nav className="flex justify-between items-center shadow-md px-4 py-3">
            <Image
                src='/logo-voca.png'
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
        </nav>
    )
}

function MenuItem({ name }: { name: string }) {
    return (
        <p className="text-md cursor-pointer border-b-2 border-b-transparent hover:border-slate-700 ">
            {name}
        </p>
    )
}