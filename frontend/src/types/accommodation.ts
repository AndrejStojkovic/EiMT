import { Category } from './enums/category';
import { Condition } from './enums/condition';
import { EventType } from './enums/eventType';

export interface Accommodation {
    id: number;
    name: string;
    condition: Condition;
    numRooms: number;
    rented: boolean;
}

export interface CreateAccommodationDto {
    name: string;
    category: Category;
    hostId: number;
    condition: Condition;
    numRooms: number;
    rented: boolean;
}

export interface EditAccommodationDto {
    id: number;
    name: string;
    category: Category;
    hostId: number;
    condition: Condition;
    numRooms: number;
    rented: boolean;
}

export interface AccommodationDetails {
    id: number;
    name: string;
    category: Category;
    host_id: number;
    condition: Condition;
    numRooms: number;
    rented: boolean;
}

export interface AccommodationFilterDto {
    category?: Category;
    hostId?: number;
    hostCountryId?: number;
    numRooms?: number;
    available?: boolean;
}

export interface AccommodationPage {
    content: Accommodation[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}

export interface AccommodationEvent {
    id: number;
    name: string;
    type: EventType;
    createdAt: Date;
}

export type AccommodationEventDto = {
    accommodationId: number;
    accommodationName: string;
    eventType: string;
    createdAt: string;
};