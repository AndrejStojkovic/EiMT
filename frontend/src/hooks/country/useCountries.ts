import { useEffect, useState } from 'react';
import countryApi from '../../api/countryApi';
import type { Country } from '../../types/country';

const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const response = await countryApi.findAll();
                setCountries(response.data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An error has occured while loading countries!'));
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return { countries, loading, error };
}

export default useCountries;