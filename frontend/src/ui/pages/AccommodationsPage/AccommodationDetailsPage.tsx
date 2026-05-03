import { alpha, Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import useAccommodationDetails from '../../../hooks/accommodation/useAccommodationDetails';
import { useNavigate, useParams, Link } from 'react-router';
import { ArrowBack, Category } from '@mui/icons-material';

const AccommodationDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { accommodationDetails } = useAccommodationDetails(id);

    if (!accommodationDetails) {
        return (
            <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 280 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
            <Link to='/accommodations' style={{ textDecoration: 'none', color: 'inherit' }}
                onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
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

                            <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap sx={{ mb: 3 }}>
                                <Chip
                                    label={accommodationDetails.rented ? 'Booked' : 'Available'}
                                    color={accommodationDetails.rented ? 'default' : 'success'}
                                />
                                <Chip
                                    label={`${accommodationDetails.condition} condition`}
                                    color='info'
                                    variant='outlined'
                                />
                                <Chip
                                    icon={<Category />}
                                    label={accommodationDetails.category}
                                    color='primary'
                                    variant='outlined'
                                    sx={{ px: 0.5 }}
                                />
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