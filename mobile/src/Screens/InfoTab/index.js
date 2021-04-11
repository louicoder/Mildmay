import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const InfoTab = () => {
  return (
    <SafeAreaView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: RFValue(20) }}>
        <Text>All the information you need to know about all our services will be available here soon...</Text>
      </View>
    </SafeAreaView>
  );
};

export default InfoTab;
