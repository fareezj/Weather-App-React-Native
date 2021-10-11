import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import useResults from '../../hooks/useResults';
import {HomeStyle} from './home.style';
import {useSelector, useDispatch} from 'react-redux';
import {useLayoutEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';

export const HomeScreen = ({navigation, route}) => {
  const {weather} = useSelector(state => state.WeatherReducers);
  const [
    getCurrentLocation,
    results,
    errorMessage,
    latitude,
    longitude,
    getWeatherApi,
  ] = useResults();
  const [refreshing, setRefreshing] = useState(false);
  const [drivingRes, setDrivingRes] = useState();
  const [currentState, setCurrentState] = useState('CURRENT_LOCATION');
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Weather App',
      headerTitleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: 'white',
      },
      headerLeft: headerIcon(
        navigation,
        require('../../assets/location.png'),
        'currentLocation',
      ),
      headerRight: headerIcon(
        navigation,
        require('../../assets/search.png'),
        'search',
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (isFocused) {
      if (route?.params) {
        if (route?.params.key === 'Searched') {
          setDrivingRes(weather);
        }
      }
      if (currentState === 'CURRENT_LOCATION') {
        setDrivingRes(results);
      }
    }
  }, [route, results, currentState]);

  const headerIcon = (navigation, imagePath, key) => () => {
    const navRole = key => {
      if (key === 'search') {
        navigation.navigate('Search');
        setCurrentState('SEARCH_WEATHER');
      } else {
        console.log('hello');
        setCurrentState('CURRENT_LOCATION');
        getWeatherApi(latitude, longitude);
      }
    };
    return (
      <View>
        <TouchableOpacity onPress={() => navRole(key)}>
          <Image source={imagePath} style={HomeStyle.LOCATION_ICON} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: backgroundColourSwitcher(
          drivingRes?.weather ? drivingRes?.weather[0]?.icon : '00',
        ),
      }}>
      <ScrollView style={{height: '100%'}}>
        <View style={{paddingTop: 20}}>
          <Text style={HomeStyle.LOCATION_NAME} numberOfLines={1}>
            {drivingRes?.name}
          </Text>
        </View>
        {!!drivingRes?.weather ? (
          <>
            <View style={{alignItems: 'center', paddingTop: 30}}>
              <Image
                style={HomeStyle.WEATHER_ICON}
                source={{
                  uri: `https://openweathermap.org/img/wn/${drivingRes?.weather[0]?.icon}@2x.png`,
                }}
              />
            </View>
            <View style={{paddingTop: 40}}>
              <Text style={HomeStyle.TEMPERATURE_TEXT}>
                {drivingRes?.main?.temp} °C
              </Text>
            </View>
            <View style={{paddingTop: 50}}>
              <Text style={HomeStyle.MAIN_TEXT}>
                {drivingRes?.weather[0]?.description
                  ? drivingRes?.weather[0]?.description
                  : ''}
              </Text>
            </View>
          </>
        ) : null}
        <View style={{paddingTop: 10}}>
          <Text style={HomeStyle.MAIN_TEXT}>
            Feels Like: {drivingRes?.main?.feels_like} °C
          </Text>
        </View>
        <View style={{marginVertical: 20}} />
        <View style={HomeStyle.WEATHER_TABLE}>
          <WeatherColumn
            title={'Min Temp'}
            data={drivingRes?.main?.temp_min + ' °C'}
          />
          <View style={{marginHorizontal: 30}} />
          <WeatherColumn
            title={'Max Temp'}
            data={drivingRes?.main?.temp_max + ' °C'}
          />
        </View>
        <View style={HomeStyle.WEATHER_TABLE}>
          <WeatherColumn
            title={'Pressure'}
            data={drivingRes?.main?.pressure + ' psi'}
          />
          <View style={{marginHorizontal: 30}} />
          <WeatherColumn
            title={'Humidity'}
            data={drivingRes?.main?.humidity + ' g.m-3'}
          />
        </View>
        <View style={HomeStyle.WEATHER_TABLE}>
          <WeatherColumn
            title={'Wind Speed'}
            data={drivingRes?.wind?.speed + ' m/s'}
          />
          <View style={{marginHorizontal: 30}} />
          <WeatherColumn
            title={'Wind Degree'}
            data={drivingRes?.wind?.deg + ' deg'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const WeatherColumn = ({title, data}) => {
  return (
    <View style={HomeStyle.WEATHER_COLUMN}>
      <Text style={HomeStyle.WEATHER_TITLE}>{title}</Text>
      <Text style={HomeStyle.WEATHER_DATA}>{data}</Text>
    </View>
  );
};

export const backgroundColourSwitcher = id => {
  switch (id) {
    case '01d':
    case '01n':
      return '#6ACDEB';
    case '02d':
    case '02n':
      return '#FE9D94';
    case '03d':
    case '03n':
      return '#FAEEC6';
    case '04d':
    case '04n':
      return '#89E7E6';
    case '09d':
    case '09n':
      return '#F67656';
    case '10d':
    case '10n':
      return '#61C084';
    case '11d':
    case '11n':
      return '#E4E184';
    case '13d':
    case '13n':
      return '#FEC8D8';
    case '50d':
    case '50n':
      return '#E0BBE4';
    default:
      return 'blue';
  }
};
