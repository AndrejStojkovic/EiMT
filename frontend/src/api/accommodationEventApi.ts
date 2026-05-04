import { useAxios, axiosHeaders } from '../hooks/useAxios';
import type { AccommodationEventDto } from '../types/accommodation';

const accommodationEventApi = {
    findAll: async() => {
        return await useAxios.get<AccommodationEventDto[]>('/accommodations/activity/all', {
            headers: axiosHeaders
        });
    }
}

export default accommodationEventApi;