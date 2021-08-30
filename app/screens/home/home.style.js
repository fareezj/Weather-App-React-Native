import {StyleSheet} from 'react-native';

export const HomeStyle = StyleSheet.create({
  MAIN_TEXT: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  WEATHER_TABLE: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 10,
    marginHorizontal: 50,
    borderWidth: 1,
  },
  WEATHER_COLUMN: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  WEATHER_ICON: {
    width: 100,
    height: 100,
  },
});
