import { Time } from "@angular/common";
import { Timestamp } from "firebase/firestore";

export interface Train {
    id?: string; 
    departure: string;
    arrival: string;
    time: Date; 
    price: number;
}
