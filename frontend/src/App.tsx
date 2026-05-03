import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './ui/components/layout/Layout/Layout';
import HomePage from './ui/pages/HomePage/HomePage';
import AccommodationsPage from './ui/pages/AccommodationsPage/AccommodationsPage';
import AccommodationDetailsPage from './ui/pages/AccommodationsPage/AccommodationDetailsPage';

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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
