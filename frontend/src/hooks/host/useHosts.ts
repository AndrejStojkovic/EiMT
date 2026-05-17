import { useCallback, useEffect, useRef, useState } from 'react';
import hostApi from '../../api/hostApi';
import type { Host } from '../../types/host';

const useHosts = () => {
    const [hosts, setHosts] = useState<Host[]>([]);
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
            const response = await hostApi.findAll();
            const list = response.data.map((h) => {
                const x = h as Host & { countryId?: number };
                const country_id = x.country_id ?? x.countryId;
                if (country_id === undefined) {
                    throw new Error(`Host "${x.name} ${x.surname}" is missing country id.`);
                }
                return { ...x, country_id };
            });
            if (!isMountedRef.current) {
                return;
            }
            setHosts(list);
            setError(null);
        } catch (err) {
            if (!isMountedRef.current) {
                return;
            }
            setError(err instanceof Error ? err : new Error('An error has occured while loading hosts!'));
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

    return { hosts, loading, isRefreshing, error, fetch };
}

export default useHosts;