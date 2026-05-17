import { useCallback, useEffect, useState } from 'react';
import accommodationApi from '../../api/accommodationApi';
import type { Accommodation, AccommodationFilterDto } from '../../types/accommodation';

const useAccommodations = (filter: AccommodationFilterDto = {}) => {
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
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
            const response = await accommodationApi.findAll(filter);
            setAccommodations(response.data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error has occurred while loading accommodations!'));
        } finally {
            if (isInitialLoad) {
                setLoading(false);
            } else {
                setIsRefreshing(false);
            }
        }
    }, [filter]);

    const fetch = useCallback(async () => {
        await loadData(false);
    }, [loadData]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void loadData(true);
    }, [loadData]);

    return { accommodations, loading, isRefreshing, error, fetch };
}

export default useAccommodations;