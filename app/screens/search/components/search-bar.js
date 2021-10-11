import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

export const SearchBar = ({search, onSearchChange, onSearchSubmit}) => {
  return (
    <View style={SearchBarStyle.BASE}>
      <Text style={SearchBarStyle.TITLE}>Search Location</Text>
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
    paddingHorizontal: 20,
    alignContent: 'center',
  },
  TITLE: {
    fontSize: 22,
    textAlign: 'center',
  },
  INPUT: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 10,
  },
  BUTTON: {},
});
