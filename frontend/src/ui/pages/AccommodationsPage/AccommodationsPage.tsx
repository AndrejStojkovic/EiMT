import { Box, CircularProgress } from '@mui/material';
import useAccommodations from '../../../hooks/accommodation/useAccommodations';
import AccommodationGrid from '../../components/accommodation/AccommodationGrid';

const AccommodationsPage = () => {
    const { accommodations, loading, error } = useAccommodations();

    return (
        <Box className='accommodations-box'>
            {error && (
                <Box>{error.message}</Box>
            )}
            {loading && (
                <Box>
                    <CircularProgress />
                </Box>
            )}
            {!loading && <AccommodationGrid accommodations={accommodations} />}
        </Box>
    )
}

export default AccommodationsPage;