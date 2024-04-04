export interface Plan {
    planId: string;
    planName: string;
    price: number;
}

export interface PlanDay {
    planDayId: string
    day: number
    priceNonDiscount: number
    priceDiscount: number
}

export interface SubmitPost {
    typeId: string,
    city: string,
    district: string,
    ward: string,
    street: string,
    address: string,
    title: string,
    description: string,
    area: number,
    price: number,
    priceUnitId: string,
    furnitureId: string,
    bedRoom: number,
    bathRoom: number,
    floor: number,
    contactName: string,
    contactPhone: string,
    contactEmail: string,
    planId: string,
    planDayId: string,
    postDate: string,
    postTime: string,
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    wallet: string;
}

export interface UpdateProfile {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export interface PaymentResponse {
    return_code: number;
    return_message: string;
    sub_return_code: number;
    sub_return_message: string;
    zp_trans_token: string;
    order_url: string;
    order_token: string;
    qr_code: string;
}

export interface ChangePassword {
    oldPassword: string;
    newPassword: string;    
}

export interface RentHouse {
    id: number;
    title: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    street: string;
    price: string;
    priceUnit: string;
    furniture: string;    
    totalBathRoom: number;
    totalBedRoom: number;
    totalFloor: number;
    area: string;
    imageCover: string;
}