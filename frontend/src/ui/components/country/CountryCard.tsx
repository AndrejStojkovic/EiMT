import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import {
  alpha,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router';
import type { Country } from '../../../types/country';

interface CountryCardProps {
  country: Country;
  onEdit?: (country: Country) => void;
  onDelete?: (country: Country) => void;
  isAdmin: boolean;
}

const CountryCard = ({ country, onEdit, onDelete, isAdmin }: CountryCardProps) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);
  const detailPath = `/countries/${country.id}`;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

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
        <Stack direction='row' spacing={1} sx={{ mb: 1.25, justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography
            component='h3'
            variant='h6'
            sx={{
              fontWeight: 600,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textAlign: 'left',
            }}
          >
            {country.name}
          </Typography>
          {isAdmin && (
            <IconButton
              size='small'
              aria-label='More actions'
              aria-controls={menuOpen ? 'country-card-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={menuOpen ? 'true' : undefined}
              onClick={handleMenuOpen}
              sx={{ mt: -0.5, color: 'text.secondary' }}
            >
              <MoreVertRoundedIcon fontSize='small' />
            </IconButton>
          )}
        </Stack>

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
      {isAdmin && (
        <Menu
          id='country-card-menu'
          anchorEl={menuAnchor}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          slotProps={{
            list: { dense: true, 'aria-labelledby': 'country-card-menu' },
          }}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              onEdit?.(country);
            }}
            disabled={!onEdit}
          >
            <ListItemIcon>
              <EditRoundedIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary='Edit country' />
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              onDelete?.(country);
            }}
            disabled={!onDelete}
            sx={{ color: 'error.main' }}
          >
            <ListItemIcon>
              <DeleteOutlineRoundedIcon fontSize='small' color='error' />
            </ListItemIcon>
            <ListItemText primary='Remove' />
          </MenuItem>
        </Menu>
      )}
    </Card>
  );
};

export default CountryCard;
