import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';
import useAccommodationEvents from '../../../hooks/accommodation/useAccommodationEvents';
import AccommodationEventGrid from '../../components/accommodationEvent/AccommodationEventGrid';

const AccommodationEventsPage = () => {
  const { accommodationEvents, loading, error } = useAccommodationEvents();

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
          Events
        </Typography>
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

      {!loading && !error && accommodationEvents.length === 0 && (
        <Alert severity='info'>No accommodation events available.</Alert>
      )}

      {!loading && accommodationEvents.length > 0 && (
        <AccommodationEventGrid accommodationEvents={accommodationEvents} />
      )}
    </Stack>
  );
};

export default AccommodationEventsPage;
