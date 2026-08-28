import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Calculadora de ROI",
    description: "Simule quanto sua empresa economiza ao consolidar numa plataforma só o que hoje está espalhado em várias ferramentas de gestão de pessoas.",
    openGraph: {
        title: "Calculadora de ROI | VOCA",
        description: "Simule quanto sua empresa economiza ao consolidar numa plataforma só o que hoje está espalhado em várias ferramentas de gestão de pessoas.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
