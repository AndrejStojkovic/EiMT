import { useState } from 'react';
import type { LoginRequest } from '../../types/user';
import userApi from '../../api/userApi';
import { useNavigate } from 'react-router';
import { useAuth } from '../useAuth';

const useLogin = () => {
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const login = async (data: LoginRequest) => {
        setLoading(true);
        setError(null);

        try {
            const response = await userApi.login(data);
            authLogin(response.data.token);
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Login failed. Please try again.'));
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};

export default useLogin;