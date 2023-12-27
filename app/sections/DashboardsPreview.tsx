import Image from "next/image";

export default function DashboardPreviewSection() {
    return (
        <div className="bg-gradient-to-b from-slate-600 to-slate-400">
            <div className="py-16 px-6 max-w-7xl m-auto flex flex-col-reverse text-center items-center lg:flex-row gap-8 justify-center">
                <div className="text-slate-200">
                    <h1 className="text-3xl font-semibold">Relatórios online e customizados </h1>
                    <h3 className="text-xl mt-2">Somos os &quot;waze&quot; para as lideranças na empresa</h3>

                    <div className="mt-10 flex flex-col gap-4">
                        <p>- Compile os indicadores em tempo real</p>
                        <p>- Tome decisões rápidas e assertivas por dados</p>
                        <p>- Receba insights e sugestão de ação</p>
                        <p>- Entenda o impacto das ações entre os times</p>
                        <p>- Facilite a gestão contínua das emoções</p>
                    </div>
                </div>
                <Image
                    src='/illustrations/dashboardsPreview.png'
                    alt="dashboards"
                    width={400}
                    height={400}
                />
            </div>

        </div>
    )
}