import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Alert, Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Pagination, Select, Stack, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router';
import accommodationApi from '../../../api/accommodationApi';
import countryApi from '../../../api/countryApi';
import hostApi from '../../../api/hostApi';
import {
  areAccommodationFiltersEqual,
  hasAccommodationFilters,
  normalizeAccommodationFilter,
} from '../../../helpers/accommodationFilters';
import type { Accommodation, AccommodationFilterDto, AccommodationPage } from '../../../types/accommodation';
import type { Country } from '../../../types/country';
import type { Host } from '../../../types/host';
import AccommodationFilters from '../../components/accommodation/AccommodationFilters';
import AccommodationGrid from '../../components/accommodation/AccommodationGrid';

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? fallback;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
};

const AccommodationsPaginatedPage = () => {
  const [draftFilter, setDraftFilter] = useState<AccommodationFilterDto>({});
  const [appliedFilter, setAppliedFilter] = useState<AccommodationFilterDto>({});
  const [hosts, setHosts] = useState<Host[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [accommodationsPage, setAccommodationsPage] = useState<AccommodationPage | null>(null);
  const [loadingMetadata, setLoadingMetadata] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadataError, setMetadataError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const isMountedRef = useRef(true);
  const hasLoadedPageRef = useRef(false);
  const pageSizeOptions = [5, 10, 25, 50, 100] as const;

  useEffect(() => {
    const loadMetadata = async () => {
      setLoadingMetadata(true);
      try {
        const [hostsResponse, countriesResponse] = await Promise.all([hostApi.findAll(), countryApi.findAll()]);
        if (!isMountedRef.current) {
          return;
        }
        setHosts(hostsResponse.data);
        setCountries(countriesResponse.data);
        setMetadataError(null);
      } catch (err) {
        if (!isMountedRef.current) {
          return;
        }
        setMetadataError(getApiErrorMessage(err, 'Could not load accommodation filter metadata.'));
      } finally {
        if (isMountedRef.current) {
          setLoadingMetadata(false);
        }
      }
    };

    void loadMetadata();
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    const loadAccommodations = async () => {
      if (!hasLoadedPageRef.current) {
        setLoading(true);
      } else {
        setIsRefreshing(true);
      }

      try {
        const response = await accommodationApi.findAllPaginated({
          filter: appliedFilter,
          page,
          size,
          sortBy: 'name',
        });
        if (!isMountedRef.current) {
          return;
        }
        setAccommodationsPage(response.data);
        hasLoadedPageRef.current = true;
        setError(null);
      } catch (err) {
        if (!isMountedRef.current) {
          return;
        }
        setError(getApiErrorMessage(err, 'Could not load paginated accommodations.'));
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
          setIsRefreshing(false);
        }
      }
    };

    void loadAccommodations();

    return () => {
      isMountedRef.current = false;
    };
  }, [appliedFilter, page, size]);

  const applyFilters = () => {
    const normalizedDraft = normalizeAccommodationFilter(draftFilter);
    if (!areAccommodationFiltersEqual(appliedFilter, normalizedDraft)) {
      setPage(0);
      setAppliedFilter(normalizedDraft);
    }
  };

  const clearFilters = () => {
    if (!hasAccommodationFilters(draftFilter) && !hasAccommodationFilters(appliedFilter)) {
      return;
    }
    setPage(0);
    setDraftFilter({});
    setAppliedFilter({});
  };

  const accommodations: Accommodation[] = accommodationsPage?.content ?? [];

  return (
    <Stack spacing={{ xs: 3, md: 4 }} component='section' aria-labelledby='paginated-stays-heading' sx={{ py: { xs: 1, md: 1.5 } }}>
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
        <Typography id='paginated-stays-heading' variant='h4' component='h1' sx={{ mb: 1, textAlign: 'left' }}>
          Paginated stays
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ textAlign: 'left', maxWidth: 560 }}>
          Explore accommodations with paging and the same backend filters as the standard stays view.
        </Typography>
        <Button component={RouterLink} to='/accommodations' variant='outlined' startIcon={<ArrowBackRoundedIcon />} sx={{ mt: 2 }}>
          Back to stays
        </Button>
        {isRefreshing && (
          <Typography variant='body2' sx={{ mt: 1, color: 'text.secondary' }}>
            Refreshing paginated stays...
          </Typography>
        )}
      </Box>

      {metadataError && <Alert severity='warning'>{metadataError}</Alert>}
      {error && <Alert severity='error'>{error}</Alert>}

      <AccommodationFilters
        filter={draftFilter}
        hosts={hosts}
        countries={countries}
        disabled={loadingMetadata}
        onChange={setDraftFilter}
        onApply={applyFilters}
        onReset={clearFilters}
      />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' } }}>
        <Typography variant='body2' color='text.secondary'>
          {accommodationsPage ? `${accommodationsPage.totalElements} total stays` : 'Total stays unavailable'}
        </Typography>
        <FormControl size='small' sx={{ width: { xs: '100%', sm: 130 } }}>
          <InputLabel id='paginated-page-size-label'>Page size</InputLabel>
          <Select
            labelId='paginated-page-size-label'
            label='Page size'
            value={size}
            onChange={(event) => {
              const nextSize = Number(event.target.value);
              if (pageSizeOptions.includes(nextSize as (typeof pageSizeOptions)[number])) {
                setPage(0);
                setSize(nextSize);
              }
            }}
          >
            {pageSizeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

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
          <CircularProgress aria-label='Loading paginated stays' />
        </Box>
      )}

      {!loading && accommodations.length === 0 && <Alert severity='info'>No stays match the selected filters.</Alert>}

      {!loading && accommodations.length > 0 && <AccommodationGrid accommodations={accommodations} />}

      {accommodationsPage && accommodationsPage.totalPages > 1 && (
        <Stack sx={{ alignItems: 'center' }}>
          <Pagination
            page={accommodationsPage.number + 1}
            count={accommodationsPage.totalPages}
            color='primary'
            onChange={(_event, value) => setPage(value - 1)}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default AccommodationsPaginatedPage;
