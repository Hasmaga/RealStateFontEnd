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
      <div className='space-y-16'>
        <Banner />
        <div>
          <ListSellHouse />
          <BannerBody />
          <ListRentHouse />
          <BannerWhyChoose />
        </div>
      </div>
      <Footer />
    </div>

  )
}
