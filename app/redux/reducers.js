import {GET_WEATHER} from './actions';

const initState = {
  placeName: '',
  weather: [],
};

function WeatherReducers(state = initState, action) {
  switch (action.type) {
    case GET_WEATHER:
      return {...state, weather: action.payload};
    default:
      return state;
  }
}

export default WeatherReducers;
