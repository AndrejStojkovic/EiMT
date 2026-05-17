import { useCallback, useEffect, useState } from 'react';
import countryApi from '../../api/countryApi';
import type { Country } from '../../types/country';

const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
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
            const response = await countryApi.findAll();
            setCountries(response.data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error has occured while loading countries!'));
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
        const timeoutId = window.setTimeout(() => {
            void loadData(true);
        }, 0);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [loadData]);

    return { countries, loading, isRefreshing, error, fetch };
}

export default useCountries;