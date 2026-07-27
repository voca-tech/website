export interface Quote {
    name: string;
    role: string;
    avatar: string;
    logo?: string;
    text: string;
    caseSlug: string;
}

export const quotes: Quote[] = [
    { name: 'André', role: 'CEO na Engeform', avatar: '/avatars/engeform-andre.png', text: 'O VOCA nos ajudou de forma simples a resolver problemas complexos.', caseSlug: 'engeform' },
    { name: 'Cristiano', role: 'Gestor de RH da Belas Artes', avatar: '/avatars/ba-cristiano.jpg', logo: '/clients/belasartes.png', text: 'O VOCA é uma ferramenta muito importante para fortalecer a comunicação no ambiente corporativo. Não há dúvidas que tem ajudado muito o RH.', caseSlug: 'belas-artes' },
    { name: 'Erika', role: 'Coordenadora de RH da Credi10', avatar: '/avatars/credi10-erika.jpg', logo: '/clients/credi10.png', text: 'O VOCA é mais do que um sistema, é a voz dos nossos colaboradores que nos traz ideias, feedbacks e engajamento entre todos.', caseSlug: 'credi10-compliance' },
];
