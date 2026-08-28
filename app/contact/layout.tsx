import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fale com a gente",
    description: "Agende uma demonstração do VOCA e veja a plataforma funcionando com os desafios reais da sua empresa.",
    openGraph: {
        title: "Fale com a gente | VOCA",
        description: "Agende uma demonstração do VOCA e veja a plataforma funcionando com os desafios reais da sua empresa.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
