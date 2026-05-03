import { alpha, Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography, Alert } from '@mui/material';
import useHostDetails from '../../../hooks/host/useHostDetails';
import useCountryDetails from '../../../hooks/country/useCountryDetails';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowBack, Public } from '@mui/icons-material';

const HostDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { hostDetails, loading, error } = useHostDetails(id);
    const { countryDetails } = useCountryDetails(hostDetails ? String(hostDetails.country_id) : undefined);

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

    if (!hostDetails) {
        return (
            <Box sx={{ py: 2 }}>
                <Alert severity='warning'>Host not found.</Alert>
            </Box>
        );
    }

    const fullName = `${hostDetails.name} ${hostDetails.surname}`.trim();

    return (
        <Box>
            <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
                <Link to='/hosts' style={{ textDecoration: 'none', color: 'inherit' }}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                >
                    Hosts
                </Link>
                <Typography color='text.primary'>{fullName}</Typography>
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
                                sx={{ width: 96, height: 96, fontSize: 40 }}
                                aria-hidden
                            >
                                {hostDetails.name?.[0]}
                                {hostDetails.surname?.[0]}
                            </Avatar>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 9 }}>
                        <Typography variant='h3' gutterBottom sx={{ fontWeight: 600 }}>
                            {fullName}
                        </Typography>

                        <Typography variant='subtitle1' sx={{ mb: 2, color: 'text.secondary' }}>
                            Host profile
                        </Typography>

                        <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap sx={{ mb: 3 }}>
                            <Chip
                                component={Link}
                                to={`/countries/${hostDetails.country_id}`}
                                clickable
                                icon={<Public />}
                                label={countryDetails ? countryDetails.name : 'Country'}
                                color='primary'
                                variant='outlined'
                                sx={{ px: 0.5, textDecoration: 'none' }}
                            />
                        </Stack>

                        <Grid size={{ xs: 12 }}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'center' }}>
                                <Button variant='outlined' startIcon={<ArrowBack />} onClick={() => navigate('/hosts')} sx={{ borderWidth: 2 }}>
                                    All hosts
                                </Button>
                                <Button variant='text' onClick={() => navigate('/accommodations')} sx={{ fontWeight: 600 }}>
                                    Browse stays
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default HostDetailsPage;
