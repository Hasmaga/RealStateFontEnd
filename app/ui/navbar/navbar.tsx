'use client';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Logo from '@/public/LOGO.svg'
import Link from 'next/link'

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };
  return (
    <nav className="flex items-center justify-center sm:justify-between h-16 shadow-lg border-2 border-black rounded-full mt-10 sm:ml-20 sm:mr-20 ml-10 mr-10 mb-5 sm:p-5 p-1.5">
      <div className='h-14 w-14 flex items-center'>
        <Link href="/">
          <Image src={Logo} alt="logo" width={60} height={75} />
        </Link>
      </div>
      <div className="flex flex-row sm:space-x-10">
        <Link href="/mua-nha-dat" className="p-1 font-medium text-xs text-center">MUA NHÀ</Link>
        <Link href="/thue-nha-dat" className="p-1 font-medium text-xs text-center">THUÊ NHÀ</Link>
        <Link href="/goi-dich-vu" className="p-1 font-medium text-xs text-center">DỊCH VỤ</Link>
      </div>
      <div className='flex flex-row space-x-5 items-center'>
        <Link href={token ? "/seller/dang-tin" : "/login"} className="p-1 rounded-md text-center text-sm">Đăng tin</Link>
        {token ? (
          <button onClick={handleLogout} className="bg-black text-white rounded-full m-1.5 text-center p-2 text-sm">Đăng xuất</button>
        ) : (
          <Link href="/login" className="bg-black text-white rounded-full m-1.5 p-2 text-center text-sm">Đăng nhập</Link>
        )}
      </div>
    </nav>
  )
}