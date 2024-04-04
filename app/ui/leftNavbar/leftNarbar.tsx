'use client';
import { User } from "@/app/lib/InterfacerLib";
import { URL } from "@/app/lib/Url";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";



export default function LeftNavbar() {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    async function fetchUser(token: string | null) {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://${URL}/accountapi/getaccount`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            const response = await axios.request(config);
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/login';
        }
        setToken(localStorage.getItem('token'));
        if (token) {
            fetchUser(token);
        }
    }, [token]);

    const [isDropdownPostVisible, setDropdownPostVisible] = useState(false);
    const [isDropdownUserVisible, setDropdownUserVisible] = useState(false);

    const toggleDropdownPost = () => {
        setDropdownPostVisible(!isDropdownPostVisible);
    };

    const toggleDropdownUser = () => {
        setDropdownUserVisible(!isDropdownUserVisible);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="h-screen shadow-lg w-2/12 fixed left-0 top-auto overflow-auto">
            <div className="p-6">
                <nav>
                    <ul>
                        <li>
                            <div className="flexrounded flex-col space-y-5">
                                <div>
                                    <p>Hi, {user.firstName} {user.lastName}</p>
                                </div>
                                <div className="bg-gray-300 shadow-md rounded-md p-2">
                                    <p>Thông tin tài khoản</p>
                                    <div>
                                        <p className="text-sm">Email: {user.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm">Số dư: {user.wallet} vnđ</p>
                                    </div>
                                    <div>
                                        <p className="text-sm">Số điện thoại: {user.phoneNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="mb-2">
                            <button
                                onClick={toggleDropdownPost}
                                className='flex items-center hover:bg-green-300 p-2 rounded w-full'
                            >
                                <span>Quản lý tin</span>
                            </button>
                            {isDropdownPostVisible && (
                                <ul className="ml-3">
                                    <li>
                                        <div>
                                            <Link href='/seller/dang-tin' className='flex items-center hover:bg-green-300 p-2 rounded'>
                                                <span>Đăng tin</span>
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <Link href='/seller/quan-ly-tin' className='flex items-center hover:bg-green-300 p-2 rounded'>
                                                <span>Danh sách tin</span>
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            )}

                        </li>
                        <li>
                            <div>
                                <button
                                    onClick={toggleDropdownUser}
                                    className='flex items-center hover:bg-green-300 p-2 rounded w-full'
                                >
                                    <span>Quản tài khoản</span>
                                </button>
                                {
                                    isDropdownUserVisible && (
                                        <ul className="ml-3">
                                            <li>
                                                <div>
                                                    <Link href='/seller/quan-ly-tai-khoan/thong-tin-ca-nhan' className='flex items-center hover:bg-green-300 p-2 rounded'>
                                                        <span>Thông tin cá nhân</span>
                                                    </Link>
                                                </div>
                                            </li>
                                            <li>
                                                <div>
                                                    <Link href='/seller/quan-ly-tai-khoan/doi-mat-khau' className='flex items-center hover:bg-green-300 p-2 rounded'>
                                                        <span>Đổi mật khẩu</span>
                                                    </Link>
                                                </div>
                                            </li>
                                            <li>
                                                <div>
                                                    <Link href='/seller/quan-ly-tai-khoan/nap-tien' className='flex items-center hover:bg-green-300 p-2 rounded'>
                                                        <span>Nạp tiền vào tài khoản</span>
                                                    </Link>
                                                </div>
                                            </li>
                                        </ul>
                                    )
                                }
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}