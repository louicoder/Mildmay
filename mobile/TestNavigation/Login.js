import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Login = ({ navigation }) => {
  React.useEffect(() => {
    console.log('navigation props', navigation);
  });
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is the home screen,</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Profile', { title: 'Profile' })}>
        <Text style={{ color: 'blue', marginVertical: 10 }}>Go to Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
