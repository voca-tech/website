import Image from "next/image";

export default function DashboardPreviewSection() {
    return (
        <div className="bg-voca-gray-200">
            <div className="py-16 px-6 max-w-7xl m-auto flex justify-center">
                <Image 
                    src='/illustrations/dashboardsPreview.png'
                    alt="dashboards"
                    width={700}
                    height={700}
                />
            </div>

        </div>
    )
}