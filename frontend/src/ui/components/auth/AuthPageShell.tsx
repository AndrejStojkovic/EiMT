import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import { alpha, Box, Link, Paper, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router';

interface AuthPageShellProps {
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkLabel: string;
  footerLinkTo: string;
  children: ReactNode;
}

const AuthPageShell = ({
  title,
  subtitle,
  footerText,
  footerLinkLabel,
  footerLinkTo,
  children,
}: AuthPageShellProps) => {
  return (
    <Stack
      component='section'
      spacing={3}
      sx={{ minHeight: { md: '72vh' }, justifyContent: 'center', alignItems: 'center', py: { xs: 2, md: 4 } }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 520,
          p: { xs: 3, sm: 4 },
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          backgroundImage: (theme) =>
            `linear-gradient(145deg, ${alpha(theme.palette.primary.light, 0.15)} 0%, ${alpha(theme.palette.secondary.light, 0.15)} 35%, rgba(255,255,255,0) 100%)`,
        }}
      >
        <Stack direction='row' spacing={1.25} sx={{ alignItems: 'center', mb: 2.5 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 1.25,
              display: 'grid',
              placeItems: 'center',
              color: 'primary.main',
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.14),
            }}
          >
            <TravelExploreRoundedIcon />
          </Box>
          <Box>
            <Typography variant='subtitle2' color='primary.main'>
              Staybook Account
            </Typography>
            <Typography variant='h5' component='h1'>
              {title}
            </Typography>
          </Box>
        </Stack>

        <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
          {subtitle}
        </Typography>

        {children}
      </Paper>

      <Typography variant='body2' color='text.secondary'>
        {footerText}{' '}
        <Link component={RouterLink} to={footerLinkTo} sx={{ fontWeight: 700 }}>
          {footerLinkLabel}
        </Link>
      </Typography>
    </Stack>
  );
};

export default AuthPageShell;
