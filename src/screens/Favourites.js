import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import {
  saveMovies,
  setFavourites,
  setHiddens,
  setSearchResults,
} from '../redux/actions';
import { fetchMovies } from '../utils';
import MovieCard from '../components/MovieCard';

export default function Favourites({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { allMovies, favourites, connectionState } = state;

  const [keyword, setKeyword] = useState('');
  const buttonDisabled = keyword.length < 3;

  useEffect(() => {
    fetchMovies()
      .then((m) => dispatch(saveMovies(m)))
      .catch((err) => console.log(err));

    SecureStore.getItemAsync('favs')
      .then((res) => {
        if (!res) {
          SecureStore.setItemAsync('favs', JSON.stringify([]))
            .then((res) => res)
            .catch((err) => console.log(err));
        }
        if (res) {
          dispatch(setFavourites(JSON.parse(res)));
        }
      })
      .catch((err) => console.log(err));

    SecureStore.getItemAsync('hiddens')
      .then((res) => {
        if (!res) {
          SecureStore.setItemAsync('hiddens', JSON.stringify([]))
            .then((res) => res)
            .catch((err) => console.log(err));
        }
        if (res) {
          dispatch(setHiddens(JSON.parse(res)));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = async () => {
    const results = allMovies.filter((m) => {
      return m.title.toLowerCase().includes(keyword.toLowerCase());
    });
    dispatch(setSearchResults(results));
    navigation.navigate('Results');
  };

  return (
    <ScrollView style={styles.container}>
      {!connectionState.isConnected || !connectionState.isInternetReachable ? (
        <Text
          style={{
            textAlign: 'center',
            marginVertical: 20,
            fontSize: 25,
            fontWeight: 'bold',
          }}
        >
          Connection Lost
        </Text>
      ) : null}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="For Example: Spirited Away"
          onChangeText={setKeyword}
          value={keyword}
        />
        <TouchableOpacity
          style={[styles.search, { opacity: buttonDisabled ? 0.5 : 1 }]}
          onPress={handleSearch}
          disabled={buttonDisabled}
        >
          <Text>Search</Text>
        </TouchableOpacity>
      </View>

      {allMovies.map((m) => (
        <View key={m.id}>
          {favourites.includes(m.id) && <MovieCard movie={m} />}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 30,
  },
  input: {
    height: '100%',
    flex: 1,
    marginRight: 10,
  },
  inputContainer: {
    height: 45,
    borderWidth: 1,
    paddingLeft: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 20,
  },
  search: {
    width: 60,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
