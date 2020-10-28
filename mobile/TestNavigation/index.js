import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './Login';
import Profile from './Profile';
const Stacks = createStackNavigator();
const DrawerStack = createDrawerNavigator();

const BottomStack = createBottomTabNavigator();

const BottomStackScreens = () => (
  <BottomStack.Navigator>
    <BottomStack.Screen name="Login" component={Login} />
    <BottomStack.Screen name="Profile" component={Profile} />
  </BottomStack.Navigator>
);

const AllStacks = () => (
  <Stacks.Navigator>
    <Stacks.Screen name="Home" component={BottomStackScreens} />
    <Stacks.Screen name="Drawer" component={DrawerScreens} />
  </Stacks.Navigator>
);
const DrawerScreens = () => (
  <DrawerStack.Navigator initialRouteName="Home">
    <DrawerStack.Screen name="Login" component={Login} />
    <DrawerStack.Screen name="Profile" component={Profile} />
    <DrawerStack.Screen name="Home" component={AllStacks} />
  </DrawerStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <DrawerScreens />
  </NavigationContainer>
);
