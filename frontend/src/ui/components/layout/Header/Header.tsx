import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router';

const navItems: { label: string; to: string }[] = [
  { label: 'Home', to: '/' },
  { label: 'Stays', to: '/accommodations' },
];

const Header = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'left', pt: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pb: 1 }}>
        <Typography variant='h6' component='span' sx={{ fontWeight: 700, color: 'primary.main' }}>
          Staybook
        </Typography>
        <IconButton aria-label='close menu'>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.to}
              selected={isActive(item.to)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': { bgcolor: 'primary.dark' },
                },
              }}
            >
              <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position='sticky'
      color='default'
      elevation={0}
      sx={{
        borderBottom: 2,
        borderColor: 'secondary.light',
        bgcolor: (t) => t.palette.background.paper,
        boxShadow: '0 12px 40px rgba(28, 45, 65, 0.06)',
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar disableGutters sx={{ minHeight: { xs: 56, sm: 64 }, gap: 2 }}>
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
            <TravelExploreRoundedIcon sx={{ fontSize: 34, color: 'secondary.dark' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.2 }}>
              <Typography variant='h6' component='span' sx={{ fontWeight: 700, letterSpacing: '-0.03em' }}>
                Staybook
              </Typography>
              <Typography variant='caption' color='text.secondary' sx={{ display: { xs: 'none', sm: 'block' } }}>
                Curated places to stay
              </Typography>
            </Box>
          </Box>

          {isMdUp ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {navItems.map((item) => (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  color={isActive(item.to) ? 'primary' : 'inherit'}
                  variant={isActive(item.to) ? 'contained' : 'text'}
                  sx={{ px: 2 }}
                >
                  {item.label}
                </Button>
              ))}
              <Button variant='outlined' color='secondary' sx={{ ml: 1, borderWidth: 2 }}>
                Sign in
              </Button>
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
