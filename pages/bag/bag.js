import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useShoppingBag } from '../bag/bag-context';
import styles from './style';

export default function ShoppingBag() {
  const { items, addItem, removeItem, deleteItem } = useShoppingBag();

  const increaseQuantity = (id) => {
    addItem({ id });
  };

  const decreaseQuantity = (id) => {
    removeItem(id);
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