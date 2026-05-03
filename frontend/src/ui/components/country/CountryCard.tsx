import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import {
  alpha,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import type { Country } from '../../../types/country';

interface CountryCardProps {
  country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
  const detailPath = `/countries/${country.id}`;

  return (
    <Card
      elevation={0}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        transition: 'box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
        '&:hover': {
          borderColor: (t) => alpha(t.palette.primary.main, 0.45),
          boxShadow: (t) => `0 18px 45px ${alpha(t.palette.primary.dark, 0.18)}`,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardMedia
        component={RouterLink}
        to={detailPath}
        sx={{
          height: 170,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          background: (t) =>
            `linear-gradient(155deg, ${alpha(t.palette.info.light, 0.85)} 0%, ${alpha(t.palette.primary.dark, 0.88)} 48%, ${alpha(t.palette.secondary.dark, 0.72)} 100%)`,
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'secondary.light',
            outlineOffset: 2,
          },
        }}
        aria-label={`View details for ${country.name}`}
      >
        <Stack spacing={0.75} sx={{ alignItems: 'center' }}>
          <PublicRoundedIcon sx={{ fontSize: 52, color: alpha('#fff', 0.95) }} aria-hidden />
          <Typography variant='subtitle2' sx={{ color: alpha('#fff', 0.9), letterSpacing: '0.1em' }}>
            DESTINATION
          </Typography>
        </Stack>
      </CardMedia>

      <CardContent sx={{ flex: '1 1 auto', pt: 2.25, pb: 1.25, px: 2.25 }}>
        <Typography
          component='h3'
          variant='h6'
          sx={{
            fontWeight: 600,
            lineHeight: 1.3,
            mb: 1.25,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textAlign: 'left',
          }}
        >
          {country.name}
        </Typography>

        <Chip
          size='small'
          label={country.continent}
          color='primary'
          variant='outlined'
          sx={{ fontWeight: 500, borderColor: 'divider' }}
        />
      </CardContent>

      <CardActions sx={{ p: 2.25, pt: 0, mt: 'auto' }}>
        <Button
          component={RouterLink}
          to={detailPath}
          variant='contained'
          color='primary'
          fullWidth
          size='large'
          sx={{ borderRadius: 1.5 }}
        >
          View country
        </Button>
      </CardActions>
    </Card>
  );
};

export default CountryCard;
