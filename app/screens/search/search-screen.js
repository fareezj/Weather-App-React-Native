import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SearchBar} from './components/search-bar';
import {useSelector, useDispatch} from 'react-redux';
import {getSearchWeatherApi} from '../../redux/actions';
import {SearchStyle} from './search.style';
import {useIsFocused} from '@react-navigation/native';
import {backgroundColourSwitcher} from '../home/home-screen';

export const SearchScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const {weather} = useSelector(state => state.WeatherReducers);
  const dispatch = useDispatch();
  const [searchPlace, setSearchPlace] = useState('');

  useEffect(() => {
    if (isFocused) {
      setSearchPlace('');
      console.log('Fare', weather);
    }
  }, []);

  return (
    <View style={SearchStyle.BASE_SCREEN}>
      <View style={SearchStyle.SEARCH_BAR}>
        <SearchBar
          search={searchPlace}
          onSearchChange={setSearchPlace}
          onSearchSubmit={() => {
            dispatch(getSearchWeatherApi(searchPlace));
          }}
        />
      </View>
      {!!weather?.name ? (
        <TouchableOpacity
          style={{
            backgroundColor: backgroundColourSwitcher(
              weather?.weather[0]?.icon,
            ),
            ...SearchStyle.RESULT_LIST,
          }}
          onPress={() => navigation.navigate('Home', {key: 'Searched'})}>
          <Text style={SearchStyle.RESULT_TEXT}>{weather?.name}</Text>
          <Image
            style={SearchStyle.WEATHER_ICON}
            source={{
              uri: `https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`,
            }}
          />
        </TouchableOpacity>
      ) : (
        <View style={{paddingVertical: 20, ...SearchStyle.RESULT_LIST}}>
          <Text style={SearchStyle.RESULT_TEXT}>No result found :(</Text>
        </View>
      )}
    </View>
  );
};
