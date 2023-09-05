import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Product from './Pages/Product';
import Pricing from './Pages/Pricing';
import Homepage from './Pages/Homepage';
import PageNotFound from './Pages/PageNotFound';
import Login from './Pages/Login';
import AppLayout from './Pages/AppLayout';
import Test from './Pages/Test';
import CityList from './Components/CityList';
import CountryList from './Components/CountryList';

const BASE_URL = 'http://localhost:9000';

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        alert('There is an error fetching data from backend. Try again later.');
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="test" element={<Test />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
