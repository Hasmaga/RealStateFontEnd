'use client';
import axios from 'axios';
import { useEffect, useState } from "react";
import NumberInput from "./NumberInput/NumberInput";
import CitySelect from "./Select/CitySelect";
import DistrictSelect from "./Select/DistrictSelect";
import WardSelect from "./Select/WardSelect";
import PriceUnitSelect from "./Select/PriceUnitSelect";
import SelectPlan from "./Plan/SelectPlan";
import SelectPlanDay from "./Plan/SelectPlanDay";
import TypeRealEstateSelect from "./Select/TypeRealEstateSelect";
import FurnitureSelect from "./Select/FurnitureSelect";
import { Plan, PlanDay, SubmitPost, User } from '@/app/lib/InterfacerLib';

export default function UploadPost() {
    const [token, setToken] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [typeRealState, setTypeRealState] = useState('sell') // ['sell', 'rent']
    const [city, setCity] = useState(0)
    const [district, setDistrict] = useState(0)
    const [ward, setWard] = useState(0)
    const [street, setStreet] = useState('')
    const [address, setAddress] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [area, setArea] = useState('')
    const [price, setPrice] = useState('')
    const [priceUnit, setPriceUnit] = useState('')
    const [selectedFurniture, setSelectedFurniture] = useState('');
    const [bedroomCount, setBedroomCount] = useState(0);
    const [bathroom, setBathroom] = useState(0)
    const [floor, setFloor] = useState(0)
    const [contactName, setContactName] = useState('')
    const [contactPhone, setContactPhone] = useState('')
    const [contactEmail, setContactEmail] = useState('')
    const [images, setImages] = useState<string[]>([]);
    const [plan, setPlan] = useState<Plan>();
    const [planDay, setPlanDay] = useState<PlanDay>();
    const [datePost, setDatePost] = useState('');
    const [timePost, setTimePost] = useState('');
    const [postId, setPostId] = useState('');
    const [user, setUser] = useState<User | null>(null);

    const handleNext = () => {
        setPage(page + 1);
    }

    const handleBack = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            Promise.all(files.map(file => {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            })).then(images => setImages(images), error => console.error(error));
        }
    }

    useEffect(() => {
        fetchUser(); // Fetch user information
        if (!localStorage.getItem('token')) {
            window.location.href = '/login';
        }
        setToken(localStorage.getItem('token'));
    }, []);

    async function onSubmitInformation(): Promise<string | null> {        
        const formattedPostTime = `${timePost}:00.0000000`
        const submitPost: SubmitPost = {
            typeId: typeRealState,
            city: city.toString(),
            district: district.toString(),
            ward: ward.toString(),
            street: street,
            address: address,
            title: title,
            description: description,
            area: parseInt(area),
            price: parseInt(price),
            priceUnitId: priceUnit,
            furnitureId: selectedFurniture,
            bedRoom: bedroomCount,
            bathRoom: bathroom,
            floor: floor,
            contactName: contactName,
            contactPhone: contactPhone,
            contactEmail: contactEmail,
            planId: plan?.planId ?? '',
            planDayId: planDay?.planDayId ?? '',
            postDate: datePost,
            postTime: formattedPostTime,
        };
        try {
            const response = await axios.post('https://localhost:7149/PostRealEstateApi/CreatePost', submitPost, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            setPostId(response.data);
            return response.data;

        } catch (error) {
            console.error("Failed to submit post:", error);
            return null;
        }
    }

    async function onSubmitImage(postId: string) {
        // Check wallet balance of user is enough to pay for the post
        if (user?.balance === undefined) {
            return;
        }
        if (planDay?.priceDiscount === undefined) {
            return;
        }
        if (Number(user.balance) < planDay.priceDiscount) {
            alert('Số dư trong ví không đủ để đăng tin');
            return;
        }
        const myHeaders = {
            'Authorization': `Bearer ${token}`
        };
        const data = new FormData();
        images.forEach((image, index) => {
            let binary = atob(image.split(',')[1]);
            let array = [];
            for (let i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            let blob = new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
            data.append('Data', blob, `image${index}.jpg`);
        });
        axios.post(`https://localhost:7149/ImageRealEstateApi/UploadImageRealEstate/${postId}`, data, {
            headers: {
                ...myHeaders,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmitInformation().then(postId => {
            if (postId) {
                onSubmitImage(postId);
            }
        });
    }

    async function fetchUser() {
        const response = await fetch('https://localhost:7149/UserAPI/GetUser', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setUser(data);
    }

    return (
        <div className="p-10 shadow-md rounded-lg bg-white" style={{ minWidth: '550px' }}>
            <form onSubmit={handleSubmit}>
                {page === 1 && (
                    <div>
                        <div>
                            <strong className="text-xl text-green-500">Thông tin cơ bản</strong>
                        </div>
                        <TypeRealEstateSelect onSelect={setTypeRealState} />
                        <div className="flex flex-row w-full space-x-2 pt-5">
                            <div className="w-1/2">
                                <strong className="text-sm">Tỉnh, thành phố</strong>
                                <CitySelect
                                    instanceId="city-select"
                                    onChange={setCity}
                                    className="mt-2"
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
                                />
                            </div>
                            <div className="w-1/2">
                                <strong className="text-sm">Đường</strong>
                                <input type="text" placeholder="Đường" className="border-2 rounded-md mt-2 p-1.5 w-full" onChange={(e) => setStreet(e.target.value)} disabled={!ward} />
                            </div>
                        </div>
                        <div className="w-full pt-2">
                            <strong className="text-sm">Địa chỉ hiện trên tin đăng</strong>
                            <input type="text" placeholder="Bạn có thể bổ sung hẻm, ngách, ngõ, ..." className="border-2 rounded-md mt-2 p-2 w-full text-sm" onChange={(e) => setAddress(e.target.value)} />
                        </div>

                        <div className="border-t-2 w-full pt-9 mt-9 space-y-2">
                            <strong className="text-xl text-green-500">Thông tin bài viết</strong>
                            <div>
                                <p>Tiêu đề</p>
                                <textarea onChange={(e) => setTitle(e.target.value)} placeholder="Tiêu đề" className="border-2 h-20 w-full rounded-md mt-2 p-1.5" maxLength={99} />
                            </div>
                            <div>
                                <p>Mô tả</p>
                                <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Mô tả" className="border-2 h-40 w-full rounded-md mt-2 p-1.5" maxLength={3000} />
                            </div>
                        </div>
                        <div className="border-t-2 w-full pt-9 mt-9 space-y-2">
                            <strong className="text-xl text-green-500">Thông tin bất động sản</strong>
                            <div className="w-full">
                                <p>Diện tích</p>
                                <div className="relative">
                                    <input type="text" onChange={(e) => setArea(e.target.value)} placeholder="Diện tích" className="border-2 rounded-md mt-2 p-1.5 w-full" />
                                    <span className="absolute right-2 top-6 transform -translate-y-1/2 p-1.5">m<sup>2</sup></span>
                                </div>
                            </div>
                            <div className="flex flex-row w-full space-x-5">
                                <div className="w-2/3">
                                    <p>Mức giá</p>
                                    <input type="text" onChange={(e) => setPrice(e.target.value)} placeholder="Giá" className="border-2 rounded-md p-1.5 mt-2 w-full" />
                                </div>
                                <div className="w-1/3">
                                    <p>Đơn vị</p>
                                    <PriceUnitSelect
                                        instanceId="price-unit-select"
                                        onChange={setPriceUnit}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>Nội thất</p>
                                </div>
                                <FurnitureSelect onSelect={setSelectedFurniture} />
                                <div className="flex flex-row justify-between mt-2">
                                    <p className="p-1">Số phòng ngủ</p>
                                    <NumberInput value={bedroomCount} onChange={setBedroomCount} />
                                </div>
                                <div className="flex flex-row justify-between mt-2">
                                    <p className="p-1">Số phòng tắm</p>
                                    <NumberInput value={bathroom} onChange={setBathroom} />
                                </div>
                                <div className="flex flex-row justify-between mt-2">
                                    <p className="p-1">Số tầng</p>
                                    <NumberInput value={floor} onChange={setFloor} />
                                </div>
                            </div>
                        </div>
                        <div className="border-t-2 w-full pt-5 mt-5 space-y-2">
                            <strong className="text-xl text-green-500">Hình ảnh</strong>
                            <div className="flex flex-row w-full space-x-5">
                                <div className="w-full">
                                    <p>Hình ảnh</p>
                                    <input type="file" className="border-2 rounded-md mt-2 p-2 w-full mb-2" multiple onChange={handleImageChange} />
                                    <div className="flex flex-row w-full border-2 min-h-40 flex-wrap rounded-md">
                                        {images.map((image, index) => (
                                            <img key={index} src={image} alt="" className="p-2 w-40 h-40" />
                                        ))}
                                    </div>
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
                                    <input type="text" className="border-2 rounded-md mt-2 p-2 w-full" placeholder="Tên liên hệ" onChange={(e) => setContactName(e.target.value)} />
                                </div>
                                <div className="w-1/2">
                                    <p>Số điện thoại</p>
                                    <input type="text" className="border-2 rounded-md mt-2 p-2 w-full" placeholder="Số điện thoại" onChange={(e) => setContactPhone(e.target.value)} />
                                </div>
                            </div>
                            <div className="w-full">
                                <p>Email</p>
                                <input type="text" className="border-2 rounded-md mt-2 p-2 w-full" placeholder="Email" onChange={(e) => setContactEmail(e.target.value)} />
                            </div>
                        </div>
                    </div>
                )}
                {page === 2 && (
                    <div>
                        <div>
                            <strong className="text-xl text-green-500">Cấu hình tin đăng</strong>
                        </div>
                        <div className="pt-5">
                            <strong>Chọn loại tin đăng</strong>
                            <SelectPlan onSelect={setPlan} />
                        </div>
                        <div className="pt-5">
                            <strong className="pt-2">Chọn thời gian đăng</strong>
                            <p className="pt-2">Số ngày đăng</p>
                            <SelectPlanDay onSelect={setPlanDay} plan={plan} />
                        </div>
                        <div className="flex flex-row space-x-5 w-full pt-2">
                            <div className="w-1/2">
                                <p>Ngày bắt đầu</p>
                                <input type="date" className="border-2 rounded-md mt-2 p-1.5 w-full" onChange={(e) => setDatePost(e.target.value)} />
                            </div>
                            <div className="w-1/2">
                                <p>Hẹn giờ đăng tin</p>
                                <input type="time" className="border-2 rounded-md mt-2 p-1.5 w-full" onChange={(e) => setTimePost(e.target.value)} />
                            </div>
                        </div>
                        <div className="w-full border-t-2 mt-5 pt-5">
                            <p className="text-xl font-bold text-green-500">Thanh toán</p>
                            <div className="flex flex-row justify-between pt-5">
                                <p>Loại tin</p>
                                <p>{plan?.planName}</p>
                            </div>
                            <div className="flex flex-row justify-between pt-2">
                                <p>Thời gian đăng</p>
                                <p>{planDay?.day}</p>
                            </div>
                            <div className="flex flex-row justify-between pt-2">
                                <p>Tổng tiền</p>
                                <p>{planDay?.priceDiscount}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className={`flex pt-9 ${page === 1 ? 'justify-end' : 'justify-between'}`}>
                    {page !== 1 && <button onClick={handleBack} className=" p-2 shadow-lg rounded-lg bg-gray-500 text-white">Trở về trước</button>}
                    {page !== 2 && <button onClick={handleNext} disabled={page === 2} className="p-2 shadow-lg rounded-lg bg-red-500 text-white">Tiếp tục</button>}
                    {page === 2 && <button className="p-2 shadow-lg rounded-lg bg-red-500 text-white">Đăng tin</button>}
                </div>
            </form>
        </div>
    )
}