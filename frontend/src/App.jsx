import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryList from './pages/CountryList';
import CountryInfo from './pages/CountryInfo'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryList />} /> 
        <Route path="/country/:countryCode" element={<CountryInfo />} /> 
      </Routes>
    </Router>
  );
};

export default App;

