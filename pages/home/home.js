import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import styles from './style.js';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [rfidData, setRfidData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDataReceived, setIsDataReceived] = useState(false); // Flag to check if data is received
  const navigation = useNavigation(); // For navigation

  // Function to fetch RFID data
  const fetchRfidData = async () => {
    try {
      setError(null); // Reset error state
      const response = await axios.get('http://192.168.1.41:8080/api/rfid/retrieveTag'); // Adjust the URL as needed
      if (response.data) {
        setRfidData(response.data);
        setIsDataReceived(true); // Set flag to true once data is received
      }
      // Log response data for debugging
      console.log('RFID Data:', JSON.stringify(response.data));
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Poll for RFID data only if it's not received yet
    if (!isDataReceived) {
      const interval = setInterval(fetchRfidData, 3000); // Adjust the interval as necessary

      // Clear the interval once the data is received
      return () => clearInterval(interval);
    }
  }, [isDataReceived]); // Only trigger polling when isDataReceived is false

  useEffect(() => {
    if (rfidData && rfidData.data) {
      const variantData = rfidData.data.variantData;
      const itemData = rfidData.data.itemData;

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
      {!isDataReceived ? (
        <>
          <Text style={styles.text}>Scan the RFID tag...</Text>
          <Image
            source={{ uri: 'https://i.imgur.com/m9D1CCt.jpeg' }}
            style={styles.image}
          />
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
}
