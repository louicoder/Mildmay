import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const LoadingModal = ({ visible = false, children }) => {
  return visible ? (
    // <View style={{ height, width }}>
    // <Modal
    //   useNativeDriver
    //   isVisible={visible}
    //   animationIn="fadeIn"
    //   animationOut="fadeOut"
    //   style={{ flex: 1 }}
    //   backdropOpacity={0.85}
    //   presentationStyle={{height:'100%'}}
    // >
    //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //     <Text style={{ color: '#fff', fontSize: RFValue(12) }}>Loadin, Please wait...</Text>
    //     {children}
    //   </View>
    // </Modal>
    // </View>

    // <View style={{ height, width }}>

    <View
      style={{
        position: 'absolute',
        // marginTop: useSafeAreaInsets().top,
        width,
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.85)',
        zIndex: 10000,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text style={{ color: '#fff', fontSize: RFValue(12), zIndex: 20 }}>Loadin, Please wait...</Text>
      {children}
    </View>
  ) : // </View>
  null;
};

export default LoadingModal;
