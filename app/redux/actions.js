import axios from 'axios';

export const GET_WEATHER = 'GET_WEATHER';

const apiKey = 'db8ba431e6d1a0c3b20197d305a6b4c7';
export const getSearchWeatherApi = searchPlace => {
  try {
    return async dispatch => {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchPlace}&units=metric&appid=${apiKey}`,
        )
        .then(res => {
          if (res?.data) {
            dispatch({
              type: GET_WEATHER,
              payload: res.data,
            });
          }
        })
        .catch(err => {
          dispatch({
            type: GET_WEATHER,
            payload: 'Place not found',
          });
        });
    };
  } catch (error) {
    console.log(error.response.data);
  }
};
