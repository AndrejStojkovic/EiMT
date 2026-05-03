import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import useHosts from '../../../hooks/host/useHosts';
import useCountries from '../../../hooks/country/useCountries';
import HostGrid from '../../components/host/HostGrid';

const HostsPage = () => {
  const { hosts, loading, error } = useHosts();
  const { countries, loading: countriesLoading, error: countriesError } = useCountries();

  const countryNameById = useMemo(() => {
    const m: Record<number, string> = {};
    for (const c of countries) {
      m[c.id] = c.name;
    }
    return m;
  }, [countries]);

  return (
    <Stack spacing={{ xs: 3, md: 4 }} component='section' aria-labelledby='hosts-heading' sx={{ py: { xs: 1, md: 1.5 } }}>
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
        <Typography id='hosts-heading' variant='h4' component='h1' sx={{ mb: 1, textAlign: 'left' }}>
          Host directory
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ textAlign: 'left', maxWidth: 560 }}>
          Meet the people behind the listings. Open a profile to see where they are based and link through to their country.
        </Typography>
        {!loading && !error && hosts.length > 0 && (
          <Typography variant='body2' sx={{ mt: 1.5, color: 'primary.main', fontWeight: 600 }}>
            {hosts.length} host{hosts.length === 1 ? '' : 's'} in the directory
          </Typography>
        )}
      </Box>

      {error && (
        <Alert severity='error' role='alert'>
          {error.message}
        </Alert>
      )}

      {countriesError && (
        <Alert severity='warning' role='status'>
          {countriesError.message} Country names on cards may be incomplete.
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
          <CircularProgress aria-label='Loading hosts' />
        </Box>
      )}

      {!loading && !error && hosts.length === 0 && (
        <Alert severity='info'>No hosts are listed yet. Check back soon.</Alert>
      )}

      {!loading && !error && hosts.length > 0 && (
        <HostGrid hosts={hosts} countryNameById={countriesLoading ? undefined : countryNameById} />
      )}
    </Stack>
  );
};

export default HostsPage;
