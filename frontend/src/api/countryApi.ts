import useAxios from '../hooks/useAxios';
import type { Country } from '../types/country';

const countryApi = {
    findAll: async () => {
        return await useAxios.get<Country[]>('/countries');
    },
    findById: async (id: string) => {
        return await useAxios.get<Country>(`/countries/${id}`);
    }
}

export default countryApi;