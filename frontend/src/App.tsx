import { BrowserRouter, Route, Routes } from 'react-router';
import ProtectedRoute from './ui/components/routing/ProtectedRoute';
import Layout from './ui/components/layout/Layout/Layout';
import HomePage from './ui/pages/HomePage/HomePage';
import AccommodationsPage from './ui/pages/AccommodationsPage/AccommodationsPage';
import AccommodationDetailsPage from './ui/pages/AccommodationsPage/AccommodationDetailsPage';
import AccommodationEventsPage from './ui/pages/AccommodationsPage/AccommodationEventsPage';
import HostDetailsPage from './ui/pages/HostDetailsPage/HostDetailsPage';
import CountryDetailsPage from './ui/pages/CountryDetailsPage/CountryDetailsPage';
import HostsPage from './ui/pages/HostsPage/HostsPage';
import CountriesPage from './ui/pages/CountriesPage/CountriesPage';
import LoginPage from './ui/pages/AuthPage/LoginPage';
import RegisterPage from './ui/pages/AuthPage/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='accommodations'>
              <Route index element={<AccommodationsPage />} />
              <Route path=':id' element={<AccommodationDetailsPage />} />
              <Route path='activity' element={<AccommodationEventsPage />} />
            </Route>
          </Route>
          <Route path='hosts'>
            <Route index element={<HostsPage />} />
            <Route path=':id' element={<HostDetailsPage />} />
          </Route>
          <Route path='countries'>
            <Route index element={<CountriesPage />} />
            <Route path=':id' element={<CountryDetailsPage />} />
          </Route>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
