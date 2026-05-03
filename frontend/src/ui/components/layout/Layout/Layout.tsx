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
          `linear-gradient(165deg, ${t.palette.background.default} 0%, ${alpha(t.palette.secondary.main, 0.06)} 38%, ${t.palette.background.default} 72%)`,
      }}
    >
      <Header />
      <Box
        component='main'
        className='app-main'
        sx={{
          flex: '1 1 auto',
          width: '100%',
          py: { xs: 2, sm: 3 },
        }}
      >
        <Container maxWidth='lg' sx={{ px: { xs: 2, sm: 3 } }}>
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
