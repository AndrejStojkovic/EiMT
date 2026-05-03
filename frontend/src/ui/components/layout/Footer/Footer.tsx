import { alpha, Box, Container, Divider, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';

const Footer = () => {
  const year = new Date().getFullYear();

  const footerLinkSx = {
    color: alpha('#faf6ef', 0.72),
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: 'color 0.2s ease',
    '&:hover': { color: 'secondary.light' },
  } as const;

  return (
    <Box
      component='footer'
      sx={{
        mt: 'auto',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'primary.dark',
        color: alpha('#faf6ef', 0.85),
        pt: { xs: 4, md: 6 },
        pb: 3,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 120% at 100% 0%, rgba(201, 148, 60, 0.18) 0%, transparent 55%), radial-gradient(ellipse 60% 80% at 0% 100%, rgba(47, 69, 96, 0.5) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 3, sm: 6, md: 8 }}
          divider={
            <Divider
              flexItem
              orientation='vertical'
              sx={{ display: { xs: 'none', sm: 'block' }, borderColor: alpha('#faf6ef', 0.12) }}
            />
          }
          sx={{
            alignItems: { xs: 'flex-start', sm: 'stretch' },
            width: '100%',
          }}
        >
          <Box sx={{ flex: { sm: '1 1 0' }, minWidth: 0, maxWidth: { md: 280 } }}>
            <Typography variant='h6' sx={{ color: 'common.white', fontWeight: 700, mb: 1 }}>
              Staybook
            </Typography>
            <Typography variant='body2' sx={{ color: alpha('#faf6ef', 0.65), lineHeight: 1.65 }}>
              Compare stays, check availability, and book with confidence. Built for travelers who want a calm,
              straightforward planning experience.
            </Typography>
          </Box>

          <Stack
            spacing={1.5}
            sx={{
              flex: { sm: '1 1 0' },
              minWidth: 0,
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography variant='subtitle2' sx={{ color: 'secondary.light' }}>
              Explore
            </Typography>
            <Link component={RouterLink} to='/' sx={footerLinkSx}>
              Home
            </Link>
            <Link component={RouterLink} to='/accommodations' sx={footerLinkSx}>
              All stays
            </Link>
          </Stack>

          <Stack
            spacing={1.5}
            sx={{
              flex: { sm: '1 1 0' },
              minWidth: 0,
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography variant='subtitle2' sx={{ color: 'secondary.light' }}>
              Support
            </Typography>
            <Link href='#' sx={footerLinkSx} onClick={(e) => e.preventDefault()}>
              Help center
            </Link>
            <Link href='#' sx={footerLinkSx} onClick={(e) => e.preventDefault()}>
              Cancellation options
            </Link>
            <Link href='#' sx={footerLinkSx} onClick={(e) => e.preventDefault()}>
              Contact
            </Link>
          </Stack>
        </Stack>

        <Divider sx={{ my: 4, borderColor: alpha('#faf6ef', 0.12) }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}
        >
          <Typography variant='body2' sx={{ color: alpha('#faf6ef', 0.5) }}>
            © {year} Staybook. Demo booking experience.
          </Typography>
          <Stack direction='row' sx={{ flexWrap: 'wrap', gap: 2 }}>
            <Link href='#' sx={footerLinkSx} onClick={(e) => e.preventDefault()}>
              Privacy
            </Link>
            <Link href='#' sx={footerLinkSx} onClick={(e) => e.preventDefault()}>
              Terms
            </Link>
            <Link href='#' sx={footerLinkSx} onClick={(e) => e.preventDefault()}>
              Sitemap
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
