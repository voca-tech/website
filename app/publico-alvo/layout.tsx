import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Para quem é o VOCA",
    description: "A plataforma se adapta a quem está usando, do C-level ao colaborador da ponta. Veja o que muda para decisores, gestores, colaboradores e time de RH.",
    openGraph: {
        title: "Para quem é o VOCA | VOCA",
        description: "A plataforma se adapta a quem está usando, do C-level ao colaborador da ponta. Veja o que muda para decisores, gestores, colaboradores e time de RH.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
