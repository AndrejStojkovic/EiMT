import { useCallback, useEffect, useState } from 'react';
import hostApi from '../../api/hostApi';
import type { Host } from '../../types/host';

const useHosts = () => {
    const [hosts, setHosts] = useState<Host[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        try {
            const response = await hostApi.findAll();
            const list = response.data.map((h) => {
                const x = h as Host & { countryId?: number };
                const country_id = x.country_id ?? x.countryId;
                if (country_id === undefined) {
                    return { ...x, country_id: 0 };
                }
                return { ...x, country_id };
            });
            setHosts(list);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error has occured while loading hosts!'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            void refetch();
        }, 0);

        return () => {
            window.clearTimeout(timer);
        };
    }, [refetch]);

    return { hosts, loading, error, refetch };
}

export default useHosts;