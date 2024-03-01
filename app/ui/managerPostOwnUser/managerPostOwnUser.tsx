'use client';
import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import area from '@/public/area.svg';
import bedroom from '@/public/bedroom.svg';
import bathroom from '@/public/bathroom.svg';


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

export default function ManagerPostOwnUser() {
    const [rentRealStates, setRentRealStates] = useState<RentRealStateProps[]>([]);

    async function getRentRealStates() {
        try {
            const response = await fetch(`https://localhost:7149/PostRealEstateApi/GetPostRealEstateByCutomerId`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
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

    return (
        <div>            
            <div className='pt-5'>                
                <div>
                    {rentRealStates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((property, index) => (
                        <Link key={property.id} className="w-full" href={`/seller/quan-ly-tin/${property.id}`}>
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
    )
}