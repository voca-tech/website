export interface Metric {
    value: string;
    label: string;
}

export type PillarId = "cultura" | "performance" | "inteligencia" | "operacoes";

export const PILLARS: Record<PillarId, { label: string; color: string }> = {
    cultura: { label: "Cultura & Engajamento", color: "#007980" },
    performance: { label: "Performance & Desenvolvimento", color: "#5f7480" },
    inteligencia: { label: "Inteligência & People Analytics", color: "#2f6690" },
    operacoes: { label: "Operações & Serviços Internos", color: "#85568a" },
};

export interface Case {
    slug: string;
    pillar: PillarId;
    theme: string;
    name?: string;
    role?: string;
    company: string;
    avatar?: string;
    logo?: string;
    photo?: string;
    heroMetricIndex?: number;
    homeMetricIndex?: number;
    quote: string;
    objective?: string;
    solution?: string[];
    metrics: Metric[];
}

export const cases: Case[] = [
    {
        slug: "belas-artes",
        pillar: "cultura",
        theme: "Comunicação corporativa",
        name: "Cristiano",
        role: "Gestor de RH",
        company: "Belas Artes",
        avatar: "/avatars/ba-cristiano.jpg",
        logo: "/clients/belasartes.png",
        photo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
        quote: "O VOCA é uma ferramenta muito importante para fortalecer a comunicação no ambiente corporativo. Não há dúvidas que tem ajudado muito o RH.",
        metrics: [],
    },
    {
        slug: "akaer",
        pillar: "cultura",
        theme: "Experiência do colaborador",
        name: "Mauricio Cabral",
        role: "Head de Pessoas e Cultura",
        company: "Akaer",
        avatar: "/avatars/akaer-mauricio.jpg",
        logo: "/clients/akaer.png",
        photo: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
        quote: "O VOCA se destaca como uma ferramenta que vai além do convencional, promovendo uma cultura de inclusão e participação ativa. Sua contribuição para a melhoria da experiência do colaborador é evidente.",
        metrics: [],
    },
    {
        slug: "engeform",
        pillar: "cultura",
        theme: "Alinhamento da cultura corporativa",
        name: "André Abucham",
        role: "CEO",
        company: "Engeform",
        avatar: "/avatars/engeform-andre.png",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&q=80",
        quote: "O VOCA nos ajudou de forma simples a resolver problemas complexos.",
        objective: "Fortalecer a cultura da empresa entre as diferentes equipes espalhadas, refletindo o propósito e valores nas atitudes do dia a dia.",
        solution: [
            "Postagens na rede social corporativa, com vídeos dos gestores falando sobre a cultura.",
            "Estímulo para colaboradores compartilharem atitudes alinhadas aos temas abordados.",
            "Gamificação das interações em cada desafio.",
            "Reconhecimento mensal dos mais engajados na plataforma.",
        ],
        heroMetricIndex: 3,
        metrics: [
            { value: "20", label: "vídeos criados" },
            { value: "943", label: "visualizações" },
            { value: "+1.2k", label: "interações" },
            { value: "67%", label: "engajamento" },
        ],
    },
    {
        slug: "credi10-compliance",
        pillar: "cultura",
        theme: "Compliance e auditoria",
        name: "Erika Freitas",
        role: "Coordenadora de RH",
        company: "Credi10",
        avatar: "/avatars/credi10-erika.jpg",
        logo: "/clients/credi10.png",
        photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
        quote: "O Voca é um canal de ouvidoria seguro e confiável. Hoje, nossos colaboradores se sentem ouvidos e protegidos, e a ferramenta é parte essencial da cultura da Credi10.",
        objective: "Implementar um canal de ouvidoria seguro, anônimo e confiável para fortalecer a escuta ativa na organização, garantir transparência e impulsionar a cultura de confiança e ética entre os colaboradores.",
        solution: [
            "Reports para auditoria externa, assegurando credibilidade e compliance.",
            "Fluxo ágil para tratativas internas, com segmentação por canais.",
            "Gestão centralizada das manifestações com histórico rastreável.",
            "Garantia de anonimato absoluto e segurança das informações.",
        ],
        metrics: [
            { value: "100%", label: "conformidade para auditoria" },
            { value: "+50", label: "manifestações tratadas" },
            { value: "92%", label: "confiança nos canais de voz" },
        ],
    },
    {
        slug: "credi10-treinamentos",
        pillar: "performance",
        theme: "Treinamentos e onboarding",
        name: "Erika Freitas",
        role: "Coordenadora de RH",
        company: "Credi10",
        avatar: "/avatars/credi10-erika.jpg",
        logo: "/clients/credi10.png",
        photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
        quote: "O novo módulo de treinamentos trouxe mais clareza e alinhamento no onboarding. Ver o engajamento dos novos talentos logo nos primeiros dias tem sido muito positivo.",
        objective: "Garantir um onboarding mais eficiente e padronizado para novos colaboradores e jovens aprendizes, fortalecendo a cultura desde o primeiro dia.",
        solution: [
            "Materiais multimídia (vídeo, PDF, quiz) para tornar o conteúdo mais dinâmico.",
            "Relatórios de progresso e conclusão por colaborador e turma.",
            "Trilhas de aprendizado específicas por perfil.",
            "Compliance pronto para auditorias internas e externas.",
        ],
        metrics: [
            { value: "100%", label: "aprendizes na trilha obrigatória" },
            { value: "87%", label: "conclusão nas trilhas" },
            { value: "-40%", label: "tempo de integração" },
        ],
    },
    {
        slug: "woodbridge-pesquisa",
        pillar: "inteligencia",
        theme: "Pesquisa de clima e feedback",
        name: "Alexandra Borba",
        role: "Gerente de RH",
        company: "Woodbridge",
        logo: "/clients/woodbridge.png",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
        quote: "VOCA foi muito bem aceito pelo time, o que facilitou o engajamento e resultados.",
        objective: "Facilitar as pesquisas de clima e customizadas nas diferentes plantas da empresa, aumentando a frequência de feedbacks entre as equipes.",
        solution: [
            "Semanas dedicadas à pesquisa de clima e ao feedback, dentro das plantas da empresa.",
            "Apoio do time VOCA no suporte e endomarketing para o engajamento.",
            "Gamificação das interações identificadas na plataforma.",
            "Diagnóstico geral e segmentado por áreas com recomendações de ação.",
        ],
        metrics: [
            { value: "95%", label: "taxa de resposta às pesquisas" },
            { value: "8.5", label: "nota de clima" },
            { value: "+4.3k", label: "feedbacks enviados" },
        ],
    },
    {
        slug: "woodbridge-cracha",
        pillar: "operacoes",
        theme: "Crachá digital",
        name: "Alexandra Borba",
        role: "Gerente de RH",
        company: "Woodbridge",
        logo: "/clients/woodbridge.png",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
        quote: "Transformamos um processo manual em uma solução moderna e eficiente. O crachá digital trouxe agilidade, segurança e economia ao nosso controle de acesso.",
        objective: "Implementar uma solução digital para facilitar o controle de acesso de funcionários, otimizando a operação e reduzindo custos com impressão.",
        solution: [
            "Crachá digital integrado ao aplicativo utilizado pela empresa.",
            "Controle de acesso via app, exclusivo aos funcionários ativos.",
            "Disponibilização do crachá digital em PDF.",
            "Exibição da última atualização de acesso pelo app.",
        ],
        metrics: [
            { value: "100%", label: "redução em materiais gráficos" },
            { value: "60%", label: "aumento de pontualidade" },
            { value: "-40h/mês", label: "economia de tempo do RH" },
        ],
    },
    {
        slug: "sp-engenharia",
        pillar: "performance",
        theme: "Avaliação de desempenho",
        name: "Janaina Collela",
        role: "Coordenadora de RH",
        company: "SP Engenharia",
        photo: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=900&q=80",
        heroMetricIndex: 1,
        homeMetricIndex: 3,
        quote: "Deixamos a AVD mais estratégica e ágil, com feedbacks claros e maior participação da liderança no desenvolvimento do time.",
        objective: "Implantar avaliação de desempenho estruturada e digital, promovendo alinhamento entre equipes e liderança, com foco em desenvolvimento e performance.",
        solution: [
            "Avaliação por competências técnicas e comportamentais.",
            "Eliminação de planilhas, substituídas por um fluxo automatizado e centralizado.",
            "Histórico, rastreabilidade e segurança das informações.",
            "Interface amigável, com etapas bem definidas para todos os envolvidos.",
        ],
        metrics: [
            { value: "100%", label: "avaliações centralizadas" },
            { value: "96%", label: "engajamento de líderes" },
            { value: "85%", label: "redução no tempo gasto" },
            { value: "-40h", label: "economia mensal do RH" },
        ],
    },
    {
        slug: "grant-thornton",
        pillar: "cultura",
        theme: "Engajamento em escala",
        name: "Walter Rodrigues",
        role: "Diretor de RH",
        company: "Grant Thornton",
        photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80",
        heroMetricIndex: 2,
        quote: "Facilita trabalhar na mesma plataforma as ferramentas de RH e o engajamento contínuo.",
        objective: "Campanha de 60 dias unindo cultura e performance para os 1.900 colaboradores da Grant Thornton Brasil.",
        solution: [
            "Campanha focada em saúde física e mental, estimulando participação na rede social corporativa.",
            "Avaliações de desempenho com feedback estruturado.",
            "PDIs sob constante acompanhamento.",
            "Treinamentos disponibilizados na universidade corporativa.",
        ],
        metrics: [
            { value: "19.720", label: "publicações na rede social" },
            { value: "103.620", label: "interações" },
            { value: "261.560", label: "visualizações" },
            { value: "1.670", label: "avaliações de desempenho" },
            { value: "1.256", label: "PDIs criados" },
        ],
    },
    {
        slug: "hwaseung",
        pillar: "cultura",
        theme: "Comunicação interna",
        name: "Rogerio Martinelli",
        role: "Gerente de RH",
        company: "Hwaseung",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
        quote: "O Voca resolveu nosso maior desafio: a comunicação com todos os colaboradores. Hoje, é essencial para manter todos informados, engajados e alinhados aos objetivos da empresa.",
        objective: "Ter um canal oficial, moderno e acessível para fortalecer a comunicação interna e aumentar o engajamento dos colaboradores.",
        solution: [
            "Publicações com conteúdo visual e interativo.",
            "Notificações instantâneas para garantir a eficácia da comunicação.",
            "Medição do engajamento e alcance das mensagens por área.",
            "Design simples e de fácil navegação.",
        ],
        metrics: [
            { value: "100%", label: "engajamento de líderes e colaboradores" },
            { value: "60%", label: "redução de retrabalho" },
        ],
    },
    {
        slug: "grupo-wine",
        pillar: "cultura",
        theme: "Operação de pessoas",
        company: "Grupo Wine",
        photo: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=900&q=80",
        quote: "A operação de pessoas deixa de ser pontual, passa a ser contínua e integrada em diferentes perspectivas e interações que a plataforma proporciona.",
        objective: "560 colaboradores do Grupo Wine, 50 dias após o lançamento do VOCA na empresa.",
        metrics: [
            { value: "94%", label: "dos colaboradores usando o sistema" },
            { value: "91%", label: "participação na rede social" },
            { value: "87%", label: "participação no termômetro de humor" },
            { value: "466", label: "avaliações de desempenho 180º" },
        ],
    },
    {
        slug: "sps-group",
        pillar: "performance",
        theme: "Gestão de mudanças organizacionais",
        name: "Diego Bortolucci",
        role: "Partner & COO",
        company: "SPS Group",
        photo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80",
        quote: "Espetacular suite de soluções para atender clima corporativo, gestão de mudanças organizacionais e projetos complexos, garantindo o clima do projeto, engajamento e visão de risco com as pessoas. Recomendo fortemente!",
        metrics: [],
    },
];
