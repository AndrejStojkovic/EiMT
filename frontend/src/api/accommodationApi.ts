import { useAxios, axiosHeaders } from "../hooks/useAxios";
import type { Accommodation, AccommodationDetails } from "../types/accommodation";

const accommodationApi = {
    findAll: async () => {
        return await useAxios.get<Accommodation[]>('/accommodations', {
            headers: axiosHeaders
        });
    },
    findById: async (id: string) => {
        return await useAxios.get<AccommodationDetails>(`/accommodations/${id}`, {
            headers: axiosHeaders
        });
    }
}

export default accommodationApi;