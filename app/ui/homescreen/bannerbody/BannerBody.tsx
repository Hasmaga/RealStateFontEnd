import Image from "next/image"
import Link from "next/link"
import findhouse from "@/public/findhouse.svg"
import renthouse from "@/public/renthouse.svg"
import sellhouse from "@/public/sellhouse.svg"

export default function BannerBody() {
    return (
        <div className="flex flex-row w-full pl-36 pr-36 pt-24 pb-24 space-x-24 bg-slate-50 mt-20">
            <div className="w-1/2 flex flex-col space-y-5">
                {[
                    { title: 'Buy a new home', description: 'Find a home you love', link: '/mua-nha-dat', buttonText: 'Find Buy', image: findhouse },
                    { title: 'Rent a home', description: 'Find a home you love', link: '/thue-nha-dat', buttonText: 'Find A Rental', image: renthouse },
                    { title: 'Sell a home', description: 'Find a home you love', link: '/dang-tin', buttonText: 'New Property', image: sellhouse },
                ].map((item, index) => (
                    <div key={index} className="group w-full flex flex-row space-x-10 p-10 shadow-md rounded-md bg-white transform transition-transform duration-500 ease-in-out hover:scale-105 origin-left">
                        <Image alt="demo" width={100} height={100} src={item.image} />
                        <div className="flex flex-col space-y-1">
                            <p className="text-3xl">{item.title}</p>
                            <p className="text-lg">{item.description}</p>
                            <Link className="w-fit p-2 rounded-md bg-green-400 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" href={item.link}>
                                {item.buttonText}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-1/2 flex flex-col space-y-5 justify-center">
                <p className="text-7xl text-green-500">We Understand The Real Value of Home</p>
                <p className="text-xl text-gray-400">We’ll make sure your property gets in front of the right people.</p>
            </div>
        </div>
    )
}