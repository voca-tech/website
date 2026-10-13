import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Segurança e Compliance",
    description: "Dados protegidos e processos rastreáveis. Conformidade com a LGPD, infraestrutura AWS, relatórios de auditoria e apoio à NR-1.",
    openGraph: {
        title: "Segurança e Compliance | VOCA",
        description: "Dados protegidos e processos rastreáveis. Conformidade com a LGPD, infraestrutura AWS, relatórios de auditoria e apoio à NR-1.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
