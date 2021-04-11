import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import Navigation from '../../Navigation';
import { HelperFunctions, Queries } from '../../Utils';
import { useSelector } from 'react-redux';

const Drawer = (props) => {
  const { user } = useSelector((state) => state.Account);
  React.useEffect(() => {
    // person finds peace.
    console.log('USER', user);
  }, []);

  const logout = async () =>
    await auth().signOut().then(() => props.navigation.navigate('Login')).catch((error) => Alert.alert('ERROR', error));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          // backgroundColor: 'purple',
          alignItems: 'center',
          marginVertical: RFValue(20),
          marginBottom: 0
        }}
      >
        <Image
          source={{ uri: user.imageUrl }}
          style={{ width: RFValue(100), height: RFValue(100), borderRadius: 150 }}
          resizeMode="cover"
        />
        {(user.username || user.name) && (
          <Text style={{ fontSize: RFValue(20), fontWeight: 'bold' }}>{user.username || user.name}</Text>
        )}
        <Text style={{ fontSize: RFValue(14), color: '#aaa', marginBottom: RFValue(15) }}>{user.email}</Text>
      </View>
      <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {[
          { title: 'Finish Registration', icon: 'information', goto: 'FinishRegistration' },
          { title: 'Settings', icon: 'cog' },
          { title: 'Profile', icon: 'human-male', goto: 'Account' },
          // { title: 'Menu', icon: 'menu' },
          // { title: 'Hospitals', icon: 'hospital' },
          { title: 'Favorites', icon: 'heart' },
          { title: 'Edit Profile', icon: 'pencil', goto: 'EditAccount' },
          // { title: 'Online doctors', icon: 'signal-variant' },
          { title: 'Appointments', icon: 'alarm' },
          { title: 'Logout', icon: 'lock', func: logout }
        ].map(({ title, icon, goto, func }) => (
          <Ripple
            key={HelperFunctions.keyGenerator()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // borderBottomWidth: 1,
              borderBottomColor: '#eee',
              // paddingVertical: RFValue(20),
              padding: RFValue(16)
            }}
            onPress={() => (goto ? props.navigation.navigate(goto, { title }) : func())}
          >
            <Icon name={icon} size={RFValue(20)} style={{ marginRight: RFValue(10) }} />
            <Text style={{ fontSize: RFValue(16) }}>{title}</Text>
          </Ripple>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Drawer;
