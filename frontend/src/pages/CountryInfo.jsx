import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import PopulationChart from '../components/PopulationChart'; 
import '../styles/CountryInfo.css';

const CountryInfo = () => {
  const { countryCode } = useParams(); 
  const [countryInfo, setCountryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]); 

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/countries`);
        setCountries(response.data); 
      } catch (err) {
        console.error('Error fetching countries:', err);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/countries/${countryCode}`);
        setCountryInfo(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch country details');
        setLoading(false);
      }
    };

    if (countryCode) {
      fetchCountryInfo();
    }
  }, [countryCode]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const { countryName, borders, populationCounts, flag } = countryInfo;

  return (
    <div>
      <h2>{countryName}</h2>
      
      <div className="flag-container">
        <img className="flag-image" src={flag} alt={countryName} />
      </div>
      
      <h3>Border Countries:</h3>
      <ul>
        {borders.map((borderName) => {
          const borderCountry = countries.find((c) => c.name === borderName);

          if (borderCountry) {
            return (
              <li key={borderCountry.countryCode}>
                <Link to={`/country/${borderCountry.countryCode}`}>
                  {borderCountry.name}
                </Link>
              </li>
            );
          } else {
            return <li key={borderName}>{borderName} (No code available)</li>;
          }
        })}
      </ul>

      <h3>Population over time:</h3>
      <PopulationChart data={populationCounts} />
    </div>
  );
};

export default CountryInfo;
