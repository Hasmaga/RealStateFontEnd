import Profile from "@/app/ui/profile/Profile";

export default function Page(){
    return (
        <div className="bg-white pt-5 pl-10 pr-10 flex flex-col space-y-5 pb-10 mb-5 mt-5 rounded-xl shadow-xl">
            <p className="text-center text-xl font-semibold">Thông tin cá nhân</p>
            <div>
                <Profile />
            </div>
        </div>
    )
}