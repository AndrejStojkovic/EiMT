import useAxios from '../hooks/useAxios';
import type { AccommodationEventDto } from '../types/accommodation';

const accommodationEventApi = {
    findAll: async() => {
        return await useAxios.get<AccommodationEventDto[]>('/accommodations/activity/all');
    }
}

export default accommodationEventApi;