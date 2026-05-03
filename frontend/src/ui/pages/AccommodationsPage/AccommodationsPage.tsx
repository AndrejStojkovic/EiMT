import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';
import useAccommodations from '../../../hooks/accommodation/useAccommodations';
import AccommodationGrid from '../../components/accommodation/AccommodationGrid';

const AccommodationsPage = () => {
  const { accommodations, loading, error } = useAccommodations();
  const availableCount = accommodations.filter((accommodation) => !accommodation.rented).length;

  return (
    <Stack spacing={{ xs: 3, md: 4 }} component='section' aria-labelledby='stays-heading' sx={{ py: { xs: 1, md: 1.5 } }}>
      <Box
        sx={{
          p: { xs: 2.5, sm: 3.5 },
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          backgroundImage:
            'linear-gradient(112deg, rgba(79, 70, 229, 0.1) 0%, rgba(6, 182, 212, 0.08) 45%, rgba(255,255,255,0) 85%)',
        }}
      >
        <Typography id='stays-heading' variant='h4' component='h1' sx={{ mb: 1, textAlign: 'left' }}>
          Discover your next stay
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ textAlign: 'left', maxWidth: 560 }}>
          Browse curated accommodations, compare availability, and open any listing for full details and booking info.
        </Typography>
        {!loading && !error && accommodations.length > 0 && (
          <Typography variant='body2' sx={{ mt: 1.5, color: 'primary.main', fontWeight: 600 }}>
            {availableCount} of {accommodations.length} stays currently available
          </Typography>
        )}
      </Box>

      {error && (
        <Alert severity='error' role='alert'>
          {error.message}
        </Alert>
      )}

      {loading && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 280,
            borderRadius: 2,
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <CircularProgress aria-label='Loading stays' />
        </Box>
      )}

      {!loading && !error && accommodations.length === 0 && (
        <Alert severity='info'>No stays are listed yet. Check back soon.</Alert>
      )}

      {!loading && accommodations.length > 0 && (
        <AccommodationGrid accommodations={accommodations} />
      )}
    </Stack>
  );
};

export default AccommodationsPage;
