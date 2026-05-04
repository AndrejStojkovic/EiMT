import { Category } from './enums/category';
import { Condition } from './enums/condition';
import { EventType } from './enums/eventType';

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

export interface AccommodationEvent {
    id: number,
    name: string,
    type: EventType,
    createdAt: Date
}

export type AccommodationEventDto = {
    accommodationId: number;
    accommodationName: string;
    eventType: string;
    createdAt: string;
};