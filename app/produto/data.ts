import {
    Megaphone, Gauge, Sparkles, LayoutDashboard,
    Smile, Users, ThumbsUp, Gift, Lightbulb, MessageCircle, ShieldAlert,
    Award, ClipboardCheck, MessageSquare, GraduationCap,
    BarChart3, TrendingDown, UserCircle, Brain, PieChart,
    FolderOpen, CreditCard, ShoppingBag, Plug,
    type LucideIcon,
} from "lucide-react";

export interface Feature {
    name: string;
    description: string;
    icon: LucideIcon;
    details?: string[];
}

export interface Pillar {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    features: Feature[];
}

export const pillars: Pillar[] = [
    {
        id: "cultura",
        title: "Cultura & Engajamento",
        description: "Da escuta ativa ao engajamento e reconhecimento: canais que transformam clima em cultura visível e mensurável.",
        icon: Megaphone,
        color: "#007980",
        features: [
            {
                name: "Termômetro de Humor",
                description: "Sentimento diário do time em poucos cliques.",
                icon: Smile,
                details: [
                    "Captura diária do sentimento e das emoções do time",
                    "Leitura de sentimento passiva por texto, com IA",
                    "Notificações de alerta para o RH e o gestor direto",
                    "Análise da empresa compilada ou segmentada por áreas",
                    "Highlights e recomendações de ação",
                    "Exportação dos dados em Excel",
                ],
            },
            {
                name: "Rede Social Corporativa",
                description: "Comunicação eficaz, engajamento e gamificação no mesmo lugar.",
                icon: Users,
                details: [
                    "Organize os assuntos por canais ou áreas da empresa",
                    "Gestão de canais e campanhas com gamificação",
                    "Comunicação eficaz, com validação do conteúdo pelo colaborador",
                    "Engajamento contínuo",
                    "Fácil e divertido de usar",
                    "Possibilidade de fixar postagens",
                    "Upload de imagens, vídeos e arquivos",
                    "Marque pessoas no texto com @",
                    "Reports online em tempo real",
                    "Permita a curadoria do conteúdo",
                    "Análise de sentimento por texto, com IA",
                ],
            },
            {
                name: "Mural de Elogios",
                description: "Reconheça as pessoas do time para toda a empresa.",
                icon: ThumbsUp,
                details: [
                    "Reforce os vínculos entre as pessoas com o poder do elogio",
                    "Elogie uma ou mais pessoas em um mural para toda a empresa",
                    "Curta elogios recebidos por outras pessoas no mural",
                    "Responda a quem te elogiou em um canal privado",
                    "Notificações para quem recebeu um elogio",
                ],
            },
            {
                name: "Aniversários",
                description: "Celebre as datas importantes das pessoas do time.",
                icon: Gift,
                details: [
                    "Comemore o aniversário das pessoas e o tempo de empresa",
                    "Mural dinâmico com os aniversariantes da semana",
                    "Mande uma mensagem para o aniversariante do dia",
                    "E-mail automático do sistema parabenizando pelo dia",
                    "Receba o carinho e as mensagens de todos na empresa",
                ],
            },
            {
                name: "Caixa de Ideias",
                description: "Fomente a inovação em todas as áreas da empresa.",
                icon: Lightbulb,
                details: [
                    "Compartilhe uma ideia e converse com a empresa em um canal privado",
                    "Reforce uma ideia com material de apoio",
                    "Gerencie as ideias do time por temas, áreas e status",
                    "Interaja em canal privado com quem traz boas ideias para a empresa",
                    "Defina os responsáveis por moderar os conteúdos desse canal de inovação",
                ],
            },
            {
                name: "Fale com a Liderança ou RH",
                description: "Canal privado e customizável para aproximar o time das lideranças.",
                icon: MessageCircle,
                details: [
                    "Defina os responsáveis por moderar o canal: CEO, diretoria, gestores, RH",
                    "Mantenha o diálogo aberto entre o time e as lideranças",
                    "Temas customizáveis para direcionar os conteúdos do canal",
                    "Conversa com a empresa em canal privado, anônimo ou identificado",
                    "Organize e gerencie com facilidade os chamados do RH",
                ],
            },
            {
                name: "Ouvidoria",
                description: "Dê voz para o seu time, com denúncia e reclamação.",
                icon: ShieldAlert,
                details: [
                    "Converse com a empresa em canal privado, anônimo ou identificado",
                    "Compartilhe uma denúncia com evidências",
                    "Compartilhe uma reclamação, com sugestão de solução para a empresa",
                    "Garanta a segurança psicológica do seu time",
                    "Defina os responsáveis por moderar os conteúdos desse canal de compliance",
                ],
            },
        ],
    },
    {
        id: "performance",
        title: "Performance & Desenvolvimento",
        description: "Avaliar, desenvolver e capacitar o time com dados que orientam cada etapa do crescimento.",
        icon: Gauge,
        color: "#5f7480",
        features: [
            {
                name: "Avaliação de Desempenho",
                description: "Customize o ciclo de AVD conforme a metodologia da sua empresa.",
                icon: Award,
                details: [
                    "Avaliações 90º, 180º e 360º",
                    "Coleta de informações em poucos cliques, na web e no app",
                    "Flexibilidade para se encaixar no fluxo do cliente",
                    "Usabilidade extremamente fácil",
                    "Entenda os gaps de habilidades nas equipes",
                    "Relatório de resultados em PDF",
                    "Vincule um PDI a partir da AVD finalizada",
                    "Leitura de sentimento por texto, com IA",
                    "Facilite avaliações de experiência e diário de bordo",
                ],
            },
            {
                name: "Plano de Desenvolvimento (PDI)",
                description: "Potencialize o desenvolvimento das pessoas com acompanhamento contínuo.",
                icon: ClipboardCheck,
                details: [
                    "Crie, edite e acompanhe o PDI em andamento",
                    "Saia da teoria para a prática no desenvolvimento",
                    "Vincule o PDI à avaliação de desempenho finalizada",
                    "Facilite a troca constante entre gestor e colaborador avaliado",
                    "Compile os indicadores da empresa ou por áreas",
                    "Análise de sentimento por texto, com IA",
                ],
            },
            {
                name: "Feedback",
                description: "Transforme as pessoas, para que elas transformem a empresa.",
                icon: MessageSquare,
                details: [
                    "Dê ou solicite feedbacks em poucos cliques",
                    "Gerencie feedbacks estruturados ou aleatórios",
                    "Responda a quem deu um feedback em um canal privado",
                    "Notificações para quem recebeu um feedback",
                    "Customize temas para direcionar os conteúdos do canal",
                ],
            },
            {
                name: "Treinamentos (LMS)",
                description: "Academia corporativa na palma da mão para capacitar o time.",
                icon: GraduationCap,
                details: [
                    "Academia corporativa acessível pela web e pelo app",
                    "Diferentes formatos: PDF, link, vídeo, SCORM, imagens e outros",
                    "Streaming do próprio VOCA para hospedar os arquivos",
                    "Feedback e quiz para validação do conteúdo",
                    "Certificado de conclusão online",
                    "Gestão de trilhas de aprendizagem",
                    "QR Code para registro em treinamentos presenciais",
                    "Relatórios em tempo real com indicadores para governança e auditoria",
                    "Flexibilidade de uso: onboarding, desenvolvimento, compliance e mais",
                    "100 treinamentos introdutórios já disponíveis na base",
                ],
            },
            {
                name: "Gamificação",
                description: "Acelere a absorção de conteúdo de forma dinâmica, simples e divertida.",
                icon: Sparkles,
                details: [
                    "Escale o engajamento do time, na palma da mão dos colaboradores",
                    "Uma maneira divertida e dinâmica de aprender",
                    "Participe sem perder o foco no que precisa ser feito",
                    "Feedback imediato e reconhecimento pelas conquistas",
                    "Envolva as equipes com desafios e recompensas",
                    "Acompanhe progresso e desempenho por dados",
                    "Monte trilhas com conteúdos específicos",
                    "Participe pela web ou pelo app",
                ],
            },
        ],
    },
    {
        id: "inteligencia",
        title: "Inteligência & People Analytics",
        description: "Dados que direcionam decisões assertivas, para toda a empresa ou segmentados por área.",
        icon: LayoutDashboard,
        color: "#2f6690",
        features: [
            {
                name: "Pesquisas",
                description: "Clima organizacional, e-NPS, NR-1, enquetes, questionários e outros.",
                icon: BarChart3,
                details: [
                    "Engajamento em poucos cliques",
                    "Relatórios compilando dados em tempo real",
                    "Coleta de dados quantitativos e qualitativos",
                    "Análise de sentimento passiva por texto, com IA",
                    "Pesquisas anônimas ou identificadas",
                    "Notificações recorrentes para maior taxa de resposta",
                    "Customização ilimitada de temas e perguntas",
                    "200 perguntas já disponíveis na base do VOCA",
                    "Pesquisas dinâmicas, com perguntas condicionais",
                ],
            },
            {
                name: "Análise de Turnover",
                description: "Insights privilegiados para a retenção de talentos.",
                icon: TrendingDown,
                details: [
                    "Formulários de desligamento customizados",
                    "Indicadores de turnover de toda a empresa ou por áreas",
                    "Envio de notificações pelo sistema, na web ou no app",
                    "Relatórios individuais e compilados em tempo real",
                    "Metodologia flexível para a dinâmica da sua empresa",
                    "Análise de sentimento por texto, com IA",
                ],
            },
            {
                name: "Perfil do Usuário 360º",
                description: "Compile o histórico de informações relevantes sobre o colaborador.",
                icon: UserCircle,
                details: [
                    "Adicione informações complementares ao perfil do usuário na plataforma",
                    "Campos customizáveis: carreira, certificações, idiomas, perfil comportamental, performance, compliance e saúde",
                    "Potencialize análises e ações por parte das lideranças",
                    "Permita ao colaborador compilar o próprio histórico de dados",
                ],
            },
            {
                name: "Leitura de Sentimento (IA)",
                description: "Análise automática de sentimento e emoção em 100% das interações escritas.",
                icon: Brain,
                details: [
                    "Mensure sentimento e emoção nas interações com conteúdo qualitativo",
                    "Complemente os indicadores da plataforma, medindo dados até então subjetivos",
                    "Acompanhe a percepção das pessoas sobre um assunto específico",
                    "Facilite a análise de dados qualitativos",
                ],
            },
            {
                name: "Indicadores e Relatórios",
                description: "Inteligência com foco nas pessoas.",
                icon: PieChart,
                details: [
                    "Dashboards online em tempo real, compilados ou segmentados por funcionalidade, área, período e outros filtros",
                    "Possibilidade de extrair os dados em Excel",
                    "Facilite a análise e a correlação de dados entre os módulos da plataforma",
                    "Dashboards offline customizáveis sob demanda",
                    "Reports operacionais com dados técnicos dos processos mandatórios do DHO",
                    "Reports estratégicos com highlights e recomendações de ação para decisões assertivas",
                ],
            },
        ],
    },
    {
        id: "operacoes",
        title: "Operações & Serviços Internos",
        description: "Resolva processos operacionais do dia a dia dentro da mesma plataforma.",
        icon: FolderOpen,
        color: "#85568a",
        features: [
            {
                name: "Repositório de Arquivos",
                description: "Gestão de arquivos na palma da mão.",
                icon: FolderOpen,
                details: [
                    "Arquivos importantes da empresa num único local, em ambiente privado e seguro",
                    "Pastas e subpastas para organizar manuais, políticas, roteiros, processos, bibliotecas, holerites e mais",
                    "Gestão flexível de acesso aos arquivos por usuários, áreas e grupos",
                    "Comunique ao time as atualizações de cada arquivo",
                ],
            },
            {
                name: "Crachá Digital",
                description: "Digitalize o controle de acesso dos colaboradores na empresa.",
                icon: CreditCard,
                details: [
                    "Reduza o custo de materiais gráficos e impressão de crachás físicos",
                    "Economize o tempo gasto com processos manuais do RH",
                    "Controle de acesso via app, exclusivo para colaboradores ativos",
                    "Redução do tempo de entrada dos funcionários",
                    "Segurança, facilidade e praticidade no controle de acessos",
                    "Bloqueio imediato do crachá de colaboradores desligados",
                    "Exibição da última atualização de acesso pelo app",
                ],
            },
            {
                name: "Classificados (Marketplace)",
                description: "Transforme a rede interna da empresa em benefício para o colaborador.",
                icon: ShoppingBag,
                details: [
                    "Colaboradores compram e vendem produtos ou serviços entre si pela plataforma",
                    "Experiência dinâmica, prática e confiável dentro da rede da própria empresa",
                    "Converse com os interessados em um canal privado",
                    "Aumente o engajamento entre as pessoas, com um benefício para o colaborador",
                    "Estruture uma vitrine virtual da empresa para os colaboradores",
                ],
            },
            {
                name: "Integração com Sistemas",
                description: "Funciona integrado com o sistema que você já utiliza.",
                icon: Plug,
                details: [
                    "Integrações já existentes com Microsoft, Senior e Synergy",
                    "API preparada para integrar com outras plataformas",
                    "Login por SSO Google",
                    "Integração incluída na implantação",
                ],
            },
        ],
    },
];
