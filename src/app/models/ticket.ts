import { Timestamp } from 'firebase/firestore';

export interface Ticket {
    id?: string;
    from: string;
    to: string;
    departureTime: Timestamp;
    basePrice: number;
    discount: number;
    finalPrice: number;
}