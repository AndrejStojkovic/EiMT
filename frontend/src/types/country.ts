export interface Country {
    id: number,
    name: string,
    continent: string
}

export interface CreateCountryDto {
    name: string,
    continent: string
}

export interface EditCountryDto {
    id: number,
    name: string,
    continent: string
}