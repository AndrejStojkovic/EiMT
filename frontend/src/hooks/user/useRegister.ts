import { useState } from 'react';
import type { RegisterRequest } from '../../types/user';
import userApi from '../../api/userApi';
import { useNavigate } from 'react-router';

const useRegister = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const navigate = useNavigate();

    const register = async (data: RegisterRequest) => {
        setLoading(true);
        setError(null);
        
        try {
            await userApi.register(data);
            navigate('/login');
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Registration failed. Please try again.'));
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error };
};

export default useRegister;