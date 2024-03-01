'use client';
import Image from "next/image"
import House1 from "@/public/demo.jpg"
import { useState } from "react";
import React from "react";
import Link from "next/link";
import { link } from "fs";

export default function ListSellHouse() {

    const listSellHouse = [
        {
            id: 1,
            title: "Bất động sản, Quận 1",
            price: "5.000.000.000 đ",
            image: House1,
            link: "/mua-nha-dat"
        },
        {
            id: 2,
            title: "Bất động sản, Quận 2",
            price: "5.000.000.000 đ",
            image: House1,
            link: "/mua-nha-dat"
        },
        {
            id: 3,
            title: "Bất động sản, Quận 3",
            price: "5.000.000.000 đ",
            image: House1,
            link: "/mua-nha-dat"
        },
        {
            id: 4,
            title: "Bất động sản, Quận 4",
            price: "5.000.000.000 đ",
            image: House1,
            link: "/mua-nha-dat"
        },
        {
            id: 5,
            title: "Bất động sản, Quận 5",
            price: "5.000.000.000 đ",
            image: House1,
            link: "/mua-nha-dat"
        },
        {
            id: 6,
            title: "Bất động sản, Quận 6",
            price: "5.000.000.000 đ",
            image: House1,
            link: "/mua-nha-dat"
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % listSellHouse.length);
    };

    const handleBack = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + listSellHouse.length) % listSellHouse.length);
    };


    return (
        <div className="flex flex-row space-x-5 w-full pl-10">
            <div className="w-1/3 p-10 space-y-5">
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
            <div className="w-2/3 flex flex-row space-x-5 pl-10 pr-10">
                {listSellHouse.slice(currentIndex, currentIndex + 3).map((house, index) => (
                    <Link key={house.id} className="w-1/3 relative" href={house.link}>
                        <Image src={house.image} alt="house" className="w-full h-full object-cover rounded-md" />
                        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-500 ease-in-out rounded-sm"></div>
                        <div className="text-lg absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white text-black p-3 w-3/4 flex flex-row rounded-md shadow-xl space-x-3">
                            <div className="w-11/12">
                                <p className="text-lg text-green-400 font-bold">{house.title}</p>
                                <p className="text-lg text-green-400">{house.price}</p>
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