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

const TURNOVER = [
    "## O Brasil virou o país que mais troca de gente",
    "Levantamento da Robert Half com base nos dados do CAGED aponta que o Brasil registra hoje o maior índice de rotatividade do mundo, com crescimento de 56% em relação ao período pré-pandemia. Trocar de emprego deixou de ser um evento raro na carreira e virou rotina do mercado.",
    "Para o RH, isso muda o jogo. Não dá mais para tratar cada saída como um caso isolado, com uma entrevista de desligamento feita às pressas no último dia. A rotatividade virou um processo contínuo, e processo contínuo se gerencia com dado, não com impressão.",
    "## Quanto custa perder alguém",
    "A Society for Human Resource Management estima que repor um colaborador custa entre 50% e 200% do salário anual dele. A faixa é larga porque depende muito do cargo: posições operacionais costumam ficar entre 50% e 75%, funções técnicas e lideranças intermediárias entre 100% e 150%, e cargos executivos passam dos 200%.",
    "Esse número assusta porque quase nunca aparece no orçamento. O custo visível é o da rescisão e o do recrutamento. O invisível é o resto: a vaga aberta enquanto o time cobre a lacuna, o tempo até o substituto atingir produtividade plena, o conhecimento que saiu pela porta e a sobrecarga de quem ficou, que muitas vezes é o gatilho da próxima saída.",
    "## O pedido de demissão é o fim da linha, não o começo",
    "Quando a carta chega, a decisão já foi tomada há semanas ou meses. O que o RH costuma chamar de surpresa é, na maioria das vezes, um sinal que estava disponível e ninguém estava olhando.",
    "Os sinais mais comuns aparecem antes: queda sustentada no clima de uma área específica, participação despencando nas pesquisas, silêncio em canais que antes tinham voz, e espaçamento entre um feedback e outro na relação entre gestor e liderado. Nenhum desses isolado significa alguma coisa. Juntos e na mesma área, significam bastante.",
    "## O erro de olhar só a média",
    "A armadilha mais comum em pesquisa de clima é acompanhar a nota geral da empresa. Uma média de 8,2 parece confortável e esconde que uma área inteira está em 5,4 enquanto outra está em 9,1.",
    "Risco de saída raramente se distribui de forma uniforme. Ele se concentra em bolsões: um time específico, uma unidade, uma faixa de tempo de casa, uma liderança recém-promovida que ainda não aprendeu a dar feedback. Sem segmentar por área, grupo e período, o dado existe mas não serve para agir.",
    "## Frequência importa mais do que profundidade",
    "Uma pesquisa anual gigantesca é menos útil do que um sinal semanal curto. A anual chega tarde e mede um momento; a leitura contínua mostra tendência, e tendência é o que permite agir antes.",
    "Isso não significa bombardear o time de formulário. Significa combinar um instrumento leve e frequente, que capta a temperatura, com um instrumento profundo e ocasional, que investiga a causa quando a temperatura cai.",
    "## O que fazer com o dado depois",
    "Coletar é a parte fácil. O que separa um RH que reduz turnover de um que só mede é o que acontece na semana seguinte.",
    "Três coisas ajudam. A primeira é levar o recorte para quem tem poder de mudar: o gestor da área, não só a diretoria. A segunda é escolher uma ação por ciclo, específica e visível, em vez de um plano com quinze frentes que ninguém executa. A terceira, e a mais esquecida, é voltar ao time e contar o que mudou por causa do que ele respondeu.",
    "## Sem fechar o ciclo, a próxima pesquisa não vem",
    "Quando uma empresa pergunta e nada acontece, a taxa de resposta desaba no ciclo seguinte. E aí o RH perde o instrumento justamente quando mais precisa dele.",
    "Fechar o ciclo é o que transforma pesquisa de clima em sistema de retenção. Não é o formulário que segura talento. É a percepção, construída ao longo do tempo, de que falar ali muda alguma coisa.",
];

const RH_ESTRATEGICO = [
    "Quase todo RH quer ser estratégico. Poucos conseguem dizer, com precisão, o que ainda os prende ao operacional. A diferença raramente está na intenção do time, e quase sempre está em como o dia a dia foi montado.",
    "Abaixo, cinco sinais que costumam aparecer juntos. Se você reconhecer três, provavelmente o problema não é falta de gente, é estrutura.",
    "## 1. A planilha é o sistema de verdade",
    "Existe um sistema oficial, mas as decisões saem de uma planilha que alguém mantém à mão. Ela é exportada, cruzada, colorida e enviada por e-mail antes de cada reunião.",
    "O sintoma não é a planilha em si, é o retrabalho: alguém gasta dias por mês reconstruindo um número que deveria estar pronto. E como o dado nasce de um processo manual, ninguém confia nele o suficiente para tomar decisão difícil.",
    "## 2. Você só descobre os problemas quando eles já aconteceram",
    "O RH fica sabendo da insatisfação de um time pela carta de demissão. Fica sabendo do conflito com uma liderança pelo desligamento em bloco. Fica sabendo que o treinamento não pegou quando a auditoria pede o relatório.",
    "Um RH operacional documenta o passado. Um RH estratégico enxerga tendência. A diferença entre os dois não é a competência do time, é ter ou não um sinal contínuo chegando antes do evento.",
    "## 3. Ninguém sabe responder por que",
    "É comum uma empresa saber que o turnover está em 22%. É raro saber por quê, em qual área, em qual faixa de tempo de casa, e sob qual gestor.",
    "Indicador sem recorte vira número de apresentação. Ele mostra que existe um problema, mas não indica onde mexer. E aí a reunião termina com uma decisão genérica que não muda nada.",
    "## 4. As ferramentas não conversam entre si",
    "Clima em uma plataforma, avaliação em outra, treinamento numa terceira, comunicação num grupo de WhatsApp. Cada uma com seu login, seu relatório e seu formato de exportação.",
    "O custo aqui não é só o da assinatura. É a impossibilidade de correlacionar. Você não consegue perguntar se as áreas com pior clima são as mesmas com menor conclusão de treinamento, porque os dois dados nunca estiveram na mesma tabela.",
    "## 5. O RH é chamado depois da decisão",
    "Talvez o sinal mais claro de todos. A empresa decide abrir uma unidade, reestruturar uma área ou mudar o modelo de trabalho, e o RH entra para executar o que já foi decidido.",
    "Isso acontece quando o RH não chega à mesa com evidência. Quem leva dado de gente que se conecta a resultado de negócio participa da decisão. Quem leva percepção participa da execução.",
    "## O que muda quando a virada acontece",
    "A virada não é comprar um sistema. É passar a ter os dados de pessoas num lugar só, com recorte por área e por período, e uma cadência de leitura que não dependa de ninguém montar planilha.",
    "A partir daí o tempo do time muda de lugar. Sai da coleta e da consolidação, entra na análise e na conversa com a liderança. E é essa conversa, não o relatório, que faz o RH virar estratégico.",
];

const GAMIFICACAO = [
    "Ranking, pontos, medalha, desafio semanal. A gamificação entrou no RH com força e dividiu opinião: para uns é o que finalmente fez o time engajar com treinamento, para outros é infantilizar adulto no ambiente de trabalho.",
    "As duas leituras têm fundamento, e a diferença entre elas costuma estar em como a mecânica foi desenhada.",
    "## O que os dados mostram",
    "Pesquisa da TalentLMS aponta que 83% dos colaboradores se sentem mais motivados quando o treinamento inclui elementos de jogo, e 89% afirmam ser mais produtivos em ambientes gamificados.",
    "A literatura acadêmica vai na mesma direção quando o assunto é aprendizagem: há ganho consistente em retenção de conteúdo e em participação. Faz sentido, porque a mecânica de jogo resolve dois problemas clássicos do treinamento corporativo, que são a falta de feedback imediato e a ausência de progresso visível.",
    "## Onde ela falha",
    "A mesma literatura é clara sobre o outro lado: o excesso de ludicidade pode gerar desmotivação, frustração e dependência de recompensa externa.",
    "O mecanismo é conhecido. Quando a pessoa passa a agir pelo ponto e não pelo conteúdo, você substituiu a motivação intrínseca pela extrínseca. Enquanto o ponto existir, o comportamento se mantém. No dia em que a campanha acaba, o comportamento vai junto.",
    "Ranking público é o caso mais delicado. Ele funciona bem para quem está no topo e desmobiliza quem está na base, que é justamente quem você mais precisa alcançar.",
    "## O que separa um caso do outro",
    "Três decisões, na prática, definem o resultado.",
    "A primeira é o que você recompensa. Premiar conclusão de trilha estimula clicar rápido até o fim. Premiar acerto em quiz e aplicação do conteúdo estimula aprender. Parece detalhe, muda tudo.",
    "A segunda é contra quem a pessoa compete. Comparação com o próprio histórico funciona para quase todo mundo. Comparação com o colega funciona para uma minoria e afasta o resto.",
    "A terceira é a duração. Campanha com início e fim claros cria um pico de atenção. Gamificação permanente, sem renovação, vira ruído em dois meses.",
    "## Vale a pena, com uma condição",
    "Vale, desde que a mecânica sirva ao conteúdo e não o contrário. Gamificação não conserta treinamento ruim, comunicação sem propósito ou cultura que não reconhece ninguém no resto do ano.",
    "O melhor teste é simples: se você removesse os pontos amanhã, sobraria alguma razão para a pessoa participar? Se a resposta for não, o problema nunca foi o engajamento.",
];

const LGPD_RH = [
    "Quando a LGPD entrou em vigor, boa parte das empresas olhou primeiro para o cliente: consentimento no site, política de privacidade, banner de cookies. O RH ficou para depois.",
    "O problema é que o RH é, em muitas empresas, a área que trata o maior volume de dado sensível. Ele guarda documento, endereço, dado bancário, atestado médico, avaliação de desempenho, resultado de pesquisa de clima e, em alguns casos, biometria.",
    "## Consentimento quase nunca é a base certa",
    "Esse é o erro mais comum, e ele começa com boa intenção: pedir autorização assinada para tudo.",
    "Na relação de trabalho, consentimento é uma base frágil, porque existe subordinação. É difícil sustentar que a manifestação foi livre quando quem pede é o empregador e quem concede é o empregado. Além disso, consentimento pode ser revogado a qualquer momento, e a empresa não pode simplesmente parar de processar a folha porque alguém revogou.",
    "Na prática, as bases mais comuns no RH são outras duas: a execução do contrato de trabalho, prevista no artigo 7º, inciso V, e o cumprimento de obrigação legal ou regulatória, no inciso II. É por elas que se sustenta processar folha, recolher encargos, cumprir exigências trabalhistas e previdenciárias.",
    "## Legítimo interesse existe, mas exige teste",
    "Para tratamentos que não cabem nas duas anteriores, como análises de desempenho e algumas ações de gestão, o legítimo interesse é uma base válida.",
    "Ela não é, porém, um curinga. O legítimo interesse exige um exercício de balanceamento: a empresa precisa demonstrar que a finalidade é legítima, que o tratamento é necessário para alcançá-la e que o interesse dela não se sobrepõe aos direitos e liberdades do colaborador. Esse raciocínio precisa estar documentado, não só ter sido feito de cabeça.",
    "## Recrutamento é o ponto mais esquecido",
    "Currículo de candidato é dado pessoal. E candidato que não foi contratado não tem contrato de trabalho para servir de base legal.",
    "Duas perguntas costumam expor o problema. Por quanto tempo a empresa guarda os currículos que recebeu? E o que exatamente ela faz com o banco de talentos que acumulou nos últimos cinco anos? Se a resposta for indefinidamente e não sei, existe um passivo ali.",
    "## Dado sensível pede cuidado redobrado",
    "Atestado médico, informação de saúde ocupacional, dado biométrico de ponto e informação sindical entram na categoria de dado pessoal sensível, com regime próprio na lei.",
    "Isso muda o padrão de acesso. Não basta a informação estar no sistema: é preciso saber quem consegue ver, por qual motivo, e conseguir provar isso depois. Controle de acesso por perfil deixa de ser conveniência e vira exigência.",
    "## Direitos do titular valem para quem trabalha na empresa",
    "Colaborador é titular de dados como qualquer outra pessoa. Ele pode pedir acesso, correção, portabilidade e eliminação, e a empresa precisa ter um caminho claro para receber e responder esse pedido.",
    "Na prática isso significa duas coisas: existir um canal conhecido internamente, normalmente com o encarregado pelo tratamento de dados, e existir prazo e responsável definidos. Um pedido que se perde entre o RH e o jurídico é um problema em formação.",
    "## Por onde começar",
    "O primeiro passo não é comprar ferramenta, é fazer o inventário: quais dados de pessoas a empresa trata, onde eles estão, quem acessa, por quanto tempo ficam e sob qual base legal.",
    "Esse mapa costuma revelar mais do que qualquer auditoria. Ele mostra as planilhas paralelas, os grupos de mensagem com foto de documento, o acesso de alguém que mudou de área há dois anos e o backup que ninguém sabia que existia.",
    "## Uma nota sobre fiscalização",
    "A ANPD tem atuado de forma gradual, orientando antes de aplicar sanção, com níveis de penalidade proporcionais à gravidade. Isso dá margem para se organizar, mas não é motivo para adiar.",
    "O risco relevante para o RH, na maioria dos casos, não é a multa da autoridade. É o incidente: uma base de dados de colaboradores exposta, uma informação de saúde que circulou onde não devia, uma reclamação trabalhista que vira também um processo de proteção de dados.",
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
        readTime: "4 min de leitura",
        content: TURNOVER,
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
        readTime: "3 min de leitura",
        content: RH_ESTRATEGICO,
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
        readTime: "3 min de leitura",
        content: GAMIFICACAO,
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
        readTime: "4 min de leitura",
        content: LGPD_RH,
    },
];
