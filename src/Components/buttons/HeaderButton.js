import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const HeaderButton = ({
  buttonText,
  isSelected,
  onPress,
  bottomLineVisible,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text
        style={[
          styles.buttonText,
          isSelected && styles.selectedButtonText,
        ]}
      >
        {buttonText}
      </Text>
      {bottomLineVisible && <View style={styles.bottomLine} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  selectedButtonText: {
    fontWeight: 'bold',
  },
  bottomLine: {
    paddingTop: 8,
    width: '100%',
    borderBottomWidth: 3,
    borderBottomColor: 'white',
  },
});

export default HeaderButton;
