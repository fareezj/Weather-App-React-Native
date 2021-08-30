import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {SearchBar} from './components/search-bar';
import {useSelector, useDispatch} from 'react-redux';
import {getSearchWeatherApi} from '../../redux/actions';
import {SearchStyle} from './search.style';

export const SearchScreen = ({navigation}) => {
  const {weather} = useSelector(state => state.WeatherReducers);
  const dispatch = useDispatch();
  const [searchPlace, setSearchPlace] = useState('');

  return (
    <View>
      <SearchBar
        search={searchPlace}
        onSearchChange={setSearchPlace}
        onSearchSubmit={() => {
          dispatch(getSearchWeatherApi(searchPlace));
        }}
      />
      {!!weather?.name ? (
        <View style={SearchStyle.RESULT_LIST}>
          <Text>Found result: </Text>
          <Text onPress={() => navigation.navigate('Home', {key: 'Searched'})}>
            {weather?.name}
          </Text>
        </View>
      ) : (
        <View style={SearchStyle.RESULT_LIST}>
          <Text>No result found</Text>
        </View>
      )}
    </View>
  );
};
