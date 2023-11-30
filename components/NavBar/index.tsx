import { Menu } from "lucide-react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function NavBar() {
    return (
        <nav id="home" className="px-4 py-3 z-10 bg-voca-green">
            <div className="flex justify-between items-center max-w-7xl m-auto">
                <Image
                    src='/logo-voca-negativo.png'
                    alt="Logomarcar VOCA"
                    width={160}
                    height={80}
                />
                <div className="hidden md:visible md:flex gap-6 text-slate-800">
                    <MenuItem name="Início" reference="home" />
                    <MenuItem name="Dores que resolvemos" reference="challenges" />
                    <MenuItem name="Funcionalidades" reference="functionalities" />
                    <MenuItem name="Depoimentos" reference="testimonials" />
                    {/* <MenuItem name="Fale Conosco" reference="contact" /> */}
                </div>

                <div className="md:hidden text-white hover:cursor-pointer">
                    <Popover>
                        <PopoverTrigger className="flex items-center"><Menu /></PopoverTrigger>
                        <PopoverContent>
                            <div className="flex flex-col gap-6 text-teal-800">
                                <PopoverMenuItem name="Início" reference="home" />
                                <PopoverMenuItem name="Dores que resolvemos" reference="challenges" />
                                <PopoverMenuItem name="Funcionalidades" reference="functionalities" />
                                <PopoverMenuItem name="Depoimentos" reference="testimonials" />
                                {/* <PopoverMenuItem name="Fale Conosco" reference="contact" /> */}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </nav>
    )
}

interface MenuItemProps {
    name: string,
    reference: string
}

function MenuItem({ name, reference }: MenuItemProps) {
    return (
        <a
            href={`#${reference}`}
            className="text-md text-teal-50 cursor-pointer border-b-2 border-b-transparent hover:border-teal-600 "
        >
            {name}
        </a>
    )
}

function PopoverMenuItem({ name, reference }: MenuItemProps) {
    return (
        <p className="text-md text-teal-900 cursor-pointer ">
            {name}
        </p>
    )
}