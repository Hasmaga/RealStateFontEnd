import Image from "next/image"
import Find from "@/public/Find.jpg"
import Clock from "@/public/Clock.jpg"
import Safe from "@/public/Safe.jpg"

export default function BannerWhyChoose() {
    return (
        <div className="flex flex-col space-y-5 w-full sm:pl-20 sm:pr-20 pl-10 pr-10">
            <div className="text-center">
                <p className="font-bold text-3xl">VỚI RENTHOUSE</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between w-full space-y-5 md:space-y-0 items-center">
                {[
                    { src: Find, alt: "icon", title: "DỄ DÀNG TÌM KIẾM", description: "Hệ thống thông minh giúp bạn lọc nhanh theo vị trí, giá cả, diện tích, tiện ích..." },
                    { src: Clock, alt: "icon", title: "TIẾT KIỆM THỜI GIAN", description: "Truy cập hàng ngàn tin đăng nhà mới nhất được cập nhật liên tục." },
                    { src: Safe, alt: "icon", title: "AN TÂM GIAO DỊCH", description: "Pháp lý, thủ tục an toàn, minh bạch." },
                ].map((item, index) => (
                    <div key={index} className="relative">
                        <Image src={item.src} alt={item.alt} width={250} className="rounded-lg shadow-lg" />
                        <p className="absolute top-0 left-0 text-xl font-semibold text-white pt-5 pl-5">{item.title}</p>
                        <p className="absolute bottom-0 left-0 text-sm text-white pl-5 pr-5 pb-5">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}