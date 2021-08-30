import axios from 'axios';

const apiKey = 'db8ba431e6d1a0c3b20197d305a6b4c7';

export const WeatherAPI = () => {
  axios
    .post(
      `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`,
    )
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};
