import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HelperFunctions } from '../../Utils';

const Account = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ width: '100%', alignItems: 'center', paddingVertical: RFValue(10), marginTop: '10%' }}>
        <Image
          source={{
            uri: 'https://www.goplacesdigital.com/wp-content/uploads/2020/06/IMG-20200618-WA0013.jpg'
          }}
          resizeMode="cover"
          style={{ width: RFValue(150), height: RFValue(150), borderRadius: RFValue(150) }}
        />
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: RFValue(30), fontWeight: 'bold', color: '#000' }}>Nanyonyi Martha</Text>
          <Text style={{ fontSize: RFValue(14), color: '#000' }}>mars_345tre@gmail.com</Text>
        </View>
      </View>

      <ScrollView style={{ flexGrow: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>
          {[ 'instagram', 'facebook', 'whatsapp', 'cog' ].map((name) => (
            <Ripple
              rippleCentered
              style={{
                width: RFValue(50),
                height: RFValue(50),
                alignItems: 'center',
                justifyContent: 'center',
                // borderWidth: RFValue(1),
                backgroundColor: '#eee',
                // borderColor: '#aaa',
                marginHorizontal: RFValue(5),
                borderRadius: RFValue(3)
              }}
            >
              <Icon name={name} size={RFValue(30)} color="#010203" />
            </Ripple>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
