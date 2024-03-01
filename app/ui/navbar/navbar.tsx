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
    <nav className="flex items-center w-full justify-between h-20 shadow-lg pl-20 pr-20">
      <div>
        <Link href="/">
          <Image src={Logo} alt="logo" width={80} height={75} />
        </Link>
      </div>

      <div className="flex flex-row space-x-5 pr-20">
        <Link href="/" className="p-1">Trang chủ</Link>
        <Link href="/mua-nha-dat" className="p-1">Tim mua bất động sản</Link>
        <Link href="/thue-nha-dat" className="p-1">Tìm thuê nhà</Link>        
      </div>

      <div className='flex flex-row space-x-5'>
        {token ? (
          <button onClick={handleLogout} className="p-3">Đăng xuất</button>
        ) : (
          <Link href="/login" className="p-3">Đăng nhập</Link>
        )}
        <Link href={token ? "/seller/dang-tin" : "/login"} className="border-2 border-green-400 p-3 rounded-md">Đăng tin</Link>
      </div>
    </nav>
  )
}