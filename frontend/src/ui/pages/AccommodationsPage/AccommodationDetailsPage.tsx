import { Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import useAccommodationDetails from '../../../hooks/accommodation/useAccommodationDetails';
import { useNavigate, useParams, Link } from 'react-router';
import { ArrowBack, Category } from '@mui/icons-material';

const AccommodationDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { accommodationDetails } = useAccommodationDetails(id);

    if (!accommodationDetails) {
        return <Box className='progress-box'><CircularProgress /></Box>;
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

            <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 4,
                            bgcolor: 'background.paper',
                            p: 3,
                            borderRadius: 3,
                            boxShadow: 1
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

                            <Typography variant='subtitle1' sx={{ mb: 3 }}>
                                {accommodationDetails.numRooms} room(s) available
                            </Typography>

                            <Typography variant='body2' sx={{ textAlign: 'left' }}>
                                {accommodationDetails.rented ? 'rented' : 'not rented'}
                            </Typography>

                            <Typography variant='body2' sx={{ textAlign: 'left' }}>
                                {accommodationDetails.condition} condition
                            </Typography>

                            <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
                                <Chip
                                    icon={<Category />}
                                    label={accommodationDetails.category}
                                    color='primary'
                                    variant='outlined'
                                    sx={{ p: 2 }}
                                />
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid>
                        <Button variant='outlined' startIcon={<ArrowBack />} onClick={() => navigate('/accommodations')}>
                            Back to Accommodations
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default AccommodationDetailsPage;