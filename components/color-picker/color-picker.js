import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style.js';

export default function ColorPicker({ selectedColor, onSelectColor }) {
  const colorOptions = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFA500', '#000000'];

  return (
    <View>
      <Text style={styles.label}>Select Color:</Text>
      <View style={styles.colorContainer}>
        {colorOptions.map((color) => (
          <TouchableOpacity
            key={color}
            style={[styles.colorBox, { backgroundColor: color }]}
            onPress={() => onSelectColor(color)}
          >
            {selectedColor === color && <Text style={styles.checkMark}>✔</Text>}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}