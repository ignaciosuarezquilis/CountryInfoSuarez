import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryList from './pages/CountryList';
import CountryInfo from './pages/CountryInfo';  // Importamos el componente de la página de detalles del país

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryList />} /> {/* Ruta para la lista de países */}
        <Route path="/country/:countryCode" element={<CountryInfo />} /> {/* Ruta para la página de detalles del país */}
      </Routes>
    </Router>
  );
};

export default App;

