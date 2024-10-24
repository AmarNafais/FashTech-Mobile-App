import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style.js';

export default function SizeSelector({ selectedSize, onSelectSize }) {
  const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <View>
      <Text style={styles.label}>Select Size:</Text>
      <View style={styles.sizeContainer}>
        {sizeOptions.map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeBox,
              selectedSize === size ? styles.selectedSizeBox : null,
            ]}
            onPress={() => onSelectSize(size)}
          >
            <Text style={styles.sizeText}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}