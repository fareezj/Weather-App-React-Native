import {StyleSheet} from 'react-native';

export const SearchStyle = StyleSheet.create({
  BASE_SCREEN: {
    height: '100%',
    backgroundColor: 'white',
  },
  SEARCH_BAR: {
    justifyContent: 'center',
    flex: 0.4,
  },
  WEATHER_ICON: {
    width: 100,
    height: 100,
  },
  RESULT_TEXT: {
    fontSize: 20,
  },
  RESULT_LIST: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 20,
  },
});
