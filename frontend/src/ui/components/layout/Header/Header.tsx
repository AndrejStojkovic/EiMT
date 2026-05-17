import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {
  Avatar,
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Drawer,
  Fade,
  IconButton,
  ListItemIcon,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Toolbar,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { Link as RouterLink, useLocation } from 'react-router';
import { formatRole } from '../../../../helpers/formatRole';
import { useAuth } from '../../../../hooks/useAuth';

interface NavItem {
  label: string;
  to: string;
  needsAuth: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', to: '/', needsAuth: false },
  { label: 'Stays', to: '/accommodations' , needsAuth: true},
  { label: 'Hosts', to: '/hosts' , needsAuth: true},
  { label: 'Countries', to: '/countries' , needsAuth: true},
];

const Header = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const location = useLocation();
  const { user, isLoggedIn, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isProfilePopoverOpen, setIsProfilePopoverOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLElement | null>(null);
  const primaryRole = formatRole(user?.roles?.[0]);
  const displayRoles = user?.roles?.length ? user.roles : ['ROLE_USER'];

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

  const getRoleColor = (role: string): 'error' | 'success' | 'warning' | 'info' => {
    const normalizedRole = role.replace(/^ROLE_/, '').toUpperCase();

    if (normalizedRole === 'ADMINISTRATOR') {
      return 'error';
    }

    if (normalizedRole === 'USER') {
      return 'success';
    }

    return 'info';
  };

  const openProfilePopover = () => {
    setIsProfilePopoverOpen(true);
  };

  const closeProfilePopover = () => {
    setIsProfilePopoverOpen(false);
  };

  const handleTriggerMouseLeave = (event: ReactMouseEvent<HTMLDivElement>) => {
    const relatedTarget = event.relatedTarget as Element | null;

    if (relatedTarget?.closest('[data-profile-popover="true"]')) {
      return;
    }

    closeProfilePopover();
  };

  const handlePopoverMouseLeave = (event: ReactMouseEvent<HTMLDivElement>) => {
    const relatedTarget = event.relatedTarget as Element | null;

    if (relatedTarget?.closest('[data-profile-trigger="true"]')) {
      return;
    }

    closeProfilePopover();
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
        <Divider sx={{ mx: 2, my: 1 }} />
        {isLoggedIn ? (
          <>
            <ListItem sx={{ px: 1, py: 1 }}>
              <Paper
                elevation={0}
                sx={{
                  width: '100%',
                  px: 1.5,
                  py: 1.25,
                  borderRadius: 1.5,
                  border: 1,
                  borderColor: 'divider',
                  bgcolor: (t) => alpha(t.palette.primary.main, 0.05),
                }}
              >
                <Typography variant='body2' sx={{ fontWeight: 700 }}>
                  {user?.username ?? 'User'}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {primaryRole}
                </Typography>
              </Paper>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={logout}
                sx={{
                  borderRadius: 1.25,
                  color: 'error.main',
                  '&:hover': {
                    bgcolor: (t) => alpha(t.palette.error.main, 0.08),
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}>
                  <LogoutRoundedIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary='Log out' slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
              </ListItemButton>
            </ListItem>
          </>
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
                  <Box
                    onMouseLeave={handleTriggerMouseLeave}
                  >
                    <Box
                      data-profile-trigger='true'
                      onMouseEnter={(event) => {
                        setProfileAnchorEl(event.currentTarget);
                        openProfilePopover();
                      }}
                      sx={{
                        ml: 0.5,
                        pl: 0.5,
                        pr: 1.25,
                        py: 0.5,
                        borderRadius: 999,
                        border: 1,
                        borderColor: 'divider',
                        bgcolor: (t) => alpha(t.palette.primary.main, 0.06),
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        cursor: 'pointer',
                        transition: 'all 120ms ease',
                        '&:hover': {
                          borderColor: 'primary.light',
                          bgcolor: (t) => alpha(t.palette.primary.main, 0.12),
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 30,
                          height: 30,
                          bgcolor: (t) => alpha(t.palette.primary.main, 0.16),
                          color: 'primary.main',
                        }}
                      >
                        <PersonRoundedIcon sx={{ fontSize: 18 }} />
                      </Avatar>
                      <Box sx={{ lineHeight: 1.05 }}>
                        <Typography variant='body2' sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                          {user?.username ?? 'null'}
                        </Typography>
                      </Box>
                    </Box>
                  <Popper
                    open={isProfilePopoverOpen}
                    anchorEl={profileAnchorEl}
                    placement='bottom-end'
                    disablePortal
                    transition
                    modifiers={[{ name: 'offset', options: { offset: [0, 0] } }]}
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={{ enter: 180, exit: 140 }}>
                        <Paper
                          data-profile-popover='true'
                          elevation={0}
                          onMouseEnter={openProfilePopover}
                          onMouseLeave={handlePopoverMouseLeave}
                          sx={{
                            mt: 0.5,
                            p: 1.5,
                            width: 280,
                            borderRadius: 2,
                            border: 1,
                            borderColor: 'divider',
                            boxShadow: '0 14px 36px rgba(15, 23, 42, 0.12)',
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                bgcolor: (t) => alpha(t.palette.primary.main, 0.16),
                                color: 'primary.main',
                              }}
                            >
                              <PersonRoundedIcon sx={{ fontSize: 22 }} />
                            </Avatar>
                            <Box sx={{ lineHeight: 1.05 }}>
                              <Typography variant='body2' sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                                {user?.username ?? 'User'}
                              </Typography>
                              <Typography variant='caption' color='text.secondary' sx={{ display: 'block', lineHeight: 1.05 }}>
                                Profile
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1.5 }}>
                            {displayRoles.map((role) => (
                              <Chip
                                key={role}
                                size='small'
                                label={formatRole(role)}
                                color={getRoleColor(role)}
                                variant='filled'
                                sx={{ fontWeight: 700 }}
                              />
                            ))}
                          </Box>
                          <Button
                            onClick={logout}
                            fullWidth
                            variant='outlined'
                            startIcon={<LogoutRoundedIcon />}
                            sx={{
                              borderColor: (t) => alpha(t.palette.error.main, 0.35),
                              color: 'error.main',
                              '&:hover': {
                                borderColor: 'error.main',
                                bgcolor: (t) => alpha(t.palette.error.main, 0.08),
                              },
                            }}
                          >
                            Log out
                          </Button>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                  </Box>
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
