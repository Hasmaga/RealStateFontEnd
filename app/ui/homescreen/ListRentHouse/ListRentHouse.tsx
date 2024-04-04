'use client';
import Image from "next/image"
import bedroom from "@/public/bedroom.svg"
import bathroom from "@/public/bathroom.svg"
import area from "@/public/area.svg"
import { useEffect, useState } from "react";
import Link from "next/link";
import { RentHouse } from "@/app/lib/InterfacerLib";
import { URL } from "@/app/lib/Url";

export default function ListRentHouse() {
    const [listRentHouse, setListRentHouse] = useState<RentHouse[]>([]);

    async function getRentHouse() {
        try {
            const response = await fetch(`https://${URL}/PostRealEstateApi/GetTitleRentPostRealEstateByPlanTop`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setListRentHouse(data);
        } catch (error) {
            console.error("Failed to fetch rent real states:", error);
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            getRentHouse();
        }
    }, []);

    return (
        <div className="sm:pl-20 sm:pr-20 pl-10 pr-10 space-y-10">
            <div className="flex flex-col space-y-4">
                <h1 className="text-5xl text-center font-bold pt-10">Nhà trọ cho thuê</h1>
                <p className="text-center text-lg">Tìm kiếm nhà trọ cho thuê</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {listRentHouse.map((house) => {
                    return (
                        <Link href={`/thue-nha-dat/${house.id}`} key={house.id} className="shadow-lg p-4 rounded-md flex flex-col space-y-5 bg-white">
                            <div className="bg-slate-700 w-full h-60 rounded-md ">
                                <Image src={`data:image/jpeg;base64,${house.imageCover}`} alt="property" layout='fixed' height={400} width={550} className='object-center h-60 rounded-lg' />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <h2 className="text-xl font-bold">{house.title}</h2>
                                <p className="text-lg">{house.city}, {house.district}, {house.ward}, {house.address}</p>
                                <p className="text-lg">{house.price.toLocaleString()} {house.priceUnit}/tháng</p>
                            </div>
                            <div className="flex flex-row space-x-5 border-t-2 pt-2">
                                <div className="flex flex-row space-x-2">
                                    <Image src={bedroom} width={25} height={25} alt="bedroomsvg" />
                                    <p className="text-lg">{house.totalBedRoom}</p>
                                </div>
                                <div className="flex flex-row space-x-2">
                                    <Image src={bathroom} width={25} height={25} alt="bathroomsvg" />
                                    <p className="text-lg">{house.totalBathRoom}</p>
                                </div>
                                <div className="flex flex-row space-x-2">
                                    <Image src={area} width={25} height={25} alt="areapng" />
                                    <p className="text-lg">{house.area} m²</p>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
