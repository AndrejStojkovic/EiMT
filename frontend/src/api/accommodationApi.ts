import { useAxios, Token } from "../hooks/useAxios";
import type { Accommodation, AccommodationDetails } from "../types/accommodation";

const accommodationApi = {
    findAll: async () => {
        return await useAxios.get<Accommodation[]>('/accommodations', {
            headers: {
                'Authorization': Token
            }
        });
    },
    findById: async (id: string) => {
        return await useAxios.get<AccommodationDetails>(`/accommodations/${id}`, {
            headers: {
                'Authorization': Token
            }
        });
    }
}

export default accommodationApi;