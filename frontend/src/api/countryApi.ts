import { useAxios, axiosHeaders } from '../hooks/useAxios';
import type { Country } from '../types/country';

const countryApi = {
    findAll: async () => {
        return await useAxios.get<Country[]>('/countries', {
            headers: axiosHeaders
        });
    },
    findById: async (id: string) => {
        return await useAxios.get<Country>(`/countries/${id}`, {
            headers: axiosHeaders
        });
    }
}

export default countryApi;