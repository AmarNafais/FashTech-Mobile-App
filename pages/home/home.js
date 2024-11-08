import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import styles from './style.js';
import axios from 'axios';

export default function Home() {
  const [rfidData, setRfidData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch RFID data
  const fetchRfidData = async () => {
    try {
      const response = await axios.get('http://192.168.8.155:8080/api/rfid/latest-scan'); // Adjust the URL as needed
      setRfidData(response.data);
    } catch (error) {
      console.error('Error fetching RFID data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRfidData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Scan your RFID tag</Text>
      {rfidData ? (
        <>
          <Text style={styles.text}>Result:</Text>
          <Text style={styles.text}>Message: {rfidData.message}</Text>
          <Text style={styles.text}>Type: {rfidData.type}</Text>
          <Text style={styles.text}>Data: {JSON.stringify(rfidData.data)}</Text>
        </>
      ) : (
        <Text style={styles.text}>No RFID data available</Text>
      )}
      <Image
        source={{ uri: 'https://i.imgur.com/m9D1CCt.jpeg' }}
        style={styles.image}
      />
    </View>
  );
}
