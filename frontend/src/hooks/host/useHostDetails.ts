import { useEffect, useState } from 'react';
import hostApi from '../../api/hostApi';
import type { Host } from '../../types/host';

const useHostDetails = (id?: string) => {
    const [hostDetails, setHostDetails] = useState<Host | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if(!id) {
                return;
            }

            setLoading(true);
            try {
                const response = await hostApi.findById(id);
                setHostDetails(response.data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An error has occured while loading host details!'));
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [id]);

    return { hostDetails, loading, error };
}

export default useHostDetails;