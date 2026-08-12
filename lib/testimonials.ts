export interface Quote {
    name: string;
    role: string;
    company: string;
    avatar?: string;
    logo?: string;
    text: string;
    caseSlug: string;
}

export const quotes: Quote[] = [
    { name: 'André', role: 'CEO', company: 'Engeform', avatar: '/avatars/engeform-andre.png', text: 'O VOCA nos ajudou de forma simples a resolver problemas complexos.', caseSlug: 'engeform' },
    { name: 'Cristiano', role: 'Gestor de RH', company: 'Belas Artes', avatar: '/avatars/ba-cristiano.jpg', logo: '/clients/belasartes.png', text: 'O VOCA é uma ferramenta muito importante para fortalecer a comunicação no ambiente corporativo. Não há dúvidas que tem ajudado muito o RH.', caseSlug: 'belas-artes' },
    { name: 'Erika', role: 'Coordenadora de RH', company: 'Credi10', avatar: '/avatars/credi10-erika.jpg', logo: '/clients/credi10.png', text: 'O VOCA é mais do que um sistema, é a voz dos nossos colaboradores que nos traz ideias, feedbacks e engajamento entre todos.', caseSlug: 'credi10-compliance' },
    { name: 'Walter Rodrigues', role: 'Diretor de RH', company: 'Grant Thornton', logo: '/clients/grantthornton.png', text: 'O VOCA combina funcionalidades de DHO e comunicação interna na mesma plataforma, o que facilita muito para trabalhar o engajamento do time de forma contínua.', caseSlug: 'grant-thornton' },
    { name: 'Mauricio Cabral', role: 'Head de Pessoas e Cultura', company: 'Akaer', avatar: '/avatars/akaer-mauricio.jpg', logo: '/clients/akaer.png', text: 'A plataforma do VOCA vai além do convencional, promovendo uma cultura de inclusão e participação ativa. Sua contribuição para a melhoria da experiência do colaborador é evidente!', caseSlug: 'akaer' },
    { name: 'Diego Bortolucci', role: 'Partner & COO', company: 'SPS Group', text: 'Espetacular suite de soluções para atender clima corporativo, capacitação, gestão de mudanças organizacionais e projetos complexos. Recomendo fortemente!', caseSlug: 'sps-group' },
];

const HOME_QUOTE_SLUGS = ['grant-thornton', 'akaer', 'sps-group'];

export const homeQuotes: Quote[] = HOME_QUOTE_SLUGS.map(
    (slug) => quotes.find((quote) => quote.caseSlug === slug)!
);
