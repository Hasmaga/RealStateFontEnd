import Image from 'next/image'
import BannerImage from '@/public/banner.jpg'
import Link from 'next/link'

export default function Banner() {
    
    return (
        <div className="relative h-full w-full">
            <Image src={BannerImage} alt="banner" className='w-full h-full object-cover'/>
            <div className="absolute top-1/4 w-full flex flex-col pl-12">
                <h1 className="text-7xl font-bold text-green-400 pb-5">Tìm Kiếm Ngôi Nhà</h1>       
                <h1 className="text-7xl font-bold text-green-400 pb-5">Mà Bạn Yêu Thích</h1>
                <p className="text-2xl text-green-400 pb-5 ">Phát hiện ngôi nhà mà bạn thích để sống</p>             
                <Link href="/mua-nha-dat">   
                    <button className="bg-green-400 text-white p-5 rounded-md text-2xl">Tìm Kiếm Ngay</button>
                </Link>    
            </div>
        </div>
    )
}