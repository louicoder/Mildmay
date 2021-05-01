import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const InfoTab = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: RFValue(20) }}>
        <Text style={{ fontSize: RFValue(14), textAlign: 'center', color: '#aaa' }}>
          All the information you need to know about all our services at Milmay will be available to you on this page
          very soon...
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default InfoTab;
