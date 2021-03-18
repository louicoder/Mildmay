import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Image, Alert } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../Components/Button';
import IconComp from '../../Components/Icon';
import Input from '../../Components/Input';
import Option from '../../Components/Option';
import PasswordInput from '../../Components/PasswordInput';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LOGO from '../../assets/mildmayLogo.png';
import Firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Queries } from '../../Utils';
import LoadingModal from '../../Components/LoadingModal';

const Login = ({ navigation }) => {
  const [ state, setState ] = React.useState({
    loginMode: true,
    activeLogin: null,
    email: 'musanje2010@gmail.com',
    password: 'person',
    passwordVisible: true,
    loading: false
  });

  const signupHandler = async () => {
    setState({ ...state, loading: true });

    try {
      const response = await auth().createUserWithEmailAndPassword('musanje2021@gmail.com', 'person');
      console.log('REsponse from firebase create user', response);
      if (response.user) {
        await Queries.createDoc(
          'Users',
          { uid: response.user.id, email: response.user.email, userType: state.activeLogin },
          () => {
            setState({ ...state, loading: false, loginMode: true });
          }
        );
      }
    } catch (error) {
      setState({ ...state, loading: false });
      return Alert.alert('Error signing up', error.message);
    }
  };

  const loginHandler = async () => {
    setState({ ...state, loading: true });
    const { email, password } = state;

    try {
      const resp = await auth().signInWithEmailAndPassword(email, password);
      // console.log('REsponse uid', resp);
      if (resp.user) {
        navigation.navigate('HomeScreens');
      }
      setState({ ...state, loading: false });
    } catch (error) {
      setState({ ...state, loading: false });
      return Alert.alert('Error signing in', error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LoadingModal visible={state.loading}>
        <Text style={{ fontSize: RFValue(14), color: '#fff' }}>Please wait...</Text>
      </LoadingModal>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent', backgroundColor: 'transparent' }}>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <View
            style={{
              height: RFPercentage(100),
              backgroundColor: '#fff',
              paddingHorizontal: RFValue(15),
              justifyContent: 'center'
            }}
          >
            <Image
              source={LOGO}
              style={{ width: RFValue(100), height: RFValue(100), marginBottom: RFValue(20), alignSelf: 'center' }}
            />

            <Text style={{ fontSize: RFValue(25), marginBottom: RFValue(15) }}>
              {state.loginMode ? 'Login to your' : 'Create new'} account
            </Text>

            <Text style={{ fontSize: RFValue(14), marginVertical: 10 }}>
              {state.loginMode ? (
                'Select an account that you would like to log into.'
              ) : (
                'Enter the details below to create your new account with Mildmay'
              )}
            </Text>

            {state.loginMode ? null : (
              <View
                style={{
                  marginVertical: RFValue(10),
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between'
                }}
              >
                {Elements.map((props, index) => (
                  <Option
                    {...props}
                    key={index}
                    onPress={() => setState({ ...state, activeLogin: index === state.activeLogin ? null : index })}
                    selected={state.activeLogin === index}
                  />
                ))}
              </View>
            )}
            <Input
              placeholder="Enter your email address"
              value={state.email}
              onChangeText={(email) => setState({ ...state, email })}
            />

            <PasswordInput
              value={state.password}
              placeholder="Enter your password"
              secure={state.passwordVisible}
              switchPasswordVisibility={() => setState({ ...state, passwordVisible: !state.passwordVisible })}
            />

            <Button
              extStyles={{ backgroundColor: 'green', borderWidth: 0 }}
              title={state.loginMode ? 'Login' : 'Create Account'}
              onPress={() => (state.loginMode ? loginHandler() : signupHandler())}
              textStyles={{ color: '#fff' }}
            />
            <TouchableWithoutFeedback
              onPress={() => setState({ ...state, loginMode: !state.loginMode })}
              style={{
                paddingVertical: RFValue(10),
                borderTopWidth: 1,
                borderTopColor: '#ddd',
                marginTop: RFValue(15)
              }}
            >
              <Text style={{ fontSize: RFValue(14), fontWeight: '600', color: 'green', alignSelf: 'center' }}>
                {state.loginMode ? 'Create new account ?' : 'Login to your account'}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Login;

const Elements = [
  { title: 'Patient' },
  { title: 'Doctor' }
  // { title: 'Pharmacy' },
  // { title: 'Clinic' },
  // { title: 'Hospital' },
  // { title: 'Blood Bank' }
];
