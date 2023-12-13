import { Heart, MessageCircle, Repeat2, Upload } from "lucide-react";
import { WhatsappLink } from "@/components/WhatsappLink";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function TestimonialsSection() {
    const users = [
        { id: 1, name: 'Priscila', role: 'Gestora de RH na Woodbridge', avatar: '/avatars/wb-priscila.jpg', testimonial: 'O time aceitou muito bem o novo processo de feedbacks, chegando a mais de 2.000 registros em um único mês' },
        // { id: 2, name: 'Luciene', role: 'Gestora de RH na Engeform', avatar: '/avatars/akaer-mauricio.jpg', testimonial: 'Fiquei muito feliz de ser reconhecida como a mais elogiada do mês. Isso tem um poder enorme na minha motivação' },
        { id: 3, name: 'Cristiano', role: 'Gestor de RH da Belas Artes', avatar: '/avatars/ba-cristiano.jpg', testimonial: 'O VOCA é uma ferramenta muito importante para fortalecer a comunicação no ambiente corporativo. Não há dúvidas que tem ajudado muito o RH.' },
        // { id: 4, name: 'Jucimara', role: 'Gestore de RH na Woodbridge', avatar: '/avatars/akaer-mauricio.jpg', testimonial: 'Aplicamos a pesquisa em nossa planta e o resultado tem sido aceito, com 96% de adesão.' },
        // { id: 5, name: 'André', role: 'Gestor de RH da Engerform', avatar: '/avatars/user1.jpg', testimonial: 'O VOCA nos ajudou de forma simples a resolver problemas complexos.' },
        { id: 6, name: 'Lorryane', role: 'Gestora de RH da Credi10', avatar: '/avatars/credi10-lorrayne.jpg', testimonial: 'O VOCA encaixou como uma luva, o módulo de treinamentos era exatamente o que precisávamos.' },
        // { id: 7, name: 'Cristiane', role: 'Gestora de RH da Belas Artes', avatar: '/avatars/user1.jpg', testimonial: 'O VOCA permite avaliar se devemos efetivar ou não um colaborador antes do término do seu período de experiência, evitando custos desnecessários para a empresa.' },
        { id: 8, name: 'Mauricio', role: 'Gestor de RH na Akaer', avatar: '/avatars/akaer-mauricio.jpg', testimonial: 'Ouvir o colaborador de forma simples no onboarding e offboarding, além da avaliação de desempenho, são diferenciais que não encontramos fácil no mercado.' },
    ]

    return (
        <div id="testimonials" className="bg-gradient-to-tl from-sky-50 to-sky-200 py-16 px-6">
            <div className="flex flex-col gap-10 justify-center items-center max-w-7xl m-auto">
                <div className="flex flex-col gap-1 items-center">
                    {/* <Sparkles /> */}
                    <h2 className="text-2xl text-cyan-900 font-bold text-center">
                        ELES TÊM VOZ NA VEIA
                    </h2>
                    <h4 className="text-lg text-cyan-900 text-center">
                        Clientes que fazem do VOCA uma extensão <br /> de suas empresas
                    </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
                    {users.map(user => (
                        <div key={user.id} className="px-8 pb-4 mt-8 bg-white rounded-lg shadow-lg flex flex-col gap-4 items-center text-center">
                            <Avatar className="-mt-10">
                                <AvatarImage src={user.avatar} />
                            </Avatar>
                            <div className="text-slate-400 text-sm">
                                <p>{user.name}</p>
                                <p>{user.role}</p>
                            </div>
                            <p className="text-slate-600">{user.testimonial}</p>
                            <div className="flex justify-between w-full text-slate-300 mt-auto">
                                <Heart size={20} className="hover:scale-110 hover:text-red-600 transition-all" />
                                <MessageCircle size={20} className="hover:scale-110 hover:text-cyan-600 transition-all" />
                                <Repeat2 size={20} className="hover:scale-110 hover:text-lime-600 transition-all" />
                                <Upload size={20} className="hover:scale-110 hover:text-indigo-600 transition-all" />
                            </div>
                        </div>
                    ))}
                </div>

                <WhatsappLink />
            </div>
        </div>
    )
}