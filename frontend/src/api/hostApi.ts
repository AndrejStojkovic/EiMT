import useAxios from '../hooks/useAxios';
import type { CreateHostDto, EditHostDto, Host } from '../types/host';

const hostApi = {
    findAll: async () => {
        return await useAxios.get<Host[]>('/hosts');
    },
    findById: async (id: string) => {
        return await useAxios.get<Host>(`/hosts/${id}`);
    },
    create: async (data: CreateHostDto) => {
        return await useAxios.post<CreateHostDto>('/hosts/add', data);
    },
    edit: async (data: EditHostDto) => {
        return await useAxios.put<EditHostDto>(`/hosts/edit/${data.id}`, data);
    },
    delete: async (id: string) => {
        return await useAxios.delete(`/hosts/delete/${id}`);
    }
}

export default hostApi;