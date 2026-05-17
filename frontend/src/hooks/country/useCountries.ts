import { useCallback, useEffect, useRef, useState } from 'react';
import countryApi from '../../api/countryApi';
import type { Country } from '../../types/country';

const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const isMountedRef = useRef(true);

    const loadData = useCallback(async (isInitialLoad: boolean) => {
        if (isInitialLoad) {
            setLoading(true);
        } else {
            setIsRefreshing(true);
        }
        try {
            const response = await countryApi.findAll();
            if (!isMountedRef.current) {
                return;
            }
            setCountries(response.data);
            setError(null);
        } catch (err) {
            if (!isMountedRef.current) {
                return;
            }
            setError(err instanceof Error ? err : new Error('An error has occured while loading countries!'));
        } finally {
            if (!isMountedRef.current) {
                return;
            }
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
        isMountedRef.current = true;
        void loadData(true);

        return () => {
            isMountedRef.current = false;
        };
    }, [loadData]);

    return { countries, loading, isRefreshing, error, fetch };
}

export default useCountries;