import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useShoppingBag } from '../bag/bag-context';
import axios from 'axios';
import styles from './style';

export default function ShoppingBag() {
  const { items, removeItem, deleteItem } = useShoppingBag();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const addSampleItemToBackend = async () => {
    setLoading(true);
    try {
      const postData = {
        bagId: 1,
        pieceId: 1,
        quantity: 10,
      };

      await axios.post('http://192.168.81.126:8080/api/bag-items/', postData);
      console.log('Sample item added to backend:', postData);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to add sample item to bag");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    addSampleItemToBackend();
  }, []);

  const increaseQuantity = (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
    } else {
      removeItem(item.id);
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price || 0) * item.quantity, 0).toFixed(2);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Rs.{(item.price || 0).toFixed(2)}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => increaseQuantity(item)} style={styles.iconButton}>
          <Ionicons name="add-circle" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => decreaseQuantity(item)} style={styles.iconButton}>
          <Ionicons name="remove-circle" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.iconButton}>
          <Ionicons name="trash" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="close" size={40} color="#000" />
      </TouchableOpacity>

      {loading ? (
        <Text style={styles.loadingText}>Adding item...</Text> // Show loading text
      ) : items.length > 0 ? (
        <>
          <Text style={styles.title}>Items in Bag</Text>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
          <View style={styles.totalContainer}>
            <Text style={ styles.totalText}>Total: Rs.{calculateTotal()}</Text>
          </View>
        </>
      ) : (
        <Text style={styles.emptyMessage}>Bag Empty</Text>
      )}
    </View>
  );
}