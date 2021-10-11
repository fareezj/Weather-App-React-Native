import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

export const SearchBar = ({search, onSearchChange, onSearchSubmit}) => {
  return (
    <View style={SearchBarStyle.BASE}>
      <TextInput
        style={SearchBarStyle.INPUT}
        placeholder="Search Place"
        placeholderTextColor="black"
        value={search}
        onChangeText={onSearchChange}
      />
      <Button
        style={SearchBarStyle.BUTTON}
        title="Search"
        color="black"
        onPress={onSearchSubmit}
      />
    </View>
  );
};

const SearchBarStyle = StyleSheet.create({
  BASE: {
    marginHorizontal: 20,
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  INPUT: {
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    borderColor: 'black',
    paddingVertical: 10,
    flexGrow: 1,
    color: 'black',
  },
  BUTTON: {},
});
