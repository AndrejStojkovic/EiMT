import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './ui/components/layout/Layout/Layout';
import HomePage from './ui/pages/HomePage/HomePage';
import AccommodationsPage from './ui/pages/AccommodationsPage/AccommodationsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path='/accommodations' element={<Layout />}>
          <Route index element={<AccommodationsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
