import useAxios from '../hooks/useAxios.ts';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types/user';

const userApi = {
    register: async (data: RegisterRequest) => {
        return await useAxios.post<RegisterResponse>('/user/register', data);
    },
    login: async (data: LoginRequest) => {
        return await useAxios.post<LoginResponse>('/user/login', data);
    },
    findAll: async () => {
        return await useAxios.get<RegisterResponse[]>('/user/all');
    },
    findByUsername: async (username: string) => {
        return await useAxios.get<RegisterResponse>(`/user/${username}`);
    },
    edit: async (data: RegisterResponse) => {
        return await useAxios.put<RegisterResponse>(`/user/edit/${data.username}`, data);
    },
    delete: async (username: string) => {
        return await useAxios.delete<RegisterResponse>(`/user/delete/${username}`);
    }
};

export default userApi;