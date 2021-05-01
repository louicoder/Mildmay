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
import LOGO from '../../assets/MUG.png';
import Firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Constants, Queries } from '../../Utils';
import LoadingModal from '../../Components/LoadingModal';
import { useDispatch } from 'react-redux';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [ state, setState ] = React.useState({
    loginMode: true,
    activeLogin: null,
    email: '',
    password: '',
    passwordVisible: true,
    loading: false,
    mode: ''
  });

  const signupHandler = async () => {
    // setState({ ...state, loading: true });
    const payload = {
      uid: '',
      email: state.email,
      followers: [],
      following: [],
      professions: [],
      accountType: state.mode,
      username: '',
      interests: [],
      intro: '',
      imageUrl: Constants.PROFILE_IMAGE,
      phoneNumber: '',
      dateJoined: new Date().toISOString(),
      name: ''
    };

    try {
      const res = await auth().createUserWithEmailAndPassword(state.email, state.password);
      if (res.user) {
        console.log('USer', res.user);
        await Queries.createDocWithId('Users', { ...payload, uid: res.user.uid }, res.user.uid, () => {
          setState({ ...state, loading: false, loginMode: true });
        });
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
        dispatch.Account.getUserDetails({
          uid: resp.user.uid,
          callback: ({ result }) => {
            setState({ ...state, loading: false, email: '', password: '' });
            return navigation.navigate('HomeScreens');
          }
        });
      }
    } catch (error) {
      setState({ ...state, loading: false });
      return Alert.alert('Error signing in', error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LoadingModal visible={state.loading} />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent', backgroundColor: 'transparent' }}>
        <KeyboardAwareScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
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
                    onPress={() =>
                      setState({
                        ...state,
                        activeLogin: index === state.activeLogin ? null : index,
                        mode: props.title
                      })}
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
              onChangeText={(password) => setState({ ...state, password })}
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
