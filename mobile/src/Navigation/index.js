import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Header from '../Components/Header';
import { Home, Login, Account, Search, InfoTab, Doctors } from '../Screens';
import IconComp from '../Components/Icon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontIcons from 'react-native-vector-icons/FontAwesome5';
import FeatherIcons from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

const Stacks = createStackNavigator();
const LoginStack = createStackNavigator();
const HomeStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();

const BottomStack = createMaterialBottomTabNavigator();

const LoginScreen = () => (
  <LoginStack.Navigator>
    <LoginStack.Screen name="Login" component={Login} />
  </LoginStack.Navigator>
);

const HomeScreens = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
  </HomeStack.Navigator>
);

const BottomStackScreens = ({}) => (
  <BottomStack.Navigator
    tabBarOptions={{}}
    shifting={false}
    sceneContainerStyle={{ paddingVertical: RFValue(10) }}
    headerMode="none"
    barStyle={{ backgroundColor: '#1c7c54' }}
    activeColor="#fff"
    inactiveColor="#ffffff70"
  >
    <BottomStack.Screen
      name="Home"
      component={HomeScreens}
      options={() => ({
        tabBarIcon: ({ color }) => <Ionicons color={color} name="home-outline" size={RFValue(20)} />
      })}
    />

    <BottomStack.Screen
      name="Doctors"
      component={Doctors}
      options={() => ({ tabBarIcon: ({ color }) => <FontIcons color={color} name="user-md" size={RFValue(20)} /> })}
    />
    <BottomStack.Screen
      name="Search"
      component={Search}
      options={() => ({
        tabBarIcon: ({ color }) => <Ionicons color={color} name="search-outline" size={RFValue(20)} />
      })}
    />
    <BottomStack.Screen
      name="Info"
      component={InfoTab}
      options={() => ({
        tabBarIcon: ({ color }) => <Ionicons color={color} name="information-circle-outline" size={RFValue(20)} />
      })}
    />
    <BottomStack.Screen
      name="Account"
      component={Account}
      options={() => ({
        tabBarIcon: ({ color }) => <FeatherIcons color={color} name="user" size={RFValue(20)} />
      })}
    />
  </BottomStack.Navigator>
);

const AllStacks = () => (
  <Stacks.Navigator screenOptions={{}} initialRouteName="Login">
    <Stacks.Screen
      name="Home"
      component={BottomStackScreens}
      options={{
        // headerShown:
        header: () => null
      }}
    />
    <Stacks.Screen name="Login" component={LoginScreen} options={{ header: () => null }} />
    {/* <Stacks.Screen name="Drawer" component={DrawerScreens} /> */}
  </Stacks.Navigator>
);
const DrawerScreens = () => (
  <DrawerStack.Navigator initialRouteName="Login">
    <DrawerStack.Screen name="Login" component={Login} />
    {/* <Stacks.Screen name="Login" component={LoginScreen} options={{ header: () => null }} /> */}
  </DrawerStack.Navigator>
);

export default () => (
  <NavigationContainer theme={{ colors: { background: '#fff' } }}>
    <AllStacks />
  </NavigationContainer>
);
