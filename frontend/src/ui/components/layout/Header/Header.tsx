import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router';
import { useAuth } from '../../../../hooks/useAuth';

interface NavItem {
  label: string;
  to: string;
  needsAuth: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', to: '/', needsAuth: false },
  { label: 'Stays', to: '/accommodations' , needsAuth: true},
];

const Header = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const location = useLocation();
  const { user, isLoggedIn, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isUserLoggedIn = (item: NavItem) => item != null && (!item.needsAuth || isLoggedIn);

  const handleDrawerToggle = () => {
    setMobileOpen((open) => !open);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'left', pt: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pb: 1 }}>
        <Typography variant='h6' component='span' sx={{ fontWeight: 700, color: 'primary.main' }}>
          Staybook
        </Typography>
        <IconButton aria-label='close menu'>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ px: 1, py: 1 }}>
        {navItems.map((item) => isUserLoggedIn(item) && (
          <ListItem key={item.to} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.to}
              selected={isActive(item.to)}
              sx={{
                borderRadius: 1.25,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: (t) => t.palette.action.selected,
                  color: 'primary.main',
                  '&:hover': { bgcolor: (t) => t.palette.action.selected },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}>
                <TravelExploreRoundedIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        {isLoggedIn ? (
          <ListItem disablePadding>
            <ListItemButton
              onClick={logout}
              sx={{
                borderRadius: 1.25,
                color: 'error.main',
              }}
            >
              <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}>
                <LogoutRoundedIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary='Sign out' slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
            </ListItemButton>
          </ListItem>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to='/login' sx={{ borderRadius: 1.25 }}>
                <ListItemText primary='Login' slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to='/register' sx={{ borderRadius: 1.25 }}>
                <ListItemText primary='Register' slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar
      position='sticky'
      color='default'
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: (t) => alpha(t.palette.background.paper, 0.88),
        boxShadow: '0 8px 30px rgba(15, 23, 42, 0.08)',
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, sm: 72 }, gap: 2 }}>
          <Box
            component={RouterLink}
            to='/'
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'text.primary',
              textDecoration: 'none',
              mr: 'auto',
            }}
          >
            <Paper
              elevation={0}
              sx={{
                width: 42,
                height: 42,
                borderRadius: 1.25,
                display: 'grid',
                placeItems: 'center',
                bgcolor: (t) => alpha(t.palette.primary.main, 0.12),
                color: 'primary.main',
              }}
            >
              <TravelExploreRoundedIcon sx={{ fontSize: 24 }} />
            </Paper>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                lineHeight: 1,
                gap: 0.15,
              }}
            >
              <Typography
                variant='h6'
                component='span'
                sx={{ fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}
              >
                Staybook
              </Typography>
              <Typography
                variant='caption'
                color='text.secondary'
                sx={{ display: { xs: 'none', sm: 'block' }, lineHeight: 1.1 }}
              >
                Book smarter, travel easier
              </Typography>
            </Box>
          </Box>

          {isMdUp ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => isUserLoggedIn(item) && (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  color={isActive(item.to) ? 'primary' : 'inherit'}
                  variant={isActive(item.to) ? 'contained' : 'text'}
                  sx={{
                    px: 2,
                    ...(isActive(item.to)
                      ? {}
                      : { color: 'text.secondary', '&:hover': { color: 'text.primary' } }),
                  }}
                >
                  {item.label}
                </Button>
              ))}
              {isLoggedIn ? (
                <>
                  <Chip
                    label={user?.username ?? 'Logged in'}
                    color='secondary'
                    variant='outlined'
                    sx={{ ml: 0.5, fontWeight: 700 }}
                  />
                  <Button
                    onClick={logout}
                    variant='contained'
                    color='secondary'
                    startIcon={<LogoutRoundedIcon />}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button component={RouterLink} to='/login' variant='outlined' sx={{ ml: 0.5 }}>
                    Login
                  </Button>
                  <Button component={RouterLink} to='/register' variant='contained' color='secondary'>
                    Register
                  </Button>
                </>
              )}
            </Box>
          ) : (
            <IconButton
              color='inherit'
              aria-label='open menu'
              edge='end'
              onClick={handleDrawerToggle}
            >
              <MenuRoundedIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
      <Drawer
        variant='temporary'
        anchor='right'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
