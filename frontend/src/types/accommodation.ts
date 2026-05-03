import { Category } from "./enums/category"
import { Condition } from "./enums/condition"
import type { Host } from "./host"

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
    host: Host,
    condition: Condition,
    numRooms: number,
    rented: boolean
}