import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style.js';
import ColorPicker from '../../components/color-picker/color-picker.js';
import SizeSelector from '../../components/size-selector/size-selector.js';
import ImageLoader from '../../components/image-loader/image-loader.js';

export default function Dashboard() {
  const navigation = useNavigation();
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedSize, setSelectedSize] = useState('M');

  const colorToImageMap = {
    '#FF0000': 'https://i.imgur.com/cZ89qGq.png',
    '#00FF00': 'https://i.imgur.com/g8MskSs.png',
    '#0000FF': 'https://i.imgur.com/dmNx2Sw.png',
    '#FFFF00': 'https://i.imgur.com/rXMB6Jz.png',
    '#FFA500': 'https://i.imgur.com/mDCB3Oc.png',
    '#000000': 'https://i.imgur.com/DZXqyJ3.png',
  };

  const imageUri = colorToImageMap[selectedColor] || 'https://via.placeholder.com/150';

  const handleRequest = () => {
    alert(`Request submitted with Color: ${selectedColor}, Size: ${selectedSize}`);
  };

  const handleCancel = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ImageLoader imageUri={imageUri} />
      <ColorPicker selectedColor={selectedColor} onSelectColor={setSelectedColor} />
      <SizeSelector selectedSize={selectedSize} onSelectSize={setSelectedSize} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRequest}>
          <Text style={styles.buttonText}>Request</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}