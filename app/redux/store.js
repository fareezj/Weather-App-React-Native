import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import WeatherReducers from './reducers';

const rootReducers = combineReducers({
  WeatherReducers,
});

export const store = createStore(rootReducers, applyMiddleware(thunk));
