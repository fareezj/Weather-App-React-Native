import {useState, useEffect} from 'react';
import axios from 'axios';

const apiKey = 'db8ba431e6d1a0c3b20197d305a6b4c7';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const getSearchWeatherApi = async searchPlace => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchPlace}&units=metric&appid=${apiKey}`,
      )
      .then(res => {
        if (res !== null) {
          setResults(res.data);
          console.log('res data search', res.data);
        }
      })
      .catch(err => {
        setErrorMessage(err);
      });
  };

  return [getSearchWeatherApi, results, errorMessage];
};
