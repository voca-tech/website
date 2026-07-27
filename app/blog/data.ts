import {
    TrendingDown, Users, Trophy, ShieldCheck,
    type LucideIcon,
} from "lucide-react";

export interface Post {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    color: string;
    icon: LucideIcon;
    coverPhoto: string;
    date: string;
    readTime: string;
    content: string[];
}

const LOREM = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
];

export const posts: Post[] = [
    {
        slug: "reduzir-turnover-com-dados-de-clima",
        title: "Como reduzir o turnover com dados de clima organizacional",
        excerpt: "Por que empresas que acompanham o clima de perto conseguem antecipar pedidos de desligamento, e o que fazer com esses dados na prática.",
        category: "People Analytics",
        color: "#2f6690",
        icon: TrendingDown,
        coverPhoto: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=900&q=80",
        date: "2026-06-12",
        readTime: "6 min de leitura",
        content: LOREM,
    },
    {
        slug: "sinais-rh-mais-estrategico",
        title: "5 sinais de que sua empresa precisa de um RH mais estratégico",
        excerpt: "Do excesso de planilhas à falta de indicadores: sinais comuns de que o RH ainda está preso ao operacional.",
        category: "Cultura & Engajamento",
        color: "#007980",
        icon: Users,
        coverPhoto: "https://images.unsplash.com/photo-1590650046871-92c887180603?auto=format&fit=crop&w=900&q=80",
        date: "2026-05-28",
        readTime: "5 min de leitura",
        content: LOREM,
    },
    {
        slug: "gamificacao-no-trabalho-vale-a-pena",
        title: "Gamificação no ambiente de trabalho: vale a pena?",
        excerpt: "Rankings, conquistas e desafios ajudam mesmo a engajar times, ou é só mais uma moda passageira do RH?",
        category: "Performance & Desenvolvimento",
        color: "#e8b23d",
        icon: Trophy,
        coverPhoto: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=900&q=80",
        date: "2026-05-09",
        readTime: "4 min de leitura",
        content: LOREM,
    },
    {
        slug: "lgpd-e-rh-o-que-sua-empresa-precisa-saber",
        title: "LGPD e RH: o que sua empresa precisa saber",
        excerpt: "Dados de colaboradores também são dados pessoais. Um guia rápido sobre o que muda na rotina do RH.",
        category: "Segurança & Compliance",
        color: "#85568a",
        icon: ShieldCheck,
        coverPhoto: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
        date: "2026-04-22",
        readTime: "7 min de leitura",
        content: LOREM,
    },
];
