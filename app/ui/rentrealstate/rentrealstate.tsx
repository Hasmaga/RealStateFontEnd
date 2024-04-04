'use client';
import Image from 'next/image';
import Ads1 from '@/public/Ads1.jpg';
import Ads2 from '@/public/Ads2.jpg';
import area from '@/public/area.svg';
import bedroom from '@/public/bedroom.svg';
import bathroom from '@/public/bathroom.svg';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { URL } from '@/app/lib/Url';
import { format } from 'date-fns';

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

export default function RentRealState() {

    const [rentRealStates, setRentRealStates] = useState<RentRealStateProps[]>([]);

    async function getRentRealStates() {
        try {
            const response = await fetch(`https://${URL}/PostRealEstateApi/GetTitleRentPostRealEstate`);
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
        getRentRealStates();
    }, []);

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(rentRealStates.length / itemsPerPage);

    const handleClick = (page: any) => {
        setCurrentPage(page);
    };

    const currentDate = new Date();
    const formattedDate = format(currentDate, 'MM/yyyy');

    return (
        <div className="pl-10 pr-10 sm:pr-20 sm:pl-20">
            <div>
                <strong className='text-xl'>{`Thuê Nhà Việt Nam Cập Nhật Mới Nhất ${formattedDate}`}</strong>
            </div>
            <div className='pt-5 flex flex-col sm:flex-row sm:space-x-5 justify-between'>
                <div className='w-full sm:w-8/12'>
                    {rentRealStates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((property, index) => (
                        <Link key={property.id} className="w-full" href={`/thue-nha-dat/${property.id}`}>
                            <div className="w-full border-b-2 space-x-10 flex flex-col sm:flex-row pb-5 mb-5">
                                <div className='relative w-full sm:w-2/5 overflow-hidden'>
                                    <div className='w-full h-36 sm:w-64 sm:h-36 overflow-hidden'>
                                        <Image src={`data:image/jpeg;base64,${property.imageCover}`} alt="property" layout='fill' className='object-fill h-36 w-full sm:w-64 rounded-lg' />
                                        <div className='absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white text-xs sm:hidden rounded-xl'>
                                            <p>{property.title}</p>
                                            <p>{property.city}, {property.district}</p>
                                            <p>{property.price.toLocaleString()} {property.priceUnit}/tháng</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full sm:w-3/5 flex flex-col justify-evenly sm:block'>
                                    <p className='text-green-500 font-bold text-sm sm:text-base hidden sm:block'>{property.title}</p>
                                    <p className='text-gray-500 hidden sm:block'>{property.city}, {property.district}</p>
                                    <div className='hidden sm:block'>
                                        <div className='flex flex-row space-x-3 '>
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
                                    </div>
                                    <strong className='text-green-500 text-sm sm:text-base hidden sm:block'>{property.price.toLocaleString()} {property.priceUnit}/tháng</strong>
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
                <div className='sm:w-3/12 w-full space-y-5 hidden sm:block'>
                    <Image src={Ads1} alt="banner" className='w-full object-cover rounded-lg' />
                    <Image src={Ads2} alt="banner" className='w-full object-cover rounded-lg' />
                </div>
            </div>
        </div>
    );
}