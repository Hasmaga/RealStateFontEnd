'use client';

import { Button, TextField, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { PaymentResponse } from "@/app/lib/InterfacerLib";
import { URL } from "@/app/lib/Url";

export default function TopUp() {
    const [token, setToken] = useState<string | null>();
    const [amount, setAmount] = useState<number>();
    const [paymentResponse, setPaymentResponse] = useState<PaymentResponse>();

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('token');
        if (!tokenFromStorage) {
            window.location.href = '/login';
        }
        setToken(tokenFromStorage);
    }, []);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        TopUp();
    }

    async function TopUp() {
        const myHeaders = {
            'Authorization': `Bearer ${token}`
        };

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://${URL}/payment?amount=${amount}`,
            headers: {
                ...myHeaders
            }
        };

        try {
            const response = await axios.request(config);
            if (response.status === 200) {
                setPaymentResponse(response.data);
                // redirect to payment gateway
                window.location.href = response.data.order_url;
            }
        } catch (error) {
            alert('Nạp tiền thất bại');
        }
    }

    return (
        <Container maxWidth="sm" className="p-4 bg-white mt-5 rounded-lg shadow-xl">
            <Box display="flex" justifyContent="center">
                <Typography variant="h4" component="h1" gutterBottom>
                    Nạp tiền
                </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
                <TextField
                    type="number"
                    label="Nhập số tiền bạn muốn nạp"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                <Button variant="contained" color="primary" type="submit">
                    Nạp tiền
                </Button>
            </form>
        </Container>
    )
}