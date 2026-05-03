import { useEffect, useState } from 'react';
import hostApi from '../../api/hostApi';
import type { Host } from '../../types/host';

const useHosts = () => {
    const [hosts, setHosts] = useState<Host[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const response = await hostApi.findAll();
                setHosts(response.data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An error has occured while loading hosts!'));
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return { hosts, loading, error };
}

export default useHosts;