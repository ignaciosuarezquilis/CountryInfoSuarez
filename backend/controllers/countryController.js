const axios = require('axios');

const getAvailableCountries = async (req, res) => {
  try {
    const response = await axios.get(process.env.NAGER_API_URL + '/AvailableCountries');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching countries', error: error.message });
  }
};

const getCountryInfo = async (req, res) => {
    const { countryCode } = req.params;
    
    console.log("Entré a getCountryInfo para el país:", countryCode);
    
    try {
      const bordersResponse = await axios.get(`${process.env.NAGER_API_URL}/CountryInfo/${countryCode}`);

      const countryName = bordersResponse.data.commonName;
      const borderCountries = bordersResponse.data.borders.map(border => border.commonName);

      
      const populationResponse = await axios.get(`${process.env.COUNTRIESNOW_API_URL}/population`);
      const populationData = populationResponse.data.data.find(country => country.country === countryName);
      const populationCounts = populationData ? populationData.populationCounts : []; 
  
      const flagResponse = await axios.get(`${process.env.COUNTRIESNOW_API_URL}/flag/images`);
      
      const flagData = flagResponse.data.data.find(flag => flag.name === countryName);
      const flag = flagData ? flagData.flag : ''; 

      console.log({
        countryName,
        borders: borderCountries,
        populationCounts,
        flag,
      });
      
      if (bordersResponse.data && populationResponse.data.data && flagResponse.data.data) {
        res.json({
            countryName,
            borders: borderCountries,
            populationCounts,
            flag,
        });
      } else {
        res.status(400).json({ message: 'Incomplete data received from APIs' });
      }
  
    } catch (error) {
      console.log('Error:', error); // Loguear el error para depuración
      res.status(500).json({ message: 'Error fetching country info', error: error.message });
    }
  };
  
  

module.exports = { getAvailableCountries, getCountryInfo };
