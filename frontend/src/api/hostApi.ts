import { useAxios, axiosHeaders } from '../hooks/useAxios';
import type { Host } from '../types/host';

const hostApi = {
    findAll: async () => {
        return await useAxios.get<Host[]>('/hosts', {
            headers: axiosHeaders
        });
    },
    findById: async (id: string) => {
        return await useAxios.get<Host>(`/hosts/${id}`, {
            headers: axiosHeaders
        });
    }
}

export default hostApi;