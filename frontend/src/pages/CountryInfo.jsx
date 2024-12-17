import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import PopulationChart from '../components/PopulationChart'; // Importamos el componente para el gráfico
import '../styles/CountryInfo.css';

const CountryInfo = () => {
  const { countryCode } = useParams(); // Obtenemos el countryCode de la URL
  const [countryInfo, setCountryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]); // Para almacenar todos los países

  // Cargar la lista completa de países
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/countries`);
        setCountries(response.data); // Guardamos la lista de países
      } catch (err) {
        console.error('Error fetching countries:', err);
      }
    };

    fetchCountries();
  }, []);

  // Obtener la información del país seleccionado
  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/countries/${countryCode}`);
        setCountryInfo(response.data); // Guardamos la respuesta del país
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

  // Desestructuramos los valores de countryInfo que necesitamos
  const { countryName, borders, populationCounts, flag } = countryInfo;

  return (
    <div>
      <h2>{countryName}</h2>
      
      {/* Contenedor para la bandera */}
      <div className="flag-container">
        <img className="flag-image" src={flag} alt={countryName} />
      </div>
      
      <h3>Border Countries:</h3>
      <ul>
        {borders.map((borderName) => {
          // Buscar el countryCode usando el nombre del país fronterizo
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
            // Si no se encuentra el país en la lista, mostramos un mensaje o nada
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
