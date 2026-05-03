import { Category } from "./enums/category"
import { Condition } from "./enums/condition"

export interface Accommodation {
    id: number,
    name: string,
    condition: Condition,
    numRooms: number,
    rented: boolean
}

export interface AccommodationDetails {
    id: number,
    name: string,
    category: Category
    host_id: number,
    condition: Condition,
    numRooms: number,
    rented: boolean
}