'use client';
import Image from "next/image"
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RentHouse } from "@/app/lib/InterfacerLib";
import { URL } from "@/app/lib/Url";

export default function ListSellHouse() {

    const [listSellHouse, setListSellHouse] = useState<RentHouse[]>([]);

    async function getSellHouse() {
        try {
            const response = await fetch(`https://${URL}/PostRealEstateApi/GetTitleBuyPostRealEstateByPlanTop`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setListSellHouse(data);
        } catch (error) {
            console.error("Failed to fetch sell real states:", error);
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            getSellHouse();
        }
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % listSellHouse.length);
    };

    const handleBack = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + listSellHouse.length) % listSellHouse.length);
    };


    return (
        <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-5 w-full sm:pl-20 sm:pr-20 pl-10 pr-10 justify-center">
            <div className="w-full sm:w-1/3 p-10 space-y-5">
                <p className="text-5xl font-bold text-green-500">Bán bất động sản</p>
                <p className="text-xl text-gray-400">Danh sách bất động sản, chúng tôi nghĩ rằng bạn sẽ thích nó</p>
                {/* Arrow for show next list */}
                <div className="flex flex-row space-x-5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center p-10 text-4xl border-2 transition-colors duration-500 ease-in-out hover:bg-green-500 hover:text-white cursor-pointer" onClick={handleBack}>
                        <p>{"<"}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center p-10 text-4xl border-2 transition-colors duration-500 ease-in-out hover:bg-green-500 hover:text-white cursor-pointer" onClick={handleNext}>
                        <p>{">"}</p>
                    </div>
                </div>

            </div>
            <div className="w-full flex flex-col sm:flex-row space-x-0 sm:space-x-5 pl-2 pr-2">
                {listSellHouse.slice(currentIndex, currentIndex + 3).map((house, index) => (
                    <Link key={house.id} className="w-full sm:w-1/2 md:w-1/3 relative" href={`/mua-nha-dat/${house.id}`}>
                        <Image src={`data:image/jpeg;base64,${house.imageCover}`} alt="house" className="w-full h-full object-cover rounded-md" width={150} height={600} />
                        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-500 ease-in-out rounded-sm"></div>
                        <div className="text-lg absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-3 w-3/4 flex flex-row rounded-md shadow-xl space-x-3">
                            <div className="w-11/12">
                                <p className="sm:text-base text-green-400 font-bold text-xs ">{house.title}</p>
                                <p className="sm:text-base text-xs text-green-400">{house.price.toLocaleString()} vnd</p>
                            </div>
                            <div className="w-1/12 flex items-center justify-center text-3xl ">
                                <p className="justify-center">{">"}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}