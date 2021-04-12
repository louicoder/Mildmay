import React from 'react';
import { useEffect } from 'react';
import { View, Text, Image, Alert, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import LOGO from '../../assets/MUG.png';
import auth from '@react-native-firebase/auth';
import { Queries } from '../../Utils';

const Splash = ({ navigation: { navigate } }) => {
  const [ state, setState ] = React.useState({ loading: false });
  const loading = useSelector((state) => state.loading.effects.Account);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth().currentUser && auth().currentUser.uid) getUserDetails();
    else navigate('Login');
  }, []);

  const getUserDetails = async () => {
    // setState({ ...state, loading: true });
    await dispatch.Account.getUserDetails({
      uid: auth().currentUser.uid,
      callback: (resp) => {
        if (!resp.success) {
          setState({ ...state, loading: false });
          return navigate('Login');
        }
        setState({ ...state, loading: false });
        navigate('HomeScreens');
      }
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Image style={{ width: RFValue(200), height: RFValue(200) }} source={LOGO} />
      </View>
      <View style={{ position: 'absolute', bottom: RFValue(30) }}>
        {loading.getUserDetails && <ActivityIndicator size={RFValue(14)} style={{}} color="green" />}
        <Text style={{ color: 'green' }}>www.mildmay.org.ug</Text>
      </View>
    </View>
  );
};

export default Splash;
