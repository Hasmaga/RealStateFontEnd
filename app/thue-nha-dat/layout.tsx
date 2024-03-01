import Footer from "../ui/footer/footer";
import Navbar from "../ui/navbar/navbar";

export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <Navbar />      
        {children}
        <Footer />      
    </div>
  )
}