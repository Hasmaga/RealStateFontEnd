'use client';
import { useEffect, useState } from "react";
import Image from 'next/image';
import CommentPost from "@/app/ui/commentPost/commentPost";
import { URL } from "@/app/lib/Url";

interface images {
    image: string;
}

interface RentRealStateProps {
    typeRealState: string;
    name: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    street: string;
    description: string;
    contactName: string;
    contactEmail: string;
    phone: string;
    price: number;
    priceUnit: string;
    furniture: string;
    totalRoom: number;
    totalBathRoom: number;
    totalBedRoom: number;
    totalFloor: number;
    area: number;
    postDay: string;
    images: images[];
}

export default function Page({ params }: {
    params: {
        id: string
    }
}) {
    const [token, setToken] = useState<string | null>(null);
    const [rentRealState, setRentRealState] = useState<RentRealStateProps>();
    const [previewImage, setPreviewImage] = useState<string>('');



    async function getRentRealState() {
        try {
            const response = await fetch(`https://${URL}/PostRealEstateApi/GetPostRealEstateById/${params.id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setRentRealState(data);
        } catch (error) {
            console.error("Failed to fetch rent real state:", error);
        }
    }

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        getRentRealState();
    }, []);

    useEffect(() => {
        if (rentRealState?.images.length) {
            setPreviewImage(rentRealState.images[0].image);
        }
    }, [rentRealState]);

    const handleImageClick = (image: string) => {
        setPreviewImage(image);
    };

    return (
        <div className="w-full flex flex-col space-y-5 sm:space-y-0 sm:flex-row-reverse justify-center pl-10 pr-10 sm:pr-20 sm:pl-20 mb-10">
            <div className="w-full sm:w-3/12 sm:ml-5">
                <div className="flex border-2 rounded-lg flex-wrap flex-col items-center pt-5 pb-5 space-y-2">
                    <p className="font-light text-xs">Được đăng bởi</p>
                    <p className="font-semibold">{rentRealState?.contactName}</p>
                    <p className="w-3/4 text-center pt-2 pb-2 shadow-lg rounded-lg bg-green-500 text-white">{rentRealState?.phone}</p>
                </div>
            </div>
            <div className="space-y-5 w-full sm:w-9/12">
                {/* Image Preview */}
                <div className="w-full flex justify-center bg-slate-800">
                    <Image src={`data:image/jpeg;base64,${previewImage}`} alt="Preview" width={500} height={300} />
                </div>

                {/* Image List */}
                <div className="flex flex-row space-x-2">
                    {rentRealState?.images.map((image, index) => (
                        <Image
                            key={index}
                            src={`data:image/jpeg;base64,${image.image}`}
                            alt={`Thumbnail ${index}`}
                            onClick={() => handleImageClick(image.image)}
                            width={100}
                            height={100}
                        />
                    ))}
                </div>
                <div className="border-t-2 pt-3">
                    <h1 className="text-xl font-semibold">{rentRealState?.name}</h1>
                    <p className="text-base font-light">{rentRealState?.address}, {rentRealState?.ward}, {rentRealState?.district}, {rentRealState?.city}</p>
                </div>

                <div className="border-t-2 pt-3 flex flex-wrap">
                    <div className="w-full sm:w-1/2 lg:w-1/5">
                        <p className="text-gray-500">Mức giá</p>
                        <p className="font-semibold">{rentRealState?.price.toLocaleString()} {rentRealState?.priceUnit} /
                            tháng</p>
                    </div>
                    <div className="w-full sm:w-1/2 lg:w-1/5">
                        <p className="text-gray-500">Diện tích</p>
                        <p className="font-semibold">{rentRealState?.area} m2</p>
                    </div>
                    <div className="w-full sm:w-1/2 lg:w-1/5">
                        <p className="text-gray-500">Loại hình</p>
                        <p className="font-semibold">{rentRealState?.typeRealState}</p>
                    </div>
                    <div className="w-full sm:w-1/2 lg:w-1/5">
                        <p className="text-gray-500">Phòng Ngủ</p>
                        <p className="font-semibold">{rentRealState?.totalBedRoom} PN</p>
                    </div>
                    <div className="w-full sm:w-1/2 lg:w-1/5">
                        <p className="text-gray-500">Phòng tắm</p>
                        <p className="font-semibold">{rentRealState?.totalBathRoom} PT</p>
                    </div>
                </div>

                <div className="border-t-2 pt-3">
                    <p className="text-xl font-semibold">Thông tin mô tả</p>
                    <p className="font-normal">{rentRealState?.description}</p>
                </div>

                <div className="border-t-2 pt-3 w-full flex flex-wrap space-y-3">
                    <p className="text-xl font-semibold w-full">Đặc điểm bất động sản</p>
                    <div className="w-1/2 flex flex-row justify-between pr-3">
                        <p className="font-semibold">Diện tích</p>
                        <p>{rentRealState?.area} m2</p>
                    </div>
                    <div className="w-1/2 flex flex-row justify-between pr-3">
                        <p className="font-semibold">Số tầng</p>
                        <p>{rentRealState?.totalFloor}</p>
                    </div>
                    <div className="w-1/2 flex flex-row justify-between pr-3">
                        <p className="font-semibold">Số toilet</p>
                        <p>{rentRealState?.totalBathRoom}</p>
                    </div>
                    <div className="w-1/2 flex flex-row justify-between pr-3">
                        <p className="font-semibold">Nội thất</p>
                        <p>{rentRealState?.furniture}</p>
                    </div>
                    <div className="w-1/2 flex flex-row justify-between pr-3">
                        <p className="font-semibold">Mức giá</p>
                        <p>{rentRealState?.price.toLocaleString()} {rentRealState?.priceUnit}/tháng</p>
                    </div>
                    <div className="w-1/2 flex flex-row justify-between pr-3">
                        <p className="font-semibold">Số phòng ngủ</p>
                        <p>{rentRealState?.totalBedRoom}</p>
                    </div>
                </div>

                <div className="border-t-2 pt-3 w-full">
                    <div>
                        <p className="text-xl font-semibold w-full">Comments</p>
                        <CommentPost PostId={params.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}