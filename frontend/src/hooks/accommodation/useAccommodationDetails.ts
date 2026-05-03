import { useEffect, useState } from 'react';
import accommodationApi from '../../api/accommodationApi';
import type { AccommodationDetails } from '../../types/accommodation';

const useAccommodationDetails = (id?: string) => {
    const [accommodationDetails, setAccommodationDetails] = useState<AccommodationDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if(!id) {
                return;
            }

            setLoading(true);
            try {
                const response = await accommodationApi.findById(id);
                setAccommodationDetails(response.data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An error has occured while loading accommodation details!'));
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [id]);

    return { accommodationDetails, loading, error };
}

export default useAccommodationDetails;