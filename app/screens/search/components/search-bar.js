import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  RefreshControl,
  Button,
  StyleSheet,
} from 'react-native';

export const SearchBar = ({search, onSearchChange, onSearchSubmit}) => {
  return (
    <View style={SearchBarStyle.BASE}>
      <TextInput
        style={SearchBarStyle.INPUT}
        placeholder="Search Place"
        value={search}
        onChangeText={onSearchChange}
      />
      <Button
        style={SearchBarStyle.BUTTON}
        title="Search"
        onPress={onSearchSubmit}
      />
    </View>
  );
};

const SearchBarStyle = StyleSheet.create({
  BASE: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  INPUT: {
    borderWidth: 1,
    flexGrow: 1,
  },
  BUTTON: {},
});
