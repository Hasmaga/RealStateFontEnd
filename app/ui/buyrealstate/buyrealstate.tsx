'use client';
import Image from 'next/image';
import fakeImage from '@/public/demo.jpg';
import Ads1 from '@/public/Ads1.jpg';
import Ads2 from '@/public/Ads2.jpg';
import area from '@/public/area.svg';
import bedroom from '@/public/bedroom.svg';
import bathroom from '@/public/bathroom.svg';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface RentRealStateProps {
    id: string;
    title: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    street: string;
    price: number;
    priceUnit: string;
    furniture: string;
    totalBathRoom: number;
    totalBedRoom: number;
    totalFloor: number;
    area: number;
    imageCover: string;
}

export function BuyRealState() {

    const [rentRealStates, setRentRealStates] = useState<RentRealStateProps[]>([]);

    async function getBuyRealStates() {
        try {
            const response = await fetch("https://localhost:7149/PostRealEstateApi/GetTitleBuyPostRealEstate");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setRentRealStates(data);
        } catch (error) {
            console.error("Failed to fetch rent real states:", error);
        }
    }

    useEffect(() => {
        getBuyRealStates();
    }, []);

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(rentRealStates.length / itemsPerPage);

    const handleClick = (page: any) => {
        setCurrentPage(page);
    };

    return (
        <div className="pt-10 pl-52 pr-52">
            <div>
                <strong className='text-xl'>Mua Bán Nhà Đất Việt Nam Cập Nhật Mới Nhất Tháng 1/2024</strong>
            </div>
            <div className='pt-5'>
                <div className='float-right w-3/12 space-y-5'>
                    <Image src={Ads1} alt="banner" className='w-full h-full object-cover rounded-lg' />
                    <Image src={Ads2} alt="banner" className='w-full h-full object-cover rounded-lg' />
                </div>
                <div className='float-left w-8/12'>
                    {rentRealStates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((property, index) => (
                        <Link key={index} className="w-full" href={`/mua-nha-dat/${property.id}`}>
                            <div className="w-full border-b-2 space-x-10 flex flex-row pb-5 mb-5">
                                <div className='w-2/5 overflow-hidden'>
                                    <div className='w-64 h-36 overflow-hidden'>
                                        <Image src={`data:image/jpeg;base64,${property.imageCover}`} alt="property" layout='fixed' height={100} width={200} className='object-scale-down rounded-lg' />
                                    </div>
                                </div>
                                <div className='w-3/5 flex flex-col justify-evenly'>
                                    <p className='text-green-500 font-bold'>{property.title}</p>
                                    <p className='text-gray-500'>{property.city}, {property.district}</p>
                                    <div className='flex flex-row space-x-3'>
                                        <div className='flex flex-row space-x-2'>
                                            <Image src={area} alt="area" className='w-5 h-5' />
                                            <p className='font-bold text-cyan-500'>{property.area} m2</p>
                                        </div>
                                        <div className='flex flex-row space-x-2'>
                                            <Image src={bedroom} alt="bedroom" className='w-5 h-5' />
                                            <p>{property.totalBedRoom} PN</p>
                                        </div>
                                        <div className='flex flex-row space-x-2'>
                                            <Image src={bathroom} alt="toilet" className='w-5 h-5' />
                                            <p>{property.totalBathRoom} WC</p>
                                        </div>
                                    </div>
                                    <strong className='text-green-500'>{property.price} {property.priceUnit}</strong>
                                </div>
                            </div>
                        </Link>
                    ))}
                    <div className="pagination flex flex-row justify-center space-x-5 p-2">
                        {[...Array(totalPages)].map((_, index) => (
                            <button key={index} onClick={() => handleClick(index + 1)}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}