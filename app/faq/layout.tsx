import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dúvidas frequentes",
    description: "Perguntas que a gente sempre recebe sobre produto, implantação, segurança e comercial. Filtre por assunto ou busque pela sua dúvida.",
    openGraph: {
        title: "Dúvidas frequentes | VOCA",
        description: "Perguntas que a gente sempre recebe sobre produto, implantação, segurança e comercial. Filtre por assunto ou busque pela sua dúvida.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
