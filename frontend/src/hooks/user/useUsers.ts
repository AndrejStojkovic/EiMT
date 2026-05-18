import { useCallback, useEffect, useState } from 'react';
import userApi from '../../api/userApi';
import type { RegisterResponse } from '../../types/user';

const useUsers = () => {
    const [users, setUsers] = useState<RegisterResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const loadData = useCallback(async (isInitialLoad: boolean) => {
        if (isInitialLoad) {
            setLoading(true);
        } else {
            setIsRefreshing(true);
        }

        try {
            const response = await userApi.findAll();
            setUsers(response.data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error has occured while loading users!'));
        } finally {
            if (isInitialLoad) {
                setLoading(false);
            } else {
                setIsRefreshing(false);
            }
        }
    }, []);

    const fetch = useCallback(async () => {
        await loadData(false);
    }, [loadData]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void loadData(true);
    }, [loadData]);

    return { users, loading, isRefreshing, error, fetch };
}

export default useUsers;