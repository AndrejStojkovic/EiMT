import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
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
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router';
import type { Accommodation } from '../../../types/accommodation';

interface AccommodationCardProps {
  accommodation: Accommodation;
  onEdit?: (accommodation: Accommodation) => void;
  onDelete?: (accommodation: Accommodation) => void;
}

const AccommodationCard = ({ accommodation, onEdit, onDelete }: AccommodationCardProps) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);
  const detailPath = `/accommodations/${accommodation.id}`;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const availabilityLabel = accommodation.rented ? 'Booked right now' : 'Available to book';
  const hasLowInventory = accommodation.numRooms <= 2 && !accommodation.rented;

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
            `linear-gradient(155deg, ${alpha(t.palette.primary.light, 0.95)} 0%, ${alpha(t.palette.primary.main, 0.95)} 52%, ${alpha(t.palette.secondary.dark, 0.7)} 100%)`,
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'secondary.light',
            outlineOffset: 2,
          },
        }}
        aria-label={`View details for ${accommodation.name}`}
      >
        <Stack spacing={0.75} sx={{ alignItems: 'center' }}>
          <HotelRoundedIcon sx={{ fontSize: 52, color: alpha('#fff', 0.95) }} aria-hidden />
          <Typography variant='subtitle2' sx={{ color: alpha('#fff', 0.9), letterSpacing: '0.1em' }}>
            STAYBOOK SELECT
          </Typography>
        </Stack>
      </CardMedia>

      <CardContent sx={{ flex: '1 1 auto', pt: 2.25, pb: 1.25, px: 2.25 }}>
        <Stack
          direction='row'
          spacing={1}
          sx={{ mb: 1.25, justifyContent: 'space-between', alignItems: 'flex-start' }}
        >
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
            {accommodation.name}
          </Typography>
          <IconButton
            size='small'
            aria-label='More actions'
            aria-controls={menuOpen ? 'accommodation-card-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={menuOpen ? 'true' : undefined}
            onClick={handleMenuOpen}
            sx={{ mt: -0.5, color: 'text.secondary' }}
          >
            <MoreVertRoundedIcon fontSize='small' />
          </IconButton>
        </Stack>

        <Stack direction='row' spacing={0.5} sx={{ color: 'text.secondary', mb: 1.5, alignItems: 'center' }}>
          <LocationOnRoundedIcon fontSize='small' />
          <Typography variant='body2'>Featured destination</Typography>
        </Stack>

        <Stack direction='row' spacing={0.75} sx={{ mb: 2, justifyContent: 'flex-start', flexWrap: 'wrap' }}>
          <Chip
            size='small'
            label={`${accommodation.numRooms} ${accommodation.numRooms === 1 ? 'room' : 'rooms'}`}
            variant='outlined'
            sx={{ fontWeight: 500, borderColor: 'divider' }}
          />
          {accommodation.numRooms > 0 &&
            <Chip
              size='small'
              label={hasLowInventory ? 'Almost sold out!' : 'Good availability'}
              color={hasLowInventory ? 'error' : 'success'}
              variant='outlined'
              sx={{ fontWeight: 500 }}
            />
          }
          
        </Stack>

        <Chip
          size='medium'
          label={availabilityLabel}
          color={accommodation.rented ? 'success' : 'success'}
          sx={{
            fontWeight: 600,
            ...(accommodation.rented
              ? { bgcolor: (t) => alpha(t.palette.error.main, 1) }
              : {}),
          }}
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
          View stay details
        </Button>
      </CardActions>

      <Menu
        id='accommodation-card-menu'
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          list: { dense: true, 'aria-labelledby': 'accommodation-card-menu' },
        }}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            onEdit?.(accommodation);
          }}
          disabled={!onEdit}
        >
          <ListItemIcon>
            <EditRoundedIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Edit listing' />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            onDelete?.(accommodation);
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
    </Card>
  );
};

export default AccommodationCard;
