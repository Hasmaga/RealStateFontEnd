'use client';
import Link from "next/link";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import _ from 'lodash';
import Image from 'next/image';
import Logo from '@/public/LOGO.svg';
import axios from "axios";

export default function Login() {    
    const schema = z.object({
        email: z.string().email('You must enter a valid email').nonempty('You must enter an email'),
        password: z
            .string()
            .min(8, 'Password is too short - must be at least 4 chars.')
            .nonempty('Please enter your password.')
    });

    type FormType = {
        email: string;
        password: string;
        remember?: boolean;
    };

    const defaultValues = {
        email: '',
        password: '',
        remember: true
    };

    const { control, formState, handleSubmit, setValue, setError } = useForm<FormType>({
        mode: 'onChange',
        defaultValues,
        resolver: zodResolver(schema)
    });

    const { isValid, dirtyFields, errors } = formState;    

    const onSubmit = async (formData: FormType) => {
        const { email, password } = formData;
    
        const data = {
            email,
            password
        };
    
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://localhost:7149/accountapi/login',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
    
        axios.request(config)
        .then((response) => {
            if (response.data === "Server Error") {
                setError("remember", {
                    type: "server",
                    message: "Server Error. Please try again."
                });
            } else {                
                localStorage.setItem('token', response.data);   
                window.location.href = '/';         
            }
        })
    };

    return (
        <div className="flex w-full h-screen flex-row">
            <div className="flex flex-col w-1/2 p-10">
                <Link href="/" className="flex flex-wrap">
                    <Image src={Logo} alt="Rent House" height={125} />
                </Link>
                <p className="font-bold text-3xl">Sign in</p>
                <div className="flex flex-row space-x-3">
                    <p className="text-gray-500">Don't have an account?</p>
                    <Link href="/register" className="underline text-sky-500">Sign up</Link>
                </div>

                <div className="w-full">
                    <form
                        name="loginForm"
                        noValidate
                        className="mt-16 flex w-full flex-col justify-center"
                        onSubmit={handleSubmit(onSubmit)}
                    >
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

                        <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
                            <Controller
                                name="remember"
                                control={control}
                                render={({ field }) => (
                                    <FormControl>
                                        <FormControlLabel
                                            label="Remember me"
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    {...field}
                                                />
                                            }
                                        />
                                        {errors.remember && <p>{errors.remember.message}</p>}
                                    </FormControl>
                                )}
                            />                           

                            <Link
                                className="text-md font-medium"
                                href="/pages/auth/forgot-password"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            variant="contained"
                            color="secondary"
                            className=" mt-16 w-full"
                            aria-label="Sign in"
                            disabled={_.isEmpty(dirtyFields) || !isValid}
                            type="submit"
                            size="large"
                        >
                            Sign in
                        </Button>
                    </form>
                </div>
            </div>
            <div className="flex flex-col w-1/2 p-10 bg-[#59B4C3]">
                <p className="font-bold text-3xl text-white">Welcome to the<br />FUSE React!</p>
                <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, felis sed ullamcorper.</p>
            </div>
        </div>
    )
}