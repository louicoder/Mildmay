import React from 'react';
import { View, Text, FlatList, ScrollView, Pressable, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BlogList from './BlogList';

const MyaBlogsList = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Pressable
        style={{
          // height: RFValue(50),
          backgroundColor: '#000',
          position: 'absolute',
          bottom: RFValue(10),
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          zIndex: 100,
          right: RFValue(10),
          paddingHorizontal: RFValue(15),
          paddingVertical: RFValue(10),
          borderRadius: RFValue(50)
        }}
      >
        <Text style={{ color: '#fff', marginRight: RFValue(10), fontSize: RFValue(16) }}>Create blog</Text>
        <Icon name="plus" size={RFValue(20)} color="#fff" />
      </Pressable>
      <View
        style={{
          width: '100%',
          // height: RFValue(50),
          paddingVertical: RFValue(15),
          flexDirection: 'row',
          paddingHorizontal: RFValue(10),
          justifyContent: 'space-between',
          alignItems: 'center',
          // borderColor: '#eee',
          // borderWidth: 0.5,
          paddingBottom: RFValue(10)
        }}
      >
        <Text style={{ fontSize: RFValue(18) }}>MyaPlus Network</Text>
        <Pressable
          onPress={() => navigation.toggleDrawer()}
          style={{
            width: RFValue(40),
            height: RFValue(40),
            borderRadius: RFValue(40),
            backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon name="menu" size={RFValue(25)} color="#fff" />
        </Pressable>
      </View>

      <View style={{ flexGrow: 1 }}>
        <BlogList navigation={navigation} />
      </View>
    </View>
  );
};

export default MyaBlogsList;
