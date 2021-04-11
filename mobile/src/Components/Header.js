import React from 'react';
import { View, Text, StatusBar, SafeAreaView, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconComp from './Icon';

const Header = ({ back = true, navigation, iconName = 'bell-outline', title, ...props }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        height: RFValue(55),
        alignItems: 'center',
        paddingHorizontal: RFValue(10)
      }}
    >
      {back ? (
        <IconComp
          name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-left'}
          size={RFValue(25)}
          onPress={() => navigation.goBack()}
        />
      ) : null}
      <View style={{ flexGrow: 1, alignItems: 'flex-start', paddingHorizontal: RFValue(10) }}>
        <Text style={{ fontSize: RFValue(18), fontWeight: 'bold' }}>{title}</Text>
      </View>
      <IconComp name={iconName} onPress={() => null} extStyles={{ opacity: 0 }} />
    </View>
  );
};

export default Header;
