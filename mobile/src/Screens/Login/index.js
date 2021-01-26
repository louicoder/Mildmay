import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../Components/Button';
import IconComp from '../../Components/Icon';
import Input from '../../Components/Input';
import Option from '../../Components/Option';
import PasswordInput from '../../Components/PasswordInput';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Login = ({ navigation }) => {
  const [ state, setState ] = React.useState({
    loginMode: true,
    activeLogin: null,
    email: '',
    password: '',
    passwordVisible: true
  });
  React.useEffect(() => {
    // console.log('navigation props', navigation);
  });
  return (
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
                onPressIn={() => setState({ ...state, activeLogin: index === state.activeLogin ? null : index })}
                selected={state.activeLogin === index}
              />
            ))}
          </View>
          <Input placeholder="Enter your email address" />
          {/* <Input placeholder="Enter your password" /> */}
          <PasswordInput
            placeholder="Enter your password"
            secure={state.passwordVisible}
            switchPasswordVisibility={() => setState({ ...state, passwordVisible: !state.passwordVisible })}
          />

          <Button title={state.loginMode ? 'Login' : 'Create account'} onPress={() => navigation.navigate('Home')} />
          <TouchableWithoutFeedback
            onPress={() => setState({ ...state, loginMode: !state.loginMode })}
            style={{ paddingVertical: RFValue(10), borderTopWidth: 1, borderTopColor: '#ddd', marginTop: RFValue(15) }}
          >
            <Text style={{ fontSize: RFValue(14), fontWeight: '600', color: '#0000ff', alignSelf: 'center' }}>
              {state.loginMode ? 'Create new account ?' : 'Login to your account'}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;

const Elements = [
  { title: 'Patient' },
  { title: 'Doctor' },
  { title: 'Pharmacy' },
  { title: 'Clinic' },
  { title: 'Hospital' },
  { title: 'Blood Bank' }
];
