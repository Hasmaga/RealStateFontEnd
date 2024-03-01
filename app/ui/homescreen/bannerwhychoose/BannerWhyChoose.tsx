import Image from "next/image"
import Ads1 from "@/public/Ads1.jpg"
import Ads2 from "@/public/Ads2.jpg"
import Ads3 from "@/public/Ads3.jpg"

export default function BannerWhyChoose() {
    return (
        <div className="flex flex-col space-x-5 w-full pl-10 pr-10 pt-20 pb-20 bg-yellow-200 space-y-10">
            <div className="text-center space-y-5">
                <p className="text-5xl font-bold text-green-500">Why Choose Us?</p>
                <p className="text-lg text-gray-500">We are the best in the business</p>
            </div>
            <div className="w-full grid grid-cols-3">
                {[
                    { src: Ads1, alt: "icon", title: "Best Deals", description: "We provide the best deals in the market" },
                    { src: Ads2, alt: "icon", title: "Best Deals", description: "We provide the best deals in the market" },
                    { src: Ads3, alt: "icon", title: "Best Deals", description: "We provide the best deals in the market" },
                ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center space-y-5">
                        <Image src={item.src} alt={item.alt} width={200} className="rounded-lg shadow-lg" />
                        <p className="text-3xl font-bold text-green-500">{item.title}</p>
                        <p className="text-xl text-gray-500">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}