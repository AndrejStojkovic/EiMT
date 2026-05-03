import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './ui/components/layout/Layout/Layout';
import HomePage from './ui/pages/HomePage/HomePage';
import AccommodationsPage from './ui/pages/AccommodationsPage/AccommodationsPage';
import AccommodationDetailsPage from './ui/pages/AccommodationsPage/AccommodationDetailsPage';
import HostDetailsPage from './ui/pages/HostDetailsPage/HostDetailsPage';
import CountryDetailsPage from './ui/pages/CountryDetailsPage/CountryDetailsPage';
import HostsPage from './ui/pages/HostsPage/HostsPage';
import CountriesPage from './ui/pages/CountriesPage/CountriesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='accommodations'>
            <Route index element={<AccommodationsPage />} />
            <Route path=':id' element={<AccommodationDetailsPage />} />
          </Route>
          <Route path='hosts'>
            <Route index element={<HostsPage />} />
            <Route path=':id' element={<HostDetailsPage />} />
          </Route>
          <Route path='countries'>
            <Route index element={<CountriesPage />} />
            <Route path=':id' element={<CountryDetailsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
