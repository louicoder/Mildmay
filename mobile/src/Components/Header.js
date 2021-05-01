import React from 'react';
import { View, Text, StatusBar, SafeAreaView, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconComp from './Icon';
import styles from './Styles';

const Header = ({
  back = true,
  navigation,
  iconName = 'bell-outline',
  title,
  leftComp: Component,
  extStyles,
  ...props
}) => {
  return (
    <SafeAreaView>
      <View style={[ styles.header, extStyles ]}>
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
        {Component ? <Component /> : null}
      </View>
    </SafeAreaView>
  );
};

export default Header;
