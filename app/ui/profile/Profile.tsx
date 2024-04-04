'use client';
import { User, UpdateProfile } from "@/app/lib/InterfacerLib";
import { URL } from "@/app/lib/Url";
import { Button, Input } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [firstNameUpdate, setFirstNameUpdate] = useState<string | null>();
    const [lastNameUpdate, setLastNameUpdate] = useState<string | null>();
    const [phoneNumberUpdate, setPhoneNumberUpdate] = useState<string | null>();
    const [token, setToken] = useState<string | null>();

    async function fetchUser() {
        const myHeaders = {
            'Authorization': `Bearer ${token}`
        };
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://${URL}/accountapi/getaccount`,
            headers: {
                ...myHeaders,
                'Content-Type': 'multipart/form-data'
            }
        };

        try {
            const response = await axios.request(config);
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/login';
        }
        setToken(localStorage.getItem('token'));
        if (token) {
            fetchUser();
        }
    }, [token]);

    async function updateUser() {
        const myHeaders = {
            'Authorization': `Bearer ${token}`
        };

        let updateProfile : UpdateProfile = {
            firstName: "",
            lastName: "",
            phoneNumber: ""
        };

        if (firstNameUpdate) {
            updateProfile.firstName = firstNameUpdate;
        }
        if (lastNameUpdate) {
            updateProfile.lastName = lastNameUpdate;
        }
        if (phoneNumberUpdate) {
            updateProfile.phoneNumber = phoneNumberUpdate;
        }

        const config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `https://${URL}/accountapi/updateprofile`,
            headers: {
                ...myHeaders,
                'Content-Type': 'application/json',
            },
            data: updateProfile
        };

        try {
            const response = await axios.request(config);
            if (response.status === 200) {
                alert('Cập nhật thành công');
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateUser();
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-row justify-between">
                <p className="p-2.5">Tên</p>
                <Input type="text" placeholder={user?.firstName} className="shadow-xl border-2 p-1" onChange={(e) => setFirstNameUpdate(e.target.value)} />
            </div>
            <div className="flex flex-row justify-between">
                <p className="p-2.5">Họ</p>
                <Input type="text" placeholder={user?.lastName} className="shadow-xl border-2 p-1" onChange={(e) => setLastNameUpdate(e.target.value)} />
            </div>
            <div className="flex flex-row justify-between">
                <p className="p-2.5">Email</p>
                <p className="p-2.5">{user?.email ?? "example@localhost.com"}</p>
            </div>
            <div className="flex flex-row justify-between">
                <p className="p-2.5">Số điện thoại</p>
                <Input type="text" placeholder={user?.phoneNumber ?? "0000000000"} className="shadow-xl border-2 p-1" onChange={(e) => setPhoneNumberUpdate(e.target.value)} />
            </div>

            <Button type="submit" className="bg-green-500 shadow-xl p-2 text-white rounded-lg">Cập nhật</Button>
        </form>
    )
}