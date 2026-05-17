import useAxios from "../hooks/useAxios";
import type { Accommodation, AccommodationDetails, CreateAccommodationDto, EditAccommodationDto } from "../types/accommodation";

const accommodationApi = {
    findAll: async () => {
        return await useAxios.get<Accommodation[]>('/accommodations');
    },
    findById: async (id: string) => {
        return await useAxios.get<AccommodationDetails>(`/accommodations/${id}`);
    },
    create: async (data: CreateAccommodationDto) => {
        return await useAxios.post<CreateAccommodationDto>('/accommodations/add', data);
    },
    edit: async (id: string, data: EditAccommodationDto) => {
        return await useAxios.put<EditAccommodationDto>(`/accommodations/edit/${id}`, data);
    },
    delete: async (id: string) => {
        return await useAxios.delete(`/accommodations/delete/${id}`);
    }
}

export default accommodationApi;