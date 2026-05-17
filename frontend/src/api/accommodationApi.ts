import useAxios from "../hooks/useAxios";
import { normalizeAccommodationFilter } from "../helpers/accommodationFilters";
import { Category } from "../types/enums/category";
import type {
    Accommodation,
    AccommodationDetails,
    AccommodationFilterDto,
    AccommodationPage,
    CreateAccommodationDto,
    EditAccommodationDto
} from "../types/accommodation";

type PaginatedAccommodationParams = {
    filter?: AccommodationFilterDto;
    page?: number;
    size?: number;
    sortBy?: string;
};

const toAccommodationParams = (filter?: AccommodationFilterDto) => {
    const normalizedFilter = normalizeAccommodationFilter(filter);

    if (Object.keys(normalizedFilter).length === 0) {
        return {};
    }

    return {
        category: normalizedFilter.category !== undefined ? Category[normalizedFilter.category] : undefined,
        hostId: normalizedFilter.hostId,
        hostCountryId: normalizedFilter.hostCountryId,
        numRooms: normalizedFilter.numRooms,
        available: normalizedFilter.available,
    };
};

const accommodationApi = {
    findAll: async (filter?: AccommodationFilterDto) => {
        const params = toAccommodationParams(filter);

        if (Object.keys(params).length === 0) {
            return await useAxios.get<Accommodation[]>('/accommodations');
        }

        return await useAxios.get<Accommodation[]>('/accommodations', {
            params
        });
    },
    findAllPaginated: async ({ filter, page = 0, size = 10, sortBy = 'name' }: PaginatedAccommodationParams = {}) => {
        return await useAxios.get<AccommodationPage>('/accommodations/paginated', {
            params: {
                ...toAccommodationParams(filter),
                page,
                size,
                sortBy,
            }
        });
    },
    findById: async (id: string) => {
        return await useAxios.get<AccommodationDetails>(`/accommodations/${id}`);
    },
    create: async (data: CreateAccommodationDto) => {
        return await useAxios.post<CreateAccommodationDto>('/accommodations/add', data);
    },
    edit: async (data: EditAccommodationDto) => {
        return await useAxios.put<EditAccommodationDto>(`/accommodations/edit/${data.id}`, data);
    },
    delete: async (id: string) => {
        return await useAxios.delete(`/accommodations/delete/${id}`);
    }
}

export default accommodationApi;