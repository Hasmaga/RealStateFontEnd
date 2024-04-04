'use client';
import { URL } from "@/app/lib/Url";
import { Button, Input, FormHelperText } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export interface ChangePassword {
    oldPassword: string;
    newPassword: string;    
}

export default function ChangePassword() {
    const [changePassword, setChangePassword] = useState<ChangePassword>({ oldPassword: '', newPassword: '' });
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState({ newPassword: '', confirmPassword: '' });

    async function ChangePasword() {      
        if (!changePassword.oldPassword || !changePassword.newPassword) {
            return;
        }  
        if (localStorage.getItem('token')) {
            const myHeaders = {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };           
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `https://${URL}accountapi/changepassword`,
                headers: {
                    ...myHeaders,
                    'Content-Type': 'application/json'
                },
                data: changePassword
            };

            try {
                const response = await axios.request(config);
                if (response.status === 200) {
                    alert('Thay đổi mật khẩu thành công');
                }
            } catch (error : any) {
                alert(error.response.data);
            }
        } else {
            window.location.href = '/login';
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let errors = { newPassword: '', confirmPassword: '' };

        if (changePassword.newPassword.length < 8) {
            errors.newPassword = 'New password must be at least 8 characters';
        }

        if (changePassword.newPassword !== confirmPassword) {
            errors.confirmPassword = 'Confirm password does not match new password';
        }

        if (errors.newPassword || errors.confirmPassword) {
            setError(errors);
            return;
        }

        ChangePasword();
    }

    const handleOldPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChangePassword({ ...changePassword, oldPassword: event.target.value });
    };

    const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setChangePassword({ ...changePassword, newPassword });
    
        if (newPassword.length < 8) {
            setError({ ...error, newPassword: 'New password must be at least 8 characters' });
        } else {
            setError({ ...error, newPassword: '' });
        }
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPassword = event.target.value;
        setConfirmPassword(confirmPassword);
    
        if (changePassword.newPassword !== confirmPassword) {
            setError({ ...error, confirmPassword: 'Confirm password does not match new password' });
        } else {
            setError({ ...error, confirmPassword: '' });
        }
    };

    return (
        <div className="flex flex-col space-y-5">
            <p className="font-semibold text-center text-xl">Thay đổi mật khẩu</p>
            <form className=" flex flex-col space-y-5" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label>Mật khẩu cũ</label>
                    <Input type="password" onChange={handleOldPasswordChange}/>
                </div>
                <div className="flex flex-col">
                    <label>Mật khẩu mới</label>
                    <Input type="password" onChange={handleNewPasswordChange}/>
                    {error.newPassword && <FormHelperText error>{error.newPassword}</FormHelperText>}
                </div>
                <div className="flex flex-col">
                    <label>Nhập lại mật khẩu mới</label>
                    <Input type="password" onChange={handleConfirmPasswordChange}/>
                    {error.confirmPassword && <FormHelperText error>{error.confirmPassword}</FormHelperText>}
                </div>
                <Button type="submit">Thay đổi mật khẩu</Button>
            </form>        
        </div>
    )
}