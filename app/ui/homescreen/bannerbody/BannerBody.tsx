import Image from "next/image"
import Link from "next/link"
import findhouse from "@/public/findhouse.svg"
import renthouse from "@/public/renthouse.svg"
import sellhouse from "@/public/sellhouse.svg"

export default function BannerBody() {
    return (
        <div className="flex flex-col space-y-5 sm:pl-20 sm:pr-20 pl-10 pr-10">
            {[
                { title: 'THUÊ NHÀ', description: 'Tìm kiếm nhà cho thuê theo vị trí, giá cả, diện tích, loại hình, tiện ích, xem hình ảnh, mô tả chi tiết và bản đồ vị trí của từng căn nhà, liên hệ trực tiếp với chủ nhà để trao đổi và xem nhà, so sánh giá cả, chất lượng của các căn nhà khác nhau để đưa ra lựa chọn phù hợp.', link: '/mua-nha-dat', buttonText: 'Find Buy', image: findhouse },
                { title: 'MUA NHÀ', description: 'Tìm kiếm nhà bán theo vị trí, giá cả, diện tích, loại hình, tiện ích, xem hình ảnh, mô tả chi tiết và bản đồ vị trí của từng căn nhà, liên hệ trực tiếp với chủ nhà hoặc đại lý bất động sản để trao đổi và xem nhà, so sánh giá cả, chất lượng của các căn nhà khác nhau để đưa ra lựa chọn phù hợp, nhận tư vấn pháp lý, thủ tục mua bán nhà an toàn, minh bạch.', link: '/thue-nha-dat', buttonText: 'Find A Rental', image: renthouse },
                { title: 'ĐĂNG TIN', description: 'Đăng tin cho thuê hoặc bán nhà miễn phí, cung cấp đầy đủ thông tin, hình ảnh và mô tả chi tiết về căn nhà, quản lý tin đăng, cập nhật thông tin và giá cả, nhận thông báo khi có người quan tâm đến tin đăng.', link: '/dang-tin', buttonText: 'New Property', image: sellhouse },
            ].map((item, index) => (
                <div key={index} className="flex space-x-5">
                    <div className="flex-1 flex-row space-x-10 p-5 shadow-md rounded-md bg-white transform transition-transform duration-500 ease-in-out hover:scale-105 origin-left">
                        <div className="flex flex-col space-y-1">
                            <p className="text-2xl font-bold">{item.title}</p>
                            <p className="text-sm">{item.description}</p>
                            <Link className="w-fit p-2 rounded-md bg-green-400 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" href={item.link}>
                                {item.buttonText}
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 hidden sm:block">
                        <Image src={item.image} alt={item.title} width={100} className="mx-auto block" />
                    </div>
                </div>
            ))}
        </div>
    )
}