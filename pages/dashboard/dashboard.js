import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useShoppingBag } from '../bag/bag-context'; // Import the context
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the cancel icon
import styles from './style';

const Dashboard = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { addItem } = useShoppingBag(); // Get the addItem function from context

  const { 
    color, 
    size, 
    imageUri, 
    stockQuantity, 
    name, 
    description, 
    price, 
    material, 
    type 
  } = route.params || {};

  const [selectedColor, setSelectedColor] = useState(color || '#A87676');
  const [selectedSize, setSelectedSize] = useState(size || 'M');
  const [currentImage, setCurrentImage] = useState(imageUri || 'https://i.imgur.com/cZ89qGq.png');

  const colorImages = {
    '#C62E2E': 'https://i.imgur.com/cZ89qGq.png',
    '#0D92F4': 'https://i.imgur.com/dmNx2Sw.png',
    '#88C273': 'https://i.imgur.com/g8MskSs.png',
    '#F87A53': 'https://i.imgur.com/mDCB3Oc.png',
    '#FFE31A': 'https://i.imgur.com/rXMB6Jz.png',
    '#1A1A1D': 'https://i.imgur.com/DZXqyJ3.png',
  };

  useEffect(() => {
    if (colorImages[selectedColor]) {
      setCurrentImage(colorImages[selectedColor]);
    }
  }, [selectedColor]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleAddToBag = () => {
    const itemToAdd = {
      id: name, // Use a unique identifier for the item
      name,
      price,
      imageUri: currentImage,
      quantity: 1,
    };
    addItem(itemToAdd); // Call the addItem function from context
    Alert.alert('Success', 'Item added to bag!');
  };

  const handleCancel = () => {
    navigation.navigate('Home'); // Redirect to the Home page
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{name || 'Modern Comfort Wear'}</Text>
          <Text style={styles.price}>${price || 129.99}</Text>

          {/* Cancel Icon */}
          <TouchableOpacity onPress={handleCancel} style={styles.cancelIcon}>
            <Ionicons name="close" size={30} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: currentImage }}
            style={styles.image}
          />
        </View>

        <View style={styles.controls}>
          <Text style={styles.description}>{description || 'Premium quality casual wear designed for everyday comfort'}</Text>

          <View style={styles.colorSection}>
            <Text style={styles.sectionLabel}>Color</Text>
            <View style={styles.colorButtons}>
              {Object.keys(colorImages).map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => handleColorChange(color)}
                  style={[ 
                    styles.colorButton,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedColor
                  ]}
                />
              ))}
            </View>
          </View>

          <View style={styles.sizeSection}>
            <Text style={styles.sectionLabel}>Size</Text>
            <Picker
              selectedValue={selectedSize}
              onValueChange={(itemValue) => setSelectedSize(itemValue)}
              style={styles.picker}
            >
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <Picker.Item key={size} label={size} value={size} />
              ))}
            </Picker>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.button, styles.requestButton]}
              onPress={() => handleAction('Request')}
            >
              <Text style={styles.buttonText}>Request</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.addButton]}
              onPress={handleAddToBag} // Update to call handleAddToBag
            >
              <Text style={[styles.buttonText, { color: '#1A1A1A' }]}>Add to Bag</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.bagButton]}
              onPress={() => navigation.navigate('Bag')}
            >
              <Text style={styles.buttonText}>My Bag</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productDetails}>
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Material</Text>
                <Text style={styles.detailValue}>{material || '100% Organic Cotton'}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Type</Text>
                <Text style={styles.detailValue}>{type || 'Casual Wear'}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Stock</Text>
                <Text style={styles.detailValue}>{stockQuantity || 50} units</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;