import './App.css';
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
          <Route path='/accommodations' element={<AccommodationsPage />} />
          <Route path='/accommodation/:id' element={<AccommodationDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
