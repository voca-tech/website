import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sobre o VOCA",
    description: "Ajudamos as empresas a cuidar das pessoas, para que elas possam cuidar das empresas. A história, os princípios e quem faz o VOCA.",
    openGraph: {
        title: "Sobre o VOCA | VOCA",
        description: "Ajudamos as empresas a cuidar das pessoas, para que elas possam cuidar das empresas. A história, os princípios e quem faz o VOCA.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
