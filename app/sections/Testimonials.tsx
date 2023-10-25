import { Sparkles } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function TestimonialsSection() {
    const users = [
        { id: 1, name: 'Carol Guerra', company: 'Credi10', avatar: '/avatars/user1.jpg', testimonial: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ipsatis ullam id earum. Laudantium nihil fuga odio saepe placeat est autem ratione sequi sunt?' },
        { id: 2, name: 'Rodrigo Carvalho', company: 'Grupo Akaer', avatar: '/avatars/user2.jpg', testimonial: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ipsatis ullam id earum. Laudantium nihil fuga odio saepe placeat est autem ratione sequi sunt?' },
        { id: 3, name: 'Bárbara Silveira', company: 'Belas Artes', avatar: '/avatars/user4.jpg', testimonial: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ipsatis ullam id earum. Laudantium nihil fuga odio saepe placeat est autem ratione sequi sunt?' },
        { id: 4, name: 'João Costa', company: 'Woodbridge', avatar: '/avatars/user3.jpg', testimonial: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ipsatis ullam id earum. Laudantium nihil fuga odio saepe placeat est autem ratione sequi sunt?' },
    ]

    return (
        <div className="bg-voca-blue-200">
            <div className="flex flex-col gap-10 py-16 px-6 justify-center items-center max-w-7xl m-auto">
                <div className="flex flex-col gap-1 items-center">
                    {/* <Sparkles /> */}
                    <h2 className="text-2xl text-teal-800 font-bold text-center">
                        ELES TÊM VOZ NA VEIA
                    </h2>
                    <h4 className="text-lg text-teal-700 text-center">
                        Clientes que fazem do VOCA uma extensão <br /> de suas empresas
                    </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {users.map(user => (
                        <Card key={user.id}>
                            <CardHeader className="flex flex-row gap-4 py-4">
                                <Image
                                    src={user.avatar}
                                    alt="User photo"
                                    width={50}
                                    height={50}
                                    className="rounded-full aspect-square shadow-md bg-cover"
                                />
                                <div>
                                    <CardTitle>{user.name}</CardTitle>
                                    <CardDescription className="mt-1">{user.company}</CardDescription>
                                </div>
                            </CardHeader>
                            <Separator className="w-5/6 mx-auto mb-4" />
                            <CardContent>
                                <p>{user.testimonial}</p>
                            </CardContent>
                            {/* <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter> */}
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}