import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/countries`);
        setCountries(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch countries');
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Available Countries</h2>
      <ul>
        {countries.map((country) => (
          <li key={country.countryCode}>
            <Link to={`/country/${country.countryCode}`}> 
              {country.name} ({country.countryCode})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
