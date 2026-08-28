import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Produto: 21 funcionalidades em 4 pilares",
    description: "Comunicação, engajamento, performance e governança numa plataforma só. Conheça as 21 funcionalidades do VOCA e o método por trás da implantação.",
    openGraph: {
        title: "Produto: 21 funcionalidades em 4 pilares | VOCA",
        description: "Comunicação, engajamento, performance e governança numa plataforma só. Conheça as 21 funcionalidades do VOCA e o método por trás da implantação.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
