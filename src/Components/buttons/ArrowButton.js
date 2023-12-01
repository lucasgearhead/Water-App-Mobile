import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ArrowButton = ({ onPress, iconName, disabled }) => {
  return (
    <TouchableOpacity
      style={{ padding: 10 }}
      onPress={onPress}
      disabled={disabled}
    >
      <AntDesign name={iconName} size={24} color="white" />
    </TouchableOpacity>
  );
};

export default ArrowButton;
