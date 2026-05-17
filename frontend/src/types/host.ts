export interface Host {
    id: number,
    name: string,
    surname: string,
    country_id: number,
}

export interface CreateHostDto {
    name: string,
    surname: string,
    countryId: number
}

export interface EditHostDto {
    id: number,
    name: string,
    surname: string,
    countryId: number
}