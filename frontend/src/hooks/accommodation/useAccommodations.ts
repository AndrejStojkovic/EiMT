import { useEffect, useState } from 'react';
import accommodationApi from '../../api/accommodationApi';
import type { Accommodation } from '../../types/accommodation';

const useAccommodations = () => {
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadData = async () => {
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
        }

        loadData();
    }, []);

    return { accommodations, loading, error };
}

export default useAccommodations;