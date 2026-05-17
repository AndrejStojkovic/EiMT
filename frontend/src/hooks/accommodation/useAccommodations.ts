import { useCallback, useEffect, useRef, useState } from 'react';
import accommodationApi from '../../api/accommodationApi';
import type { Accommodation, AccommodationFilterDto } from '../../types/accommodation';

const useAccommodations = (filter: AccommodationFilterDto = {}) => {
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
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
            const response = await accommodationApi.findAll(filter);
            if (!isMountedRef.current) {
                return;
            }
            setAccommodations(response.data);
            setError(null);
        } catch (err) {
            if (!isMountedRef.current) {
                return;
            }
            setError(err instanceof Error ? err : new Error('An error has occurred while loading accommodations!'));
        } finally {
            if (isMountedRef.current) {
                if (isInitialLoad) {
                    setLoading(false);
                } else {
                    setIsRefreshing(false);
                }
            }
        }
    }, [filter]);

    const fetch = useCallback(async () => {
        await loadData(false);
    }, [loadData]);

    useEffect(() => {
        isMountedRef.current = true;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void loadData(true);

        return () => {
            isMountedRef.current = false;
        };
    }, [loadData]);

    return { accommodations, loading, isRefreshing, error, fetch };
}

export default useAccommodations;