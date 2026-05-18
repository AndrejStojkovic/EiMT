import { useEffect, useState } from 'react';
import userApi from '../../api/userApi';
import type { RegisterResponse } from '../../types/user';

const useUserDetails = (id?: string) => {
    const [userDetails, setUserDetails] = useState<RegisterResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if (!id) {
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const response = await userApi.findByUsername(id);
                setUserDetails(response.data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An error has occured while loading user details!'));
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [id]);

    return { userDetails, loading, error };
}

export default useUserDetails;