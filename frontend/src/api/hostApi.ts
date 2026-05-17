import useAxios from '../hooks/useAxios';
import type { Host } from '../types/host';

const hostApi = {
    findAll: async () => {
        return await useAxios.get<Host[]>('/hosts');
    },
    findById: async (id: string) => {
        return await useAxios.get<Host>(`/hosts/${id}`);
    }
}

export default hostApi;