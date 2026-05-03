import { alpha, Box, Container, Divider, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';

const Footer = () => {
  const year = new Date().getFullYear();

  const footerLinkSx = {
    color: alpha('#e2e8f0', 0.78),
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: 'color 0.2s ease',
    '&:hover': { color: '#67e8f9' },
  } as const;

  return (
    <Box
      component='footer'
      sx={{
        mt: 'auto',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#0f172a',
        color: alpha('#e2e8f0', 0.88),
        pt: { xs: 4, md: 6 },
        pb: 3,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 90% 110% at 100% 0%, rgba(79, 70, 229, 0.28) 0%, transparent 56%), radial-gradient(ellipse 65% 85% at 0% 100%, rgba(6, 182, 212, 0.22) 0%, transparent 52%)',
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
              sx={{ display: { xs: 'none', sm: 'block' }, borderColor: alpha('#e2e8f0', 0.12) }}
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
            <Typography variant='body2' sx={{ color: alpha('#e2e8f0', 0.68), lineHeight: 1.65 }}>
              Designed for modern travel planning: clear availability, clean listing details, and fast booking
              decisions.
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
            <Typography variant='subtitle2' sx={{ color: '#67e8f9' }}>
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
            <Typography variant='subtitle2' sx={{ color: '#67e8f9' }}>
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

        <Divider sx={{ my: 4, borderColor: alpha('#e2e8f0', 0.12) }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}
        >
          <Typography variant='body2' sx={{ color: alpha('#e2e8f0', 0.55) }}>
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
