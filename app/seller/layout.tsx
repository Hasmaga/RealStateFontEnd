import React from "react";
import Navbar from "../ui/navbar/navbar";
import Footer from "../ui/footer/footer";
import LeftNavbar from "../ui/leftNavbar/leftNarbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            <div className="flex flex-row">
                <div className="w-2/12">
                    <LeftNavbar />
                </div>
                <div className="bg-gray-100 w-10/12 flex items-center justify-center">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    )
}