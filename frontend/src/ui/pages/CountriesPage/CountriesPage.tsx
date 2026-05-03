import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';
import useCountries from '../../../hooks/country/useCountries';
import CountryGrid from '../../components/country/CountryGrid';

const CountriesPage = () => {
  const { countries, loading, error } = useCountries();

  return (
    <Stack spacing={{ xs: 3, md: 4 }} component='section' aria-labelledby='countries-heading' sx={{ py: { xs: 1, md: 1.5 } }}>
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
        <Typography id='countries-heading' variant='h4' component='h1' sx={{ mb: 1, textAlign: 'left' }}>
          Countries & regions
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ textAlign: 'left', maxWidth: 560 }}>
          Explore where stays are rooted. Each card opens a country profile with continent context.
        </Typography>
        {!loading && !error && countries.length > 0 && (
          <Typography variant='body2' sx={{ mt: 1.5, color: 'primary.main', fontWeight: 600 }}>
            {countries.length} countr{countries.length === 1 ? 'y' : 'ies'} available
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
          <CircularProgress aria-label='Loading countries' />
        </Box>
      )}

      {!loading && !error && countries.length === 0 && (
        <Alert severity='info'>No countries are listed yet. Check back soon.</Alert>
      )}

      {!loading && !error && countries.length > 0 && (
        <CountryGrid countries={countries} />
      )}
    </Stack>
  );
};

export default CountriesPage;
