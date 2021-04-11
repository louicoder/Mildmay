import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Constants } from '../Utils';

const Option = ({ title, selected = false, onPress, onPressIn, rippleDuration = 350 }) => {
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        backgroundColor: selected ? Constants.green : 'transparent',
        borderWidth: selected ? 0 : RFValue(0.5),
        borderColor: '#eee',
        alignItems: 'center',
        paddingVertical: RFValue(10),
        width: '49%',
        borderRadius: RFValue(5),
        marginBottom: RFPercentage(1)
      }}
      onPress={onPress}
    >
      <Icon
        name={selected ? 'checkbox-marked-circle' : 'circle-outline'}
        size={RFValue(20)}
        style={{ paddingHorizontal: RFValue(5) }}
        color={selected ? '#fff' : '#eee'}
      />
      <Text style={{ fontSize: RFValue(14), color: selected ? '#fff' : '#000' }}>{title}</Text>
    </Pressable>
  );
};

export default Option;
