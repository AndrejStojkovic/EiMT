import { useEffect, useState, useCallback } from 'react';
import accommodationApi from '../api/accommodationApi';
import type { Accommodation } from '../types/accommodation';

const useAccommodations = () => {
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);

        try {
            const response = await accommodationApi.findAll();
            setAccommodations(response.data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error has occured while loading accommodations!'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { accommodations, loading, error, fetch };
}

export default useAccommodations;