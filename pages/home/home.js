import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import styles from './style.js';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [rfidData, setRfidData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previousRfidData, setPreviousRfidData] = useState(null); // State to store previous RFID data
  const navigation = useNavigation(); // For navigation

  // Function to fetch RFID data
  const fetchRfidData = async () => {
    try {
      setError(null); // Reset error state
      const response = await axios.get('http://192.168.81.126:8080/api/rfid/retrieveTag'); // Adjust the URL as needed
      if (response.data && response.data.message === "RFID exists in Pieces") {
        setRfidData(response.data);
      }
      // Log response data for debugging
      console.log('RFID Data:', JSON.stringify(response.data));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchRfidData, 3000); // Start polling for RFID data every 3 seconds

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only on mount

  useEffect(() => {
    // Compare new RFID data with previous data
    if (rfidData && rfidData.data) {
      const currentData = rfidData.data;

      // Check if the new data is different from the previous data
      if (JSON.stringify(currentData) !== JSON.stringify(previousRfidData)) {
        const variantData = currentData.variantData;
        const itemData = currentData.itemData;

        const dashboardData = {
          color: variantData.ColorName,
          size: variantData.SizeLabel,
          imageUri: variantData.ImageUrl,
          stockQuantity: variantData.StockQuantity,
          name: itemData.Name,
          description: itemData.Description,
          price: itemData.Price,
          material: itemData.Material,
          type: itemData.Type,
        };

        // Navigate to Dashboard and pass data
        navigation.navigate('Dashboard', dashboardData);
        setPreviousRfidData(currentData); // Update previous data after navigation
      }
    }
  }, [rfidData]); // Trigger when rfidData changes

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
      <Text style={styles.text}>Scan the RFID tag...</Text>
      <Image
        source={{ uri: 'https://i.imgur.com/q6Hz5S2.png' }}
        style={styles.image}
      />
    </View>
  );
}