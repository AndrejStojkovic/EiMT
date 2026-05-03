import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import NightShelterRoundedIcon from '@mui/icons-material/NightShelterRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';

const HomePage = () => {
  return (
    <Stack spacing={{ xs: 4, md: 6 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 7 },
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
        <Typography variant='body1' color='text.secondary' sx={{ maxWidth: 660, mb: 4 }}>
          Welcome to Staybook. We are here to make your travel planning calmer, simpler, and more enjoyable from the
          very first click.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
        <Paper elevation={0} sx={{ p: 3.5, borderRadius: 2, border: 1, borderColor: 'divider' }}>
          <Typography variant='h6' sx={{ mb: 0.5 }}>
            Clear Availability
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Low-inventory alerts and status chips make booking decisions easier.
          </Typography>
        </Paper>
        <Paper elevation={0} sx={{ p: 3.5, borderRadius: 2, border: 1, borderColor: 'divider' }}>
          <Typography variant='h6' sx={{ mb: 0.5 }}>
            Modern Listings
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Card layouts focus on what matters most for guests and hosts.
          </Typography>
        </Paper>
        <Paper elevation={0} sx={{ p: 3.5, borderRadius: 2, border: 1, borderColor: 'divider' }}>
          <Typography variant='h6' sx={{ mb: 0.5 }}>
            Fast Navigation
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            A cleaner layout keeps browsing smooth across mobile and desktop.
          </Typography>
        </Paper>
      </Box>

      <Paper elevation={0} sx={{ p: { xs: 3.5, md: 5 }, borderRadius: 2, border: 1, borderColor: 'divider' }}>
        <Typography variant='h5' sx={{ mb: 1.5 }}>
          Why travelers feel at home with Staybook
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ mb: 4, maxWidth: 760 }}>
          Whether it is a weekend city break or a longer family trip, Staybook helps you compare with confidence and
          book with less stress.
        </Typography>
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
          <Stack direction='row' spacing={1.5} sx={{ alignItems: 'flex-start' }}>
            <NightShelterRoundedIcon color='primary' />
            <Box>
              <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                Real-time inventory
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                No guessing. You immediately see what is available right now.
              </Typography>
            </Box>
          </Stack>
          <Stack direction='row' spacing={1.5} sx={{ alignItems: 'flex-start' }}>
            <FavoriteRoundedIcon color='primary' />
            <Box>
              <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                Friendly booking flow
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                A clean, welcoming UI keeps decisions simple and helps you move faster.
              </Typography>
            </Box>
          </Stack>
          <Stack direction='row' spacing={1.5} sx={{ alignItems: 'flex-start' }}>
            <SupportAgentRoundedIcon color='primary' />
            <Box>
              <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                Helpful support options
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Easy access to help center information and cancellation guidance.
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ p: { xs: 3.5, md: 5 }, borderRadius: 2, border: 1, borderColor: 'divider' }}>
        <Typography variant='h5' sx={{ mb: 1.5 }}>
          How Staybook works
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ mb: 4, maxWidth: 760 }}>
          Three simple steps to go from browsing to booking, without the usual decision fatigue.
        </Typography>
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: 1, borderColor: 'divider', bgcolor: 'background.default' }}>
            <Stack direction='row' spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
              <SearchRoundedIcon color='primary' fontSize='small' />
              <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
                1. Browse smarter
              </Typography>
            </Stack>
            <Typography variant='body2' color='text.secondary'>
              Start with listings that match your schedule and quickly spot low-inventory options.
            </Typography>
          </Paper>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: 1, borderColor: 'divider', bgcolor: 'background.default' }}>
            <Stack direction='row' spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
              <CheckCircleRoundedIcon color='primary' fontSize='small' />
              <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
                2. Compare confidently
              </Typography>
            </Stack>
            <Typography variant='body2' color='text.secondary'>
              Use clear card details to compare availability, quality, and booking readiness side by side.
            </Typography>
          </Paper>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: 1, borderColor: 'divider', bgcolor: 'background.default' }}>
            <Stack direction='row' spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
              <FlightTakeoffRoundedIcon color='primary' fontSize='small' />
              <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
                3. Book and go
              </Typography>
            </Stack>
            <Typography variant='body2' color='text.secondary'>
              Open your preferred stay, review details, and move forward with a clear next step.
            </Typography>
          </Paper>
        </Box>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 3.5, md: 5 },
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
          background: 'linear-gradient(120deg, rgba(6,182,212,0.07) 0%, rgba(79,70,229,0.08) 100%)',
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ maxWidth: 640 }}>
            <Stack direction='row' spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
              <TipsAndUpdatesRoundedIcon color='primary' fontSize='small' />
              <Typography variant='subtitle2' color='primary.main'>
                Friendly tip
              </Typography>
            </Stack>
            <Typography variant='h6' sx={{ mb: 1 }}>
              Start with the stays page and filter by availability first.
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              It is the quickest way to narrow your options and focus only on places you can book today.
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row', md: 'column' }} spacing={1.5}>
            <Button component={RouterLink} to='/accommodations' variant='contained' color='primary'>
              Start exploring
            </Button>
            <Button component={RouterLink} to='/accommodations' variant='text' endIcon={<ArrowForwardRoundedIcon />}>
              Continue browsing
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default HomePage;
