'use client';
import NumberInput from "@/app/ui/uploadpost/NumberInput/NumberInput";
import CitySelect from "@/app/ui/uploadpost/Select/CitySelect";
import DistrictSelect from "@/app/ui/uploadpost/Select/DistrictSelect";
import FurnitureSelect from "@/app/ui/uploadpost/Select/FurnitureSelect";
import PriceUnitSelect from "@/app/ui/uploadpost/Select/PriceUnitSelect";
import TypeRealEstateSelect from "@/app/ui/uploadpost/Select/TypeRealEstateSelect";
import WardSelect from "@/app/ui/uploadpost/Select/WardSelect";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "@/app/lib/Url";

interface post {
    name: string;
    typeRealEstate: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    street: string;
    status: string;
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
    plan: string;
    planDay: number;
    postDate: string;
    postTime: string;
    totalPrice: number;
}
export default function Page({ params }: {
    params: {
        id: string
    } 
}) {
    const [post, setPost] = useState<post | null>(null);    
    const [typeRealEstate, setTypeRealEstate] = useState<string | null>(null);
    const [city, setCity] = useState(0);
    const [district, setDistrict] = useState(0);
    const [ward, setWard] = useState(0);
    const [street, setStreet] = useState('')
    const [address, setAddress] = useState('')
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [area, setArea] = useState<Number>(0);
    const [price, setPrice] = useState(0);
    const [priceUnit, setPriceUnit] = useState('');
    const [furniture, setFurniture] = useState('');
    const [bedRoom, setBedRoom] = useState(0);
    const [bathRoom, setBathRoom] = useState(0);
    const [floor, setFloor] = useState(0);
    const [contectName, setContectName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [phone, setPhone] = useState('');

    async function fetchPost() {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://${URL}/PostRealEstateApi/GetCustomerPostRealEstateById/${params.id}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };

        try {
            const response = await axios.request(config);
            setPost(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {      
        fetchPost();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data = {
            typeRealEstate: typeRealEstate,
            city: city,
            district: district,
            ward: ward,
            street: street,
            address: address,
            title: title,
            description: description,
            area: area,
            price: price,
            priceUnit: priceUnit,
            furniture: furniture,
            bedRoom: bedRoom,
            bathRoom: bathRoom,
            floor: floor,
            contactName: contectName,
            contactEmail: contactEmail,
            phone: phone
        }
        console.log(data);
        try {
            const response = await fetch(`https://${URL}/PostRealEstateApi/UpdatePostRealEstate`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert('Cập nhật thành công');
        } catch (error) {
            console.error("Failed to fetch rent real states:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-3/4 mt-10 mb-10 bg-white p-10 shadow-xl rounded-lg">
            <div>
                <h1 className="text-3xl font-bold">Chỉnh sửa bài đăng</h1>
            </div>
            <div>
                <label htmlFor="typeRealEstate">Loại bất động sản</label>
                <TypeRealEstateSelect onSelect={setTypeRealEstate} />
                <div>
                    <div className="flex flex-row w-full space-x-2 pt-5">
                        <div className="w-1/2">
                            <strong className="text-sm">Tỉnh, thành phố</strong>
                            <CitySelect
                                instanceId="city-select"
                                onChange={setCity}
                                className="mt-2"
                                placeholder={post?.city}                            
                            />
                        </div>
                        <div className="w-1/2">
                            <strong className="text-sm">Quận huyện</strong>
                            <DistrictSelect
                                instanceId="district-select"
                                onChange={setDistrict}
                                className="mt-2"
                                cityId={city}
                                isDisabled={!city}
                                placeholder={post?.district}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row w-full space-x-2 pt-2">
                        <div className="w-1/2">
                            <strong className="text-sm">Phường, xã</strong>
                            <WardSelect
                                instanceId="ward-select"
                                onChange={setWard}
                                className="mt-2"
                                districtId={district}
                                isDisabled={!district}
                                placeholder={post?.ward}
                            />
                        </div>
                        <div className="w-1/2">
                            <strong className="text-sm">Đường</strong>
                            <input type="text" placeholder={post?.street} className="border-2 rounded-md mt-2 p-1.5 w-full" onChange={(e) => setStreet(e.target.value)} disabled={!ward} />
                        </div>
                    </div>
                    <div className="w-full pt-2">
                        <strong className="text-sm">Địa chỉ hiện trên tin đăng</strong>
                        <input type="text" placeholder={post?.address} className="border-2 rounded-md mt-2 p-2 w-full text-sm" onChange={(e) => setAddress(e.target.value)} />
                    </div>
                </div>
                <div className="border-t-2 w-full pt-9 mt-9 space-y-2">
                    <strong className="text-xl text-green-500">Thông tin bài viết</strong>
                    <div>
                        <p>Tiêu đề</p>
                        <textarea onChange={(e) => setTitle(e.target.value)} placeholder={post?.name} className="border-2 h-20 w-full rounded-md mt-2 p-1.5" maxLength={99}/>
                    </div>

                    <div>
                        <p>Mô tả</p>
                        <textarea onChange={(e) => setDescription(e.target.value)} placeholder={post?.description} className="border-2 h-40 w-full rounded-md mt-2 p-1.5" maxLength={3000} />
                    </div>
                </div>

                <div className="border-t-2 w-full pt-9 mt-9 space-y-2">
                    <strong className="text-xl text-green-500">Thông tin bất động sản</strong>
                    <div className="w-full">
                        <p>Diện tích</p>
                        <div className="relative">
                            <input type="number" onChange={(e) => setArea(Number(e.target.value))} placeholder={String(post?.area)} className="border-2 rounded-md mt-2 p-1.5 w-full" />
                            <span className="absolute right-2 top-6 transform -translate-y-1/2 p-1.5">m<sup>2</sup></span>
                        </div>
                    </div>

                    <div className="flex flex-row w-full space-x-5">
                        <div className="w-2/3">
                            <p>Mức giá</p>
                            <input type="text" onChange={(e) => setPrice(Number(e.target.value))} placeholder={String(post?.price)} className="border-2 rounded-md p-1.5 mt-2 w-full" />
                        </div>
                        <div className="w-1/3">
                            <p>Đơn vị</p>
                            <PriceUnitSelect
                                instanceId="price-unit-select"
                                onChange={setPriceUnit}
                                className="mt-2"
                                placeholder={post?.priceUnit}
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            <p>Nội thất</p>
                        </div>

                        <FurnitureSelect onSelect={setFurniture} />

                        <div className="flex flex-row justify-between mt-2">
                            <p className="p-1">Số phòng ngủ</p>
                            <NumberInput value={bedRoom} onChange={setBedRoom} placeholder = {post?.totalBedRoom} />
                        </div>

                        <div className="flex flex-row justify-between mt-2">
                            <p className="p-1">Số phòng tắm</p>
                            <NumberInput value={bathRoom} onChange={setBathRoom} placeholder = {post?.totalBedRoom}/>
                        </div>

                        <div className="flex flex-row justify-between mt-2">
                            <p className="p-1">Số tầng</p>
                            <NumberInput value={floor} onChange={setFloor} placeholder = {post?.totalFloor}/>
                        </div>
                    </div>
                </div>

                <div className="border-t-2 w-full pt-5 mt-5 space-y-2">
                    <div>
                        <strong className="text-xl text-green-500">Thông tin liên hệ</strong>
                    </div>
                    <div className="flex flex-row w-full space-x-5">
                        <div className="w-1/2">
                            <p>Tên liên hệ</p>
                            <input type="text" className="border-2 rounded-md mt-2 p-2 w-full" placeholder={post?.contactName} onChange={(e) => setContectName(e.target.value)} />
                        </div>
                        <div className="w-1/2">
                            <p>Số điện thoại</p>
                            <input type="text" className="border-2 rounded-md mt-2 p-2 w-full" placeholder={post?.phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>
                    <div className="w-full">
                        <p>Email</p>
                        <input type="text" className="border-2 rounded-md mt-2 p-2 w-full" placeholder={post?.contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                    </div>
                </div>

                <div className="border-t-2 w-full pt-5 mt-5 space-y-2">
                    <p className="text-xl font-bold text-green-500">Gói đang sử dụng</p>
                    <div className="flex flex-row justify-between">
                        <p>Loại gói</p>
                        <p>{post?.plan} </p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Số ngày đăng</p>
                        {post?.planDay}
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Ngày đăng tin</p>
                        {post?.postDate}
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Thời gian đăng tin</p>
                        {post?.postTime}
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Tổng tiền</p>
                        {post?.totalPrice}
                    </div>
                </div>

                <div>
                    <button type="submit" className="bg-green-500 text-white p-2 mt-5 rounded-md">Cập nhật</button>
                </div>
            </div>
        </form>
    );
}