/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, View, Text, StatusBar } from 'react-native';

const App: () => React$Node = () => {
  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: '700', fontSize: 24 }}>UG-Tour coming soon...</Text>
          <Text>A new way to tour the country</Text>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default App;
