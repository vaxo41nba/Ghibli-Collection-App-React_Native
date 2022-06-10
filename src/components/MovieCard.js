import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import images from '../images';
import { setCurrentMovie, setFavourites, setHiddens } from '../redux/actions';

export default function MovieCard({ movie }) {
  const { description, title, rt_score, movie_banner, id } = movie;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { favourites, hiddens } = state;

  const [fav, setFav] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (favourites.includes(movie.id)) setFav(true);
    if (hiddens.includes(movie.id)) setHide(true);
  }, []);

  const navigateToMovie = () => {
    dispatch(setCurrentMovie(movie));
    navigation.navigate('Movie');
  };

  const toggleFavourites = async () => {
    let favs = await SecureStore.getItemAsync('favs');
    favs = JSON.parse(favs);
    if (!fav) {
      dispatch(setFavourites([...favourites, id]));
      await SecureStore.setItemAsync('favs', JSON.stringify([...favs, id]));
    }

    if (fav) {
      let filteredFavs = favs.filter((f) => f !== id);
      dispatch(setFavourites(filteredFavs));
      filteredFavs = JSON.stringify(filteredFavs);
      await SecureStore.setItemAsync('favs', filteredFavs);
    }

    setFav(!fav);
  };

  const toggleHiddens = async () => {
    let hiddens = await SecureStore.getItemAsync('hiddens');
    hiddens = JSON.parse(hiddens);
    if (!hide) {
      //   dispatch(setHiddens([...hiddens, id]));
      await SecureStore.setItemAsync(
        'hiddens',
        JSON.stringify([...hiddens, id])
      );
    }

    if (hide) {
      let filteredHiddens = hiddens.filter((f) => f !== id);
      dispatch(setHiddens(filteredHiddens));
      filteredHiddens = JSON.stringify(filteredHiddens);
      await SecureStore.setItemAsync('hiddens', filteredHiddens);
    }

    setHide(!hide);
  };

  return (
    <Pressable style={styles.container} onPress={navigateToMovie}>
      <Image source={{ uri: movie_banner }} style={styles.poster} />

      <View style={styles.justify}>
        <Text>Title: {title}</Text>
        <Text numberOfLines={3}>Description: {description}</Text>
        <Text>Rotten Tomatoe Score: {rt_score}</Text>
      </View>

      <View style={styles.icons}>
        <TouchableOpacity onPress={toggleFavourites}>
          <Image
            source={images[fav ? 'Check_Full' : 'Check_Empty']}
            style={{ width: 20, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleHiddens}>
          <Image
            source={images[!hide ? 'Hide' : 'Show']}
            style={{ width: 20, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    marginBottom: 15,
  },
  icons: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  justify: {
    justifyContent: 'space-evenly',
    flex: 1,
    marginHorizontal: 10,
  },
  poster: {
    height: '100%',
    width: 100,
  },
});
