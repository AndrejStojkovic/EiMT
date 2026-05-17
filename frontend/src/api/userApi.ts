import useAxios from '../hooks/useAxios.ts';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types/user';

const userApi = {
    register: async (data: RegisterRequest) => {
        return await useAxios.post<RegisterResponse>('/user/register', data);
    },
    login: async (data: LoginRequest) => {
        return await useAxios.post<LoginResponse>('/user/login', data);
    }
};

export default userApi;