import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
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
import type { Host } from '../../../types/host';

interface HostCardProps {
  host: Host;
  countryName?: string;
  onEdit?: (host: Host) => void;
  onDelete?: (host: Host) => void;
  isAdmin: boolean;
}

const HostCard = ({ host, countryName, onEdit, onDelete, isAdmin }: HostCardProps) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);
  const detailPath = `/hosts/${host.id}`;
  const fullName = `${host.name} ${host.surname}`.trim();

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
            `linear-gradient(155deg, ${alpha(t.palette.secondary.light, 0.92)} 0%, ${alpha(t.palette.primary.main, 0.92)} 55%, ${alpha(t.palette.primary.dark, 0.75)} 100%)`,
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'secondary.light',
            outlineOffset: 2,
          },
        }}
        aria-label={`View profile for ${fullName}`}
      >
        <Stack spacing={0.75} sx={{ alignItems: 'center' }}>
          <PersonRoundedIcon sx={{ fontSize: 52, color: alpha('#fff', 0.95) }} aria-hidden />
          <Typography variant='subtitle2' sx={{ color: alpha('#fff', 0.9), letterSpacing: '0.1em' }}>
            HOST
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
            {fullName}
          </Typography>
          {isAdmin && (
            <IconButton
              size='small'
              aria-label='More actions'
              aria-controls={menuOpen ? 'host-card-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={menuOpen ? 'true' : undefined}
              onClick={handleMenuOpen}
              sx={{ mt: -0.5, color: 'text.secondary' }}
            >
              <MoreVertRoundedIcon fontSize='small' />
            </IconButton>
          )}
        </Stack>

        <Stack direction='row' spacing={0.75} sx={{ mb: 0, flexWrap: 'wrap', alignItems: 'center' }}>
          <Chip
            size='small'
            icon={<PublicRoundedIcon sx={{ '&&': { fontSize: 16 } }} />}
            label={countryName ?? 'Country'}
            variant='outlined'
            sx={{ fontWeight: 500, borderColor: 'divider' }}
          />
        </Stack>
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
          View host profile
        </Button>
      </CardActions>
      {isAdmin && (
        <Menu
          id='host-card-menu'
          anchorEl={menuAnchor}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          slotProps={{
            list: { dense: true, 'aria-labelledby': 'host-card-menu' },
          }}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              onEdit?.(host);
            }}
            disabled={!onEdit}
          >
            <ListItemIcon>
              <EditRoundedIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary='Edit host' />
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              onDelete?.(host);
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

export default HostCard;
