import Image from 'next/image'
import BannerImage from '@/public/banner.jpg'

export default function Banner() {
    return (
        <div className="h-full w-full flex flex-col sm:flex-row sm:pl-20 sm:pr-20 pl-10 pr-10 md:space-x-10">
            {/* Left side */}
            <div className='flex-1 flex flex-col space-y-5'>
                <div className='bg-black rounded-3xl flex items-center justify-center'>
                    <div className='text-white font-semibold p-7 text-5xl'>
                        <div className='flex flex-row items-center'>TÌM KIẾM
                            <svg className='h-6 w-auto text-white ml-3' fill="none" stroke="currentColor" viewBox="0 0 150 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M90 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </div>
                        <div>NGÔI NHÀ MÀ BẠN YÊU THÍCH</div>
                    </div>
                </div>
                <div className='border-2 border-black rounded-3xl p-5 space-y-3'>
                    <p className='text-xl font-bold'>
                        RENT HOUSE
                    </p>
                    <p className='text-sm'>
                        Nền tảng trực tuyến hàng đầu cho nhu cầu tìm kiếm nhà ở, cung cấp đa dạng lựa chọn nhà cho thuê và mua bán phù hợp với mọi nhu cầu và ngân sách.
                    </p>
                </div>
            </div>
            {/* Right side */}
            <div className='flex-1'>
                <Image src={BannerImage} alt="banner" className='border-2 border-black rounded-3xl h-full object-cover' />
            </div>
        </div>
    )
}