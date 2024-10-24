import React from 'react';
import { View, Image } from 'react-native';
import styles from './style.js';

export default function ImageLoader({ imageUri }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
    </View>
  );
}