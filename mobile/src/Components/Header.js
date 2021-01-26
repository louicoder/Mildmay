import React from 'react';
import { View, Text, StatusBar, SafeAreaView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
// import { Icon } from 'react-native-vector-icons/Icon';
import IconComp from './Icon';

const Header = ({ back = true, children, navigation, params, ...props }) => {
  // console.log('props', props.scene.route.name.includes['Home']);
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          height: RFValue(55),
          alignItems: 'center',
          paddingHorizontal: RFValue(15)
        }}
      >
        {back ? <IconComp name="arrow-left" onPress={() => navigation.goBack()} /> : <Icon name="menu" />}
        <View style={{ flexGrow: 1, justifyContent: 'center' }}>
          <Text>{props.name}</Text>
        </View>
        <IconComp name="bell-outline" />
      </View>
    </SafeAreaView>
  );
};

export default Header;
