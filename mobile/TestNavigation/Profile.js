import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Profile = ({ navigation }) => {
  console.log('navigation profile-----', navigation);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile screen</Text>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Text style={{ color: 'blue', marginVertical: 10 }}>open drawer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
