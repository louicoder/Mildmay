import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const Missing = ({ onPress, text }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: RFValue(150),
        backgroundColor: '#eee',
        marginHorizontal: RFValue(10),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: RFValue(20),
        marginBottom: RFValue(10)
      }}
    >
      <Text style={{ textAlign: 'center' }}>{text}</Text>
    </Pressable>
  );
};

export default Missing;
