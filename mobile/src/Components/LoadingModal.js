import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';

// const { width, height } = Dimensions.get('window');

const LoadingModal = ({ visible = false, children }) => {
  return (
    <Modal useNativeDriver isVisible={visible} animationIn="fadeIn" animationOut="fadeOut">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: RFValue(14) }}>Please wait...</Text>
      </View>
    </Modal>
  );
};

export default LoadingModal;
