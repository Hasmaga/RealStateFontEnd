import Footer from './ui/footer/footer'
import Banner from './ui/homescreen/banner/banner'
import BannerBody from './ui/homescreen/bannerbody/BannerBody'
import BannerWhyChoose from './ui/homescreen/bannerwhychoose/BannerWhyChoose'
import ListRentHouse from './ui/homescreen/ListRentHouse/ListRentHouse'
import ListSellHouse from './ui/homescreen/ListSellHouse/ListSellHouse'
import Navbar from './ui/navbar/navbar'

export default function Home() {
  return (
    <div>
      <Navbar />
      <div>
        <Banner />
        <hr className='border-t-2 border-black ml-20 mr-20 mt-10 mb-10' />
        <BannerWhyChoose />
        <hr className='border-t-2 border-black ml-20 mr-20 mt-10 mb-10' />
        <BannerBody />
        <hr className='border-t-2 border-black ml-20 mr-20 mt-10 mb-10' />
        <ListSellHouse />
        <hr className='border-t-2 border-black ml-20 mr-20 mt-10 mb-10' />
        <ListRentHouse />
      </div>
      <Footer />
    </div>
  )
}
