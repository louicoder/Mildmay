import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Comments from './Comments';

const MyaPlus = ({ navigation }) => {
  return (
    <View>
      <Comments />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eeeeee80',
          maxHeight: RFValue(100),
          width: '100%',
          paddingHorizontal: RFValue(10),
          paddingVertical: RFValue(5)
        }}
      >
        <Image
          source={{ uri: 'https://haircutinspiration.com/wp-content/uploads/Michael-Jordans-Short-Haircut-1-1.jpg' }}
          style={{ width: RFValue(40), height: RFValue(40), borderRadius: RFValue(40) }}
        />
        <TextInput
          style={{
            marginHorizontal: RFValue(10),
            fontSize: RFValue(14),
            // borderWidth: 1,
            paddingHorizontal: RFValue(10),
            width: '70%',
            backgroundColor: '#eee',
            height: '100%'
          }}
          placeholder="Leave your comment here..."
          multiline
        />
        <View
          style={{
            width: RFValue(40),
            height: RFValue(40),
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon name="send" size={RFValue(25)} color="#aaa" />
        </View>
      </View>
    </View>
  );
};

export default MyaPlus;
