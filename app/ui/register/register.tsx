'use client';
import Link from "next/link";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import _ from 'lodash';
import Image from 'next/image';
import Logo from '@/public/LOGO.svg';
import { URL } from "@/app/lib/Url";
import axios from "axios";

export default function Register() {

    const schema = z.object({
        firstName: z.string().nonempty('Please enter your first name'),
        lastName: z.string().nonempty('Please enter your last name'),
        email: z.string().email('You must enter a valid email').nonempty('You must enter an email'),
        password: z
            .string()
            .min(8, 'Password is too short - must be at least 4 chars.')
            .nonempty('Please enter your password.'),
        passwordConfirm: z.string().nonempty('Password confirmation is required'),
        phoneNumber: z.string().nullable(),
    }).refine((data) => data.password === data.passwordConfirm, {
        message: 'Passwords must match',
        path: ['passwordConfirm']
    }).refine((data) => data.phoneNumber === null || data.phoneNumber.length === 10, {
        message: 'Phone number must have 10 digits',
        path: ['phoneNumber']
    });

    type FormType = {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        passwordConfirm: string;
        phoneNumber?: string;
    };

    const defaultValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        phoneNumber: ''
    };

    const { control, formState, handleSubmit, setValue, setError } = useForm<FormType>({
        mode: 'onChange',
        defaultValues,
        resolver: zodResolver(schema)
    });

    const { isValid, dirtyFields, errors } = formState;

    async function Register(formData: FormType) {
        console.log('Register function called with formData:', formData);
        const data = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber
        };

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://${URL}/accountapi/createaccount`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            const response = await axios.request(config);
            if (response.status === 200) {
                alert('Account created successfully');
                window.location.href = '/login';
            } else {
                setError("email", {
                    type: "server",
                    message: "Server Error. Please try again."
                });
                alert('Account creation failed');
            }
        } catch (error) {
            setError("email", {
                type: "server",
                message: "Server Error. Please try again."
            });
            alert('Account creation failed');
        }
    }

    const onSubmit = async (formData: FormType) => {
        console.log('onSubmit function called with formData:', formData);
        await Register(formData);
    };

    return (
        <div className="flex w-full h-screen flex-row">
            <div className="flex flex-col flex-1 p-10 pt-2">
                <Link href="/" className="flex flex-wrap">
                    <Image src={Logo} alt="Rent House" height={100} />
                </Link>
                <p className="font-bold text-3xl">Đăng ký</p>
                <div className="flex flex-row space-x-3">
                    <p className="text-gray-500">Đã có tài khoảng?</p>
                    <Link href="/login" className="underline text-sky-500">Đăng nhập tại đây</Link>
                </div>

                <div className="w-full">
                    <form
                        name="loginForm"
                        noValidate
                        className="mt-1 flex w-full flex-col justify-center space-y-1"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className=""
                                    label="First Name"
                                    autoFocus
                                    error={!!errors.firstName}
                                    helperText={errors?.firstName?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mb-4"
                                    label="Last Name"
                                    autoFocus
                                    error={!!errors.lastName}
                                    helperText={errors?.lastName?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            )}
                        />


                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mb-8"
                                    label="Email"
                                    autoFocus
                                    type="email"
                                    error={!!errors.email}
                                    helperText={errors?.email?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mb-8"
                                    label="Phone Number"
                                    type="text"
                                    error={!!errors.phoneNumber}
                                    helperText={errors?.phoneNumber?.message}
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mb-8"
                                    label="Password"
                                    type="password"
                                    error={!!errors.password}
                                    helperText={errors?.password?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="passwordConfirm"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mb-8"
                                    label="Confirm Password"
                                    type="password"
                                    error={!!errors.passwordConfirm}
                                    helperText={errors?.passwordConfirm?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            )}
                        />

                        <Button
                            variant="contained"
                            color="secondary"
                            className=" mt-16 w-full"
                            aria-label="Sign Up"
                            disabled={_.isEmpty(dirtyFields) || !isValid}
                            type="submit"
                            size="large"
                        >
                            Sign up
                        </Button>
                    </form>
                </div>
            </div>
            <div className="flex-col flex-1 p-10 bg-[#59B4C3] hidden sm:block">
                <p className="font-bold text-3xl text-white">Welcome to the<br />FUSE React!</p>
                <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, felis sed ullamcorper.</p>
            </div>
        </div>
    )
}