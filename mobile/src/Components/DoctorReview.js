import moment from 'moment';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const DoctorReview = ({
  last,
  userInfo,
  review,
  dateCreated,
  ...rest
}) => {
  // console.log('USER IFNO', rest.userInfo?.name);
  return (
    <View
      style={{
        marginBottom: RFValue(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: RFValue(10),
        width: '100%',
        paddingBottom: last ? RFValue(60) : 0
        // borderWidth: 1
      }}
    >
      <View style={{width: '15%'}}>
        <Image
        source={{ uri: userInfo?.imageUrl }}
        style={{ width: RFValue(30), height: RFValue(30), borderRadius: RFValue(50) }}
      />
      </View>
      <View style={{ flexGrow: 1, paddingLeft: RFValue(10), width:'85%' }}>
        <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>{userInfo?.name || userInfo?.username || userInfo?.email}</Text>
        <Text style={{ fontSize: RFValue(12), color: '#aaa', marginBottom: RFValue(5) }}>
          {moment(dateCreated).fromNow()}
        </Text>
        <Text style={{ fontSize: RFValue(12) }}>{review}</Text>
      </View>
    </View>
  );
};

export default DoctorReview;
