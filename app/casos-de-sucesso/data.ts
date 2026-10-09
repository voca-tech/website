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
    result?: string;
    metrics: Metric[];
}

export const cases: Case[] = [
    // {
    //     slug: "belas-artes",
    //     pillar: "cultura",
    //     theme: "Comunicação corporativa",
    //     name: "Cristiano",
    //     role: "Gestor de RH",
    //     company: "Belas Artes",
    //     avatar: "/avatars/ba-cristiano.jpg",
    //     logo: "/clients/belasartes.png",
    //     photo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
    //     quote: "O VOCA é uma ferramenta muito importante para fortalecer a comunicação no ambiente corporativo. Não há dúvidas que tem ajudado muito o RH.",
    //     metrics: [],
    // },
    // {
    //     slug: "akaer",
    //     pillar: "cultura",
    //     theme: "Experiência do colaborador",
    //     name: "Mauricio Cabral",
    //     role: "Head de Pessoas e Cultura",
    //     company: "Akaer",
    //     avatar: "/avatars/akaer-mauricio.jpeg",
    //     logo: "/clients/akaer.png",
    //     photo: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
    //     quote: "O VOCA se destaca como uma ferramenta que vai além do convencional, promovendo uma cultura de inclusão e participação ativa. Sua contribuição para a melhoria da experiência do colaborador é evidente.",
    //     metrics: [],
    // },
    {
        slug: "engeform",
        pillar: "cultura",
        theme: "Alinhamento da cultura corporativa",
        name: "André Abucham",
        role: "CEO",
        company: "Engeform",
        avatar: "/avatars/engeform-andre.png",
        logo: "/clients/engeform.png",
        photo: "/avatars/engeform-andre2.jpeg",
        quote: "O VOCA nos ajudou de forma simples a resolver problemas complexos.",
        objective: "Fortalecer a cultura da empresa entre as diferentes equipes espalhadas, refletindo o propósito e valores nas atitudes do dia a dia.",
        solution: [
            "Postagens no VOCA Integra (rede social), com vídeos dos gestores da empresa, falando sobre os aspectos da cultura a serem reforçados.",
            "Estímulo dos colaboradores, para compartilharem atitudes de colegas de trabalho que ilustram na prática os temas abordados.",
            "Gamificação das interações nas postagens de cada desafio.",
            "Reconhecimento mensal dos mais engajados na plataforma.",
        ],
        result: "Aumentou a motivação e engajamento dos colaboradores, refletindo nas equipes, as atitudes alinhadas ao propósito e valores da empresa.",
        heroMetricIndex: 3,
        metrics: [
            { value: "20", label: "vídeos criados" },
            { value: "943", label: "visualizações" },
            { value: "+1.2k", label: "interações" },
            { value: "71%", label: "engajamento" },
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
        photo: "/avatars/credi10-erika2.jpg",
        quote: "O Voca é um canal de ouvidoria seguro e confiável. Hoje, nossos colaboradores se sentem ouvidos e protegidos, e a ferramenta é parte essencial da cultura da Credi10.",
        objective: "Implementar um canal de ouvidoria seguro, anônimo e confiável para fortalecer a escuta ativa na organização, garantir transparência e impulsionar a cultura de confiança e ética entre os colaboradores.",
        solution: [
            "Reports para auditoria externa, assegurando credibilidade e compliance.",
            "Fluxo ágil para tratativas internas, controle de acesso e segmentação dos assuntos por canais (denúncia, reclamação, etc.)",
            "Gestão centralizada das manifestações com histórico rastreável.",
            "Garantia de anonimato absoluto e segurança das informações.",
            "Interface amigável e acessível para todos os colaboradores.",
        ],
        result: "Fortaleceu a cultura organizacional da Credi10, promovendo ética, respeito e escuta ativa. Aumentou a segurança psicológica, reduziu conflitos internos e garantiu a conformidade com a LGPD, NR-1 e boas práticas de governança.",
        metrics: [
            { value: "100%", label: "conformidade para auditoria externa e interna" },
            { value: "+50", label: "manifestações anônimas recebidas e tratadas com sigilo e agilidade" },
            { value: "92%", label: "colaboradores reconhecem o canal como confiável e acessível." },
        ],
    },
    {
        slug: "credi10-treinamentos",
        pillar: "performance",
        theme: "Treinamentos",
        name: "Erika Freitas",
        role: "Coordenadora de RH",
        company: "Credi10",
        avatar: "/avatars/credi10-erika.jpg",
        logo: "/clients/credi10.png",
        photo: "/avatars/credi10-erika2.jpg",
        quote: "O novo módulo de treinamentos trouxe mais clareza e alinhamento no onboarding. Ver o engajamento dos novos talentos logo nos primeiros dias tem sido muito positivo.",
        objective: "Garantir um onboarding mais eficiente e padronizado para novos colaboradores e jovens aprendizes. Fortalecer a cultura e acelerar a adaptação ao ambiente da Credi10 desde o primeiro dia.",
        solution: [
            "Materiais multimídia (vídeo, PDF, quizz) para tornar o conteúdo mais dinâmico e acessível.",
            "Relatórios de progresso e conclusão por colaborador e turma.",
            "Notificações automáticas de conclusão e acompanhamento.",
            "Criação de trilhas de aprendizado específicas para cada perfil (novos colaboradores e aprendizes).",
            "Compliance para auditorias internas e externas.",
        ],
        result: "Maior engajamento nos primeiros dias de jornada, com adaptação mais rápida e alinhamento cultural logo no onboarding.",
        metrics: [
            { value: "100%", label: "dos jovens aprendizes passaram pela trilha obrigatória nos primeiros 5 dias úteis" },
            { value: "87%", label: "de taxa de conclusão nas trilhas de onboarding em comparação ao trimestre anterior" },
            { value: "40%", label: "de redução no tempo médio de integração dos novos colaboradores" },
        ],
    },
    {
        slug: "woodbridge-pesquisa",
        pillar: "inteligencia",
        theme: "Pesquisa de clima e feedbacks",
        name: "Alexandra Borba",
        role: "Gerente de RH",
        company: "Woodbridge",
        avatar: "/avatars/woodbridge-alexandra.jpg",
        logo: "/clients/woodbridge.png",
        photo: "/avatars/woodbridge-alexandra2.jpeg",
        quote: "O VOCA foi muito bem aceito pelos colaboradores, facilitou o alto engajamento e resultados.",
        objective: "Facilitar as pesquisas de clima e customizadas nas diferentes plantas da empresa. Aumentar a frequência de feedbacks entre as equipes.",
        solution: [
            "Foram realizadas em períodos diferentes, as semanas da pesquisa de clima e do Feedback, dentro das plantas da empresa.",
            "Apoio do time VOCA no suporte e endomarketing para o engajamento.",
            "Gamificação das interações identificadas da plataforma.",
            "Reconhecimento dos colaboradores mais engajados.",
            "Diagnóstico geral e segmentado por áreas com recomendações de ação.",
        ],
        result: "Aumento considerável do engajamento dos colaboradores nas ações da empresa, Clima com maior camaradagem entre as equipes.",
        metrics: [
            { value: "95%", label: "taxa de resposta às pesquisas" },
            { value: "8.5", label: "nota de clima" },
            { value: "+4.3k", label: "feedbacks enviados" },
            { value: "+2.7k", label: "feedbacks solicitados" },
        ],
    },
    {
        slug: "woodbridge-cracha",
        pillar: "operacoes",
        theme: "Crachá digital",
        name: "Alexandra Borba",
        role: "Gerente de RH",
        company: "Woodbridge",
        avatar: "/avatars/woodbridge-alexandra.jpg",
        logo: "/clients/woodbridge.png",
        photo: "/avatars/woodbridge-alexandra2.jpeg",
        quote: "Transformamos um processo manual em uma solução moderna e eficiente. O crachá digital trouxe agilidade, segurança e economia ao nosso controle de acesso.",
        objective: "Implementar uma solução digital para facilitar o controle de acesso de funcionários, visando otimizar a operação e reduzir custos com impressão.",
        solution: [
            "Crachá Digital integrado ao aplicativo utilizado pela empresa.",
            "Redução do tempo de entrada dos funcionários.",
            "Controle de acesso via app, exclusivo aos funcionários ativos.",
            "Segurança, facilidade e praticidade no acesso.",
            "Disponibilização do Crachá Digital em PDF.",
            "Exibição da última atualização de acesso pelo app.",
        ],
        result: "A digitalização com o VOCA eliminou registros manuais, tornando o acesso mais ágil e seguro, além de reduzir custos operacionais e liberar tempo para atividades mais estratégicas.",
        metrics: [
            { value: "100%", label: "redução de custo com materiais gráficos e reimpressões de crachás físicos" },
            { value: "60%", label: "aumento na pontualidade dos colaboradores" },
            { value: "40h/mês", label: "economia de tempo gasto com processos manuais do RH" },
        ],
    },
    {
        slug: "sp-engenharia",
        pillar: "performance",
        theme: "Avaliação de desempenho",
        name: "Marcelo de Freitas",
        role: "Diretor Executivo",
        company: "SP Engenharia",
        avatar: "/avatars/sp-engenharia-marcelo.jpeg",
        logo: "/clients/spEngenharia.png",
        photo: "/avatars/sp-engenharia-marcelo.jpeg",
        heroMetricIndex: 1,
        homeMetricIndex: 3,
        quote: "Deixamos a AVD mais estratégica e ágil, com feedbacks claros e maior participação da liderança no desenvolvimento do time.",
        objective: "Implantar Av. Desempenho estruturada e digital, promovendo alinhamento entre equipes e liderança, com foco em desenvolvimento e performance.",
        solution: [
            "Avaliação por competências técnicas e comportamentais.",
            "Eliminação de planilhas: substituição do processo manual por um fluxo automatizado e centralizado no sistema.",
            "Consolidação de registros: processo realizado e registrado dentro da plataforma, garantindo histórico, rastreabilidade e segurança da info.",
            "Interface amigável e intuitiva: participação facilitada de todos os envolvidos, com etapas bem definidas.",
        ],
        result: "Mais de 90% de adesão do time na 1ª avaliação, com feedbacks ágeis, liderança engajada e informações centralizadas. A digitalização reduziu horas operacionais e acelerou decisões estratégicas.",
        metrics: [
            { value: "85%", label: "redução no tempo gasto" },
            { value: "100%", label: "avaliações centralizadas" },
            { value: "96%", label: "engajamento de líderes" },
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
        avatar: "/avatars/grant-thornton-walter.jpg",
        logo: "/clients/grantthornton.png",
        photo: "/avatars/grant-thornton-walter.jpg",
        heroMetricIndex: 2,
        quote: "Facilita trabalhar as ações de DHO e o engajamento contínuo na mesma plataforma.",
        objective: "Migrar de soluções isoladas no mercado, para uma única plataforma que permita trabalhar diversas ações do DHO e o engajamento contínuo de um time de 2.000 colaboradores em equipes espalhadas.",
        solution: [
            "Campanhas com foco em saúde e cultura, estimulando e incentivando participação de todos em canal exclusivo da rede social corporativa.",
            "60 dias de campanha integrando 14 filiais da Grant Thornton Brasil.",
            "Gamificação da campanha com ranking reconhecendo os mais engajados.",
            "Universidade corporativa com gestão flexível e treinamentos rastreáveis.",
            "Ciclos de AVDs com feedback estruturado e histórico documentado.",
            "Ciclos de PDIs sob constante acompanhamento"
        ],
        result: "Aumentou o engajamento e pertencimento do time, refletindo atitudes alinhadas ao propósito e valores da empresa. Permitiu ciclos de performance e capacitação estruturados, com histórico rastreável e documentado.",
        metrics: [
            { value: "20.000", label: "publicações na rede social" },
            { value: "260.000", label: "visualizações na rede social" },
            { value: "406.000", label: "visualizações na rede social" },
            { value: "350", label: "treinamentos criados" },
            { value: "2.400", label: "avaliações de desempenho criadas" },
            { value: "1.300", label: "PDIs criados" },
        ],
    },
    {
        slug: "hwaseung",
        pillar: "cultura",
        theme: "Engajamento do time",
        name: "Rogerio Martinelli",
        role: "Gerente de RH",
        company: "Hwaseung",
        avatar: "/avatars/hwaseung-rogerio.jpeg",
        logo: "/clients/hwaseung.png",
        photo: "/avatars/hwaseung-rogerio.jpeg",
        quote: "O Voca resolveu nosso maior desafio: a comunicação com todos os colaboradores. Hoje, é essencial para manter todos informados, engajados e alinhados aos objetivos da empresa.",
        objective: "Ter um canal oficial, moderno e acessível para fortalecer a comunicação interna, reduzir ruídos de informação e aumentar o engajamento dos colaboradores , especialmente nas áreas operacionais e administrativas.",
        solution: [
            "Publicações com conteúdo visual e interativo, facilitando a disseminação da informação.",
            "Notificações instantâneas para garantir a eficácia da comunicação.",
            "Medição do engajamento e alcance das mensagens por áreas, garantindo a real eficácia da comunicação.",
            "Design simples e de fácil navegação: facilita o engajamento de todos os participantes.",
        ],
        result: "Superamos os desafios de comunicação, alcançando mais de 95% de adesão dos colaboradores, centralizando informações e aumentando em 80% o engajamento nas campanhas, além de reduzir em 60% o tempo com retrabalho e alinhamentos.",
        metrics: [
            { value: "100%", label: "engajamento de líderes e colaboradores" },
            { value: "60%", label: "redução de retrabalho do time" },
        ],
    },
    // {
    //     slug: "grupo-wine",
    //     pillar: "cultura",
    //     theme: "Operação de pessoas",
    //     company: "Grupo Wine",
    //     photo: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=900&q=80",
    //     quote: "A operação de pessoas deixa de ser pontual, passa a ser contínua e integrada em diferentes perspectivas e interações que a plataforma proporciona.",
    //     objective: "560 colaboradores do Grupo Wine, 50 dias após o lançamento do VOCA na empresa.",
    //     metrics: [
    //         { value: "94%", label: "dos colaboradores usando o sistema" },
    //         { value: "91%", label: "participação na rede social" },
    //         { value: "87%", label: "participação no termômetro de humor" },
    //         { value: "466", label: "avaliações de desempenho 180º" },
    //     ],
    // },
    // {
    //     slug: "sps-group",
    //     pillar: "performance",
    //     theme: "Gestão de mudanças organizacionais",
    //     name: "Diego Bortolucci",
    //     role: "Partner & COO",
    //     company: "SPS Group",
    //     photo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80",
    //     quote: "Espetacular suite de soluções para atender clima corporativo, gestão de mudanças organizacionais e projetos complexos, garantindo o clima do projeto, engajamento e visão de risco com as pessoas. Recomendo fortemente!",
    //     metrics: [],
    // },
];
