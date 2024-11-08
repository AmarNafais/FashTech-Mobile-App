import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';

export default function ShoppingTag() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const detectShoppingBag = () => {
      const detectedItems = [
        { id: '1', name: 'Pedlar Kids', price: 680, quantity: 1, imageUri: 'https://i.imgur.com/cZ89qGq.png' },
        { id: '2', name: 'Adidas Kids', price: 720, quantity: 1, imageUri: 'https://i.imgur.com/g8MskSs.png' },
        { id: '3', name: 'Nike Kids', price: 670, quantity: 1, imageUri: 'https://i.imgur.com/dmNx2Sw.png' },
        { id: '4', name: 'Nolimit Kids', price: 550, quantity: 1, imageUri: 'https://i.imgur.com/rXMB6Jz.png' },
        { id: '5', name: 'Pedlar Kids', price: 870, quantity: 1, imageUri: 'https://i.imgur.com/mDCB3Oc.png' }
      ];
      setItems(detectedItems);
    };
    detectShoppingBag();
  }, []);

  const increaseQuantity = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Rs.{item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.iconButton}>
          <Ionicons name="add-circle" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.iconButton}>
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
      {items.length > 0 ? (
        <>
          <Text style={styles.title}>Items in Bag</Text>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: Rs.{calculateTotal()}</Text>
          </View>
        </>
      ) : (
        <Text style={styles.emptyMessage}>Bag Empty</Text>
      )}
    </View>
  );
}