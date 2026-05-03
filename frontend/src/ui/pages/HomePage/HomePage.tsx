import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';

const HomePage = () => {
  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
          background:
            'linear-gradient(130deg, rgba(79,70,229,0.12) 0%, rgba(6,182,212,0.1) 42%, rgba(255,255,255,0.95) 100%)',
        }}
      >
        <Chip
          icon={<VerifiedRoundedIcon />}
          label='Staybook verified stays'
          color='primary'
          variant='outlined'
          sx={{ mb: 2 }}
        />
        <Typography variant='h2' sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, mb: 1.5 }}>
          Find the right place faster.
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ maxWidth: 620, mb: 3 }}>
          Staybook helps you compare high-quality accommodations with clear availability and a smoother booking
          experience.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button
            component={RouterLink}
            to='/accommodations'
            variant='contained'
            color='primary'
            startIcon={<SearchRoundedIcon />}
          >
            Explore stays
          </Button>
          <Button component={RouterLink} to='/accommodations' variant='outlined' endIcon={<ArrowForwardRoundedIcon />}>
            View all listings
          </Button>
        </Stack>
      </Paper>

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
        <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, border: 1, borderColor: 'divider' }}>
          <Typography variant='h6' sx={{ mb: 0.5 }}>
            Clear Availability
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Low-inventory alerts and status chips make booking decisions easier.
          </Typography>
        </Paper>
        <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, border: 1, borderColor: 'divider' }}>
          <Typography variant='h6' sx={{ mb: 0.5 }}>
            Modern Listings
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Card layouts focus on what matters most for guests and hosts.
          </Typography>
        </Paper>
        <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, border: 1, borderColor: 'divider' }}>
          <Typography variant='h6' sx={{ mb: 0.5 }}>
            Fast Navigation
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            A cleaner layout keeps browsing smooth across mobile and desktop.
          </Typography>
        </Paper>
      </Box>
    </Stack>
  );
};

export default HomePage;
