import type { Country } from "./country";

export interface Host {
    id: number,
    name: string,
    surname: string,
    country: Country
}