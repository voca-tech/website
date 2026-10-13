import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Conteúdo para quem cuida de pessoas: comunicação interna, engajamento, performance e cultura organizacional.",
    openGraph: {
        title: "Blog | VOCA",
        description: "Conteúdo para quem cuida de pessoas: comunicação interna, engajamento, performance e cultura organizacional.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
