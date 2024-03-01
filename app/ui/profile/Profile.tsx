'use client';
import { User } from "@/app/lib/InterfacerLib";
import { Button, Input } from "@mui/material";
import { useState } from "react";



export default function Profile() {
    const [user, setUser] = useState<User | null>(null);

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (user && e.target.value !== user.lastName && e.target.value) {
            setUser({ ...user, lastName: e.target.value });
        }
    }

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (user && e.target.value !== user.firstName && e.target.value) {
            setUser({ ...user, firstName: e.target.value });
        }
    }

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (user && e.target.value !== user.phoneNumber && e.target.value) {
            setUser({ ...user, phoneNumber: e.target.value });
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }



    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4"> 
            <div className="flex flex-row justify-between">
                <p className="p-2.5">Tên</p>
                <Input type="text" placeholder={user?.firstName ?? "Nam"} className="shadow-xl border-2 p-1" onChange={handleFirstNameChange}/>
            </div>
            <div className="flex flex-row justify-between">
                <p className="p-2.5">Họ</p>
                <Input type="text" placeholder={user?.lastName ?? "Nguyễn Văn" } className="shadow-xl border-2 p-1" onChange={handleLastNameChange}/>
            </div>
            <div className="flex flex-row justify-between">
                <p className="p-2.5">Email</p>
                <p className="p-2.5">{user?.email ?? "example@localhost.com"}</p>
            </div>
            <div className="flex flex-row justify-between">
                <p className="p-2.5">Số điện thoại</p>
                <Input type="text" placeholder={user?.phoneNumber ?? "0000000000"} className="shadow-xl border-2 p-1" onChange={handlePhoneNumberChange}/>
            </div>

            <Button type="submit" className="bg-green-500 shadow-xl p-2 text-white rounded-lg">Cập nhật</Button>
        </form>
    )
}