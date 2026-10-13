import { Button } from "@/components/ui/button";

export function AnnouncementBar() {
    return (
        <div className="bg-slate-900 py-2.5 px-4 flex justify-center">
            <a href="https://plataforma.voca.com.br/login">
                <Button size="sm" className="bg-voca-green hover:bg-voca-green/90 font-semibold px-5 text-sm">
                    Acesse a plataforma →
                </Button>
            </a>
        </div>
    );
}
