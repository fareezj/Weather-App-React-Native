import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  RefreshControl,
} from 'react-native';
import useResults from '../../hooks/useResults';
import {HomeStyle} from './home.style';
import {useSelector, useDispatch} from 'react-redux';

export const HomeScreen = ({navigation, route}) => {
  const {weather} = useSelector(state => state.WeatherReducers);
  const [getCurrentLocation, results, errorMessage] = useResults();
  const [refreshing, setRefreshing] = useState(false);
  const [drivingRes, setDrivingRes] = useState();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (route?.params) {
      if (route?.params.key === 'Searched') {
        setDrivingRes(weather);
      }
    } else {
      setDrivingRes(results);
    }
  }, [route, results]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: backgroundColourSwitcher(
          drivingRes?.weather ? drivingRes?.weather[0]?.icon : '00',
        ),
      }}>
      <ScrollView style={{height: '100%'}}>
        <Text onPress={() => navigation.navigate('Search')}>Search</Text>
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
                {drivingRes?.main?.temp} C
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
            Feels Like: {drivingRes?.main?.feels_like} C
          </Text>
        </View>
        <View style={{marginVertical: 40}} />
        <View style={HomeStyle.WEATHER_TABLE}>
          <WeatherColumn title={'Min Temp'} data={drivingRes?.main?.temp_min} />
          <View style={{marginHorizontal: 30}} />
          <WeatherColumn title={'Max Temp'} data={drivingRes?.main?.temp_max} />
        </View>
        <View style={HomeStyle.WEATHER_TABLE}>
          <WeatherColumn title={'Pressure'} data={drivingRes?.main?.pressure} />
          <View style={{marginHorizontal: 30}} />
          <WeatherColumn title={'Humidity'} data={drivingRes?.main?.humidity} />
        </View>
        <View style={HomeStyle.WEATHER_TABLE}>
          <WeatherColumn title={'Wind Speed'} data={drivingRes?.wind?.speed} />
          <View style={{marginHorizontal: 30}} />
          <WeatherColumn title={'Wind Degree'} data={drivingRes?.wind?.deg} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const backgroundColourSwitcher = id => {
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

const WeatherColumn = ({title, data}) => {
  return (
    <View style={HomeStyle.WEATHER_COLUMN}>
      <Text style={HomeStyle.WEATHER_TITLE}>{title}</Text>
      <Text style={HomeStyle.WEATHER_DATA}>{data}</Text>
    </View>
  );
};
