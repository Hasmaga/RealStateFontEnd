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
    balance: string;
}