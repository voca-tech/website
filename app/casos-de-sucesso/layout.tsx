import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cases de sucesso",
    description: "Empresas que fazem do VOCA uma extensão delas. Resultados reais em clima, performance, comunicação e compliance, com os números de cada operação.",
    openGraph: {
        title: "Cases de sucesso | VOCA",
        description: "Empresas que fazem do VOCA uma extensão delas. Resultados reais em clima, performance, comunicação e compliance, com os números de cada operação.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
