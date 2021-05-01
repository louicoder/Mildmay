import React from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import moment from 'moment';
import { RFValue } from 'react-native-responsive-fontsize';
import { Constants } from '../../Utils';

const { width } = Dimensions.get('window');

const Appointment = ({ item, index, onPress, len, extStyles }) => {
  return (
    <Pressable
      style={[
        {
          // borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          // padding: RFValue(10),
          backgroundColor: '#eee',
          // width: len === 1 ? width - RFValue(20) : RFValue(250),
          width: width - RFValue(50),
          height: RFValue(150),
          marginRight: index === len ? 0 : RFValue(10)
        },
        extStyles
      ]}
      onPress={onPress}
    >
      <View
        style={{
          width: '40%',
          height: '100%',
          backgroundColor: Constants.green,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={{ fontSize: RFValue(16), color: '#fff', fontWeight: 'bold' }}>
          {new Date(item.date).toLocaleDateString('default', { day: 'numeric' })}
        </Text>
        <Text style={{ fontSize: RFValue(14), color: '#fff' }}>
          {/* {new Date(item.date).toLocaleDateString('default', { month: 'long' })} */}
          September
        </Text>
        <Text style={{ fontSize: RFValue(16), color: '#fff', fontWeight: 'bold' }}>
          {new Date(item.date).toLocaleDateString('default', { year: 'numeric' })}
        </Text>
      </View>
      <View style={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: RFValue(10), alignItems: 'center' }}>
        {/* <Text>On {moment(item.date)}</Text> */}
        {/* <Text>{item.date}</Text> */}
        <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>
          {item.confirmed ? 'Confirmed' : 'Not confirmed'}
        </Text>
        <Text style={{ fontSize: RFValue(14) }}>Time: {item.time}</Text>
        <Text style={{ fontSize: RFValue(10), color: '#00000080' }}>Created: {moment(item.dateCreated).fromNow()}</Text>
      </View>
    </Pressable>
  );
};

export default Appointment;
