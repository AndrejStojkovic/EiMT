import { useCallback, useEffect, useState } from 'react';
import hostApi from '../../api/hostApi';
import type { Host } from '../../types/host';

const useHosts = () => {
    const [hosts, setHosts] = useState<Host[]>([]);
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
            const response = await hostApi.findAll();
            const list = response.data.map((h) => {
                const x = h as Host & { countryId?: number };
                const country_id = x.country_id ?? x.countryId;
                if (country_id === undefined) {
                    throw new Error(`Host "${x.name} ${x.surname}" is missing country id.`);
                }
                return { ...x, country_id };
            });
            setHosts(list);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error has occured while loading hosts!'));
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

    return { hosts, loading, isRefreshing, error, fetch };
}

export default useHosts;