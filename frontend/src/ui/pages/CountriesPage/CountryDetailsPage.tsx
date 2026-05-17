import { Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography, Alert } from '@mui/material';
import useCountryDetails from '../../../hooks/country/useCountryDetails';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowBack, Public } from '@mui/icons-material';

const CountryDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { countryDetails, loading, error } = useCountryDetails(id);

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

    if (!countryDetails) {
        return (
            <Box sx={{ py: 2 }}>
                <Alert severity='warning'>Country not found.</Alert>
            </Box>
        );
    }

    return (
        <Box>
            <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
                <Link to='/countries' style={{ textDecoration: 'none', color: 'inherit' }}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                >
                    Countries
                </Link>
                <Typography color='text.primary'>{countryDetails.name}</Typography>
            </Breadcrumbs>

            <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4, border: 1, borderColor: 'divider' }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant='h3' gutterBottom sx={{ fontWeight: 600 }}>
                            {countryDetails.name}
                        </Typography>

                        <Stack direction='row' spacing={1} useFlexGap sx={{ mb: 3, flexWrap: 'wrap' }}>
                            <Chip
                                icon={<Public />}
                                label={countryDetails.continent}
                                color='primary'
                                variant='outlined'
                                sx={{ px: 0.5 }}
                            />
                        </Stack>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ alignItems: { sm: 'center' } }}>
                            <Button variant='outlined' startIcon={<ArrowBack />} onClick={() => navigate('/countries')} sx={{ borderWidth: 2 }}>
                                All countries
                            </Button>
                            <Button variant='text' onClick={() => navigate('/accommodations')} sx={{ fontWeight: 600 }}>
                                Browse stays
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default CountryDetailsPage;
