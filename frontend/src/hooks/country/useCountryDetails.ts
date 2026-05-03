import { useEffect, useState } from 'react';
import countryApi from '../../api/countryApi';
import type { Country } from '../../types/country';

const useCountryDetails = (id?: string) => {
    const [countryDetails, setCountryDetails] = useState<Country | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if(!id) {
                return;
            }

            setLoading(true);
            try {
                const response = await countryApi.findById(id);
                setCountryDetails(response.data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An error has occured while loading country details!'));
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [id]);

    return { countryDetails, loading, error };
}

export default useCountryDetails;