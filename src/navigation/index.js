import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import * as Network from 'expo-network';

import FavouritesScreen from '../screens/Favourites';
import MovieScreen from '../screens/Movie';
import ResultsScreen from '../screens/Results';
import { setConnectionState } from '../redux/actions';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  const dispatch = useDispatch();

  Network.getNetworkStateAsync().then((res) =>
    dispatch(setConnectionState(res))
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ unmountOnBlur: true }}>
        <Stack.Screen name="Favourites" component={FavouritesScreen} />
        <Stack.Screen name="Movie" component={MovieScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
