import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const LoadingModal = ({ visible = false, children }) => {
  return (
    // <View style={{ height, width }}>
    <Modal
      useNativeDriver
      isVisible={visible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={{ flex: 1 }}
      backdropOpacity={0.85}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: RFValue(12) }}>Loadin, Please wait...</Text>
        {children}
      </View>
    </Modal>
    // </View>
  );
};

export default LoadingModal;
