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

export const Home = () => {
  const [getCurrentLocation, results, errorMessage] = useResults();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    //getCurrentLocation();
  }, []);

  // const onRefresh = () => {
  //   getCurrentLocation();
  // };

  return (
    <SafeAreaView
      style={{
        backgroundColor: backgroundColourSwitcher(
          !!results.weather ? results?.weather[0]?.icon : '00',
        ),
      }}>
      <ScrollView style={{height: '100%'}}>
        <View style={{paddingTop: 20}}>
          <Text style={HomeStyle.LOCATION_NAME} numberOfLines={1}>
            {results?.name}
          </Text>
        </View>
        {!!results.weather ? (
          <>
            <View style={{alignItems: 'center', paddingTop: 30}}>
              <Image
                style={HomeStyle.WEATHER_ICON}
                source={{
                  uri: `https://openweathermap.org/img/wn/${results?.weather[0]?.icon}@2x.png`,
                }}
              />
            </View>
            <View style={{paddingTop: 40}}>
              <Text style={HomeStyle.TEMPERATURE_TEXT}>
                {results?.main?.temp} C
              </Text>
            </View>
            <View style={{paddingTop: 50}}>
              <Text style={HomeStyle.MAIN_TEXT}>
                {results?.weather[0]?.description
                  ? results?.weather[0]?.description
                  : ''}
              </Text>
            </View>
          </>
        ) : null}
        <View style={{paddingTop: 10}}>
          <Text style={HomeStyle.MAIN_TEXT}>
            Feels Like: {results?.main?.feels_like} C
          </Text>
        </View>
        <View style={{marginVertical: 40}} />
        <View style={HomeStyle.WEATHER_TABLE}>
          <WeatherColumn title={'Min Temp'} data={results?.main?.temp_min} />
          <View style={{marginHorizontal: 30}} />
          <WeatherColumn title={'Max Temp'} data={results?.main?.temp_max} />
        </View>
        <View style={HomeStyle.WEATHER_TABLE}>
          <WeatherColumn title={'Pressure'} data={results?.main?.pressure} />
          <View style={{marginHorizontal: 30}} />
          <WeatherColumn title={'Humidity'} data={results?.main?.humidity} />
        </View>
        <View style={HomeStyle.WEATHER_TABLE}>
          <WeatherColumn title={'Wind Speed'} data={results?.wind?.speed} />
          <View style={{marginHorizontal: 30}} />
          <WeatherColumn title={'Wind Degree'} data={results?.wind?.deg} />
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
