import { alpha, Alert, Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import useAccommodationDetails from '../../../hooks/accommodation/useAccommodationDetails';
import useHostDetails from '../../../hooks/host/useHostDetails';
import useCountryDetails from '../../../hooks/country/useCountryDetails';
import { useNavigate, useParams, Link } from 'react-router';
import { ArrowBack, Category, PersonRounded, Public } from '@mui/icons-material';
import type { MouseEvent as ReactMouseEvent } from 'react';

const toSentenceCaseLabel = (value: string) =>
    value
        .toLowerCase()
        .replaceAll('_', ' ')
        .replace(/^./, (char) => char.toUpperCase());

const AccommodationDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { accommodationDetails, loading, error } = useAccommodationDetails(id);
    const { hostDetails, loading: hostLoading, error: hostError } = useHostDetails(
        accommodationDetails ? String(accommodationDetails.host_id) : undefined,
    );
    const { countryDetails } = useCountryDetails(
        hostDetails ? String(hostDetails.country_id) : undefined,
    );

    const handleBreadcrumbMouseEnter = (event: ReactMouseEvent<HTMLAnchorElement>) => {
        event.currentTarget.style.textDecoration = 'underline';
    };

    const handleBreadcrumbMouseLeave = (event: ReactMouseEvent<HTMLAnchorElement>) => {
        event.currentTarget.style.textDecoration = 'none';
    };

    if (loading) {
        return (
            <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 280 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 2 }}>
                <Alert severity='error' role='alert'>{error.message}</Alert>
            </Box>
        );
    }

    if (!accommodationDetails) {
        return (
            <Box sx={{ py: 2 }}>
                <Alert severity='warning'>Accommodation not found.</Alert>
            </Box>
        );
    }

    return (
        <Box>
            <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
            <Link to='/accommodations' style={{ textDecoration: 'none', color: 'inherit' }}
                onMouseEnter={handleBreadcrumbMouseEnter}
                onMouseLeave={handleBreadcrumbMouseLeave}
            >
                Accommodations
            </Link>
            <Typography color='text.primary'>{accommodationDetails.name}</Typography>
            </Breadcrumbs>

            <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4, border: 1, borderColor: 'divider' }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 1,
                            bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
                            p: 3,
                            borderRadius: 3,
                            border: 1,
                            borderColor: 'divider',
                        }}>
                            <Avatar
                                src='/assets/hero.png'
                                variant='rounded'
                                sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                            />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 9 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant='h3' gutterBottom sx={{ fontWeight: 600 }}>
                                {accommodationDetails.name}
                            </Typography>

                            <Typography variant='subtitle1' sx={{ mb: 2 }}>
                                {accommodationDetails.numRooms} room(s) available
                            </Typography>

                            <Stack direction='row' spacing={1} useFlexGap sx={{ mb: 3, flexWrap: 'wrap' }}>
                                <Chip
                                    label={accommodationDetails.rented ? 'Booked' : 'Available'}
                                    color={accommodationDetails.rented ? 'default' : 'success'}
                                />
                                <Chip
                                    label={`${toSentenceCaseLabel(accommodationDetails.condition)} condition`}
                                    color='info'
                                    variant='outlined'
                                />
                                <Chip
                                    icon={<Category />}
                                    label={toSentenceCaseLabel(accommodationDetails.category)}
                                    color='primary'
                                    variant='outlined'
                                    sx={{ px: 0.5 }}
                                />
                            </Stack>

                            <Stack spacing={1.5} sx={{ mt: 1 }}>
                                <Typography variant='subtitle2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                    <PersonRounded fontSize='small' aria-hidden />
                                    Host
                                </Typography>
                                <Stack direction='row' spacing={1} useFlexGap sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
                                    {hostLoading && <CircularProgress size={22} aria-label='Loading host' />}
                                    {hostError && (
                                        <Typography variant='body2' color='error'>
                                            Could not load host details.
                                        </Typography>
                                    )}
                                    <Button
                                        component={Link}
                                        to={`/hosts/${accommodationDetails.host_id}`}
                                        variant='outlined'
                                        size='medium'
                                        sx={{ textTransform: 'none', fontWeight: 600 }}
                                    >
                                        {hostDetails
                                            ? `${hostDetails.name} ${hostDetails.surname}`.trim()
                                            : 'View host profile'}
                                    </Button>
                                    {hostDetails && (
                                        <Button
                                            component={Link}
                                            to={`/countries/${hostDetails.country_id}`}
                                            variant='text'
                                            size='medium'
                                            startIcon={<Public fontSize='small' />}
                                            sx={{ textTransform: 'none', fontWeight: 600 }}
                                        >
                                            {countryDetails ? countryDetails.name : 'Country'}
                                        </Button>
                                    )}
                                </Stack>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid>
                        <Button variant='outlined' startIcon={<ArrowBack />} onClick={() => navigate('/accommodations')} sx={{ borderWidth: 2 }}>
                            Back to Accommodations
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default AccommodationDetailsPage;