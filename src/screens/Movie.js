import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function Movie() {
  const current = useSelector((state) => state.current);
  const { description, title, rt_score, movie_banner } = current;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: movie_banner }}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />
      <Text style={{ marginBottom: 20 }}>Title: {title}</Text>
      <Text style={{ marginBottom: 20 }}>Description: {description}</Text>
      <Text style={{ marginBottom: 20 }}>
        Rotten Tomatoes Score: {rt_score}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: 'center',
  },
});
