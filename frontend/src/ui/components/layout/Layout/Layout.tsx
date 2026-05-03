import { alpha, Box, Container } from '@mui/material';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
        backgroundImage: (t) =>
          `radial-gradient(circle at 10% 20%, ${alpha(t.palette.primary.light, 0.16)} 0%, transparent 28%), radial-gradient(circle at 92% 15%, ${alpha(t.palette.secondary.main, 0.12)} 0%, transparent 24%), linear-gradient(180deg, ${t.palette.background.default} 0%, #eef4ff 100%)`,
      }}
    >
      <Header />
      <Box
        component='main'
        className='app-main'
        sx={{
          flex: '1 1 auto',
          width: '100%',
          py: { xs: 3, sm: 4 },
        }}
      >
        <Container maxWidth='lg' sx={{ px: { xs: 2, sm: 3 }, position: 'relative', zIndex: 1 }}>
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
