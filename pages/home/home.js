import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style.js'; // Importing the styles

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Scan your RFID tag</Text>
      <Image
        source={{ uri: 'https://i.imgur.com/m9D1CCt.jpeg' }} // Using a placeholder image
        style={styles.image}
      />
    </View>
  );
}