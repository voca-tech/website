import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Por que o VOCA",
    description: "Tecnologia forte, time de verdade. Atendimento humano, método de engajamento contínuo e comparativo direto com as ferramentas tradicionais do mercado.",
    openGraph: {
        title: "Por que o VOCA | VOCA",
        description: "Tecnologia forte, time de verdade. Atendimento humano, método de engajamento contínuo e comparativo direto com as ferramentas tradicionais do mercado.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
