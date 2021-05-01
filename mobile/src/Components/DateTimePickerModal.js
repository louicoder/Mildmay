import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import Modal from 'react-native-modal';
import styles from './Styles';

export default ({
  externalStyles,
  hideModal,
  isVisible,
  closeModal,
  opacity,
  backdropPress = true,
  animationIn = 'slideInUp',
  animationOut = 'fadeOut',
  ...rest
}) => {
  return (
    <Modal
      style={[ styles.modalContainer, {} ]}
      isVisible={isVisible}
      backdropOpacity={opacity || 0.8}
      animationIn={animationIn}
      animationOut={animationOut}
      animationInTiming={350}
      animationOutTiming={100}
      onBackdropPress={() => (backdropPress ? closeModal() : null)}
      backdropTransitionOutTiming={0}
      // propagateSwipe
      // coverScreen
      swipeDirection={[ 'down' ]}
      swipeThreshold={20}
      onSwipeComplete={closeModal}
      hideModalContentWhileAnimating
      // onswi
      onBackButtonPress={closeModal}
      onModalHide={hideModal}
      // hasBackdrop={false}
      useNativeDriver
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : undefined}>
        <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>{rest.children}</View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
