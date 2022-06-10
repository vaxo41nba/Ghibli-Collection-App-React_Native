import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import MovieCard from '../components/MovieCard';

export default function Results() {
  const state = useSelector((state) => state);
  const { results, hiddens } = state;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {results.length ? (
        <>
          {results.map((r) => (
            <View key={r.id}>
              {!hiddens.includes(r.id) && <MovieCard movie={r} />}
            </View>
          ))}
        </>
      ) : (
        <Text style={styles.text}>No Search Results</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 30,
    flexGrow: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 22,
  },
});
