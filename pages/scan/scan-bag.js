import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import styles from './style.js';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ScanBag() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { name, price, imageUri, color, size } = route.params || {};

  const fetchRfidData = async () => {
    try {
      setError(null);
      const response = await axios.get('http://192.168.81.126:8080/api/rfid/retrieveTag');
      if (response.data) {
        console.log('RFID Data:', JSON.stringify(response.data));

        if (response.data.message === "RFID exists in Bag") {

          const itemToAdd = {
            id: name,
            name,
            price,
            imageUri,
            color,
            size,
            quantity: 1,
          };

            navigation.navigate('Bag', { item: itemToAdd });
          }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchRfidData, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Scanning for RFID...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Scan your Bag's Tag:</Text>
      <Image
        source={{ uri: imageUri || 'https://i.imgur.com/q6Hz5S2.png' }}
        style={styles.image}
      />
    </View>
  );
}