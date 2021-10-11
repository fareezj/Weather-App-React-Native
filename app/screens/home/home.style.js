import {StyleSheet} from 'react-native';

export const HomeStyle = StyleSheet.create({
  LOCATION_NAME: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  LOCATION_ICON: {
    height: 30,
    width: 30,
  },
  HEADER_BASE: {
    alignItems: 'flex-end',
  },
  SEARCH_ICON: {
    height: 30,
    width: 30,
  },
  TEMPERATURE_TEXT: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  MAIN_TEXT: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  WEATHER_TABLE: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 20,
    paddingVertical: 23,
    marginHorizontal: 50,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  WEATHER_COLUMN: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  WEATHER_TITLE: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  WEATHER_DATA: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  WEATHER_ICON: {
    width: 120,
    height: 120,
  },
});
