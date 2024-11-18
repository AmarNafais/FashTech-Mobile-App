import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import styles from './style.js';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ScanBag() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation(); // For navigation
  const route = useRoute(); // For accessing passed parameters

  // Extract the item data passed from the Dashboard
  const { name, price, imageUri, color, size } = route.params || {};

  // Function to fetch RFID data
  const fetchRfidData = async () => {
    try {
      setError(null); // Reset error state
      const response = await axios.get('http://192.168.81.126:8080/api/rfid/retrieveTag'); // Adjust the URL as needed
      if (response.data) {
        console.log('RFID Data:', JSON.stringify(response.data));
        
        // Check if the message indicates that the RFID exists in the bag
        if (response.data.message === "RFID exists in Bag") {
          const itemToAdd = {
            id: name, // Use a unique identifier for the item
            name,
            price,
            imageUri,
            color,
            size,
            quantity: 1, // Set initial quantity to 1
          };

          // Navigate to ShoppingBag and pass only the necessary data
          navigation.navigate('Bag', { item: itemToAdd });
        }
      }
    } catch (err) {
      setError("Failed to fetch RFID data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchRfidData, 3000); // Start polling for RFID data every 3 seconds

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only on mount

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