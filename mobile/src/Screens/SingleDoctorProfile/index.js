import moment from 'moment';
import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, Pressable, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import DoctorReview from '../../Components/DoctorReview';
import Header from '../../Components/Header';
import Modal from '../../Components/DateTimePickerModal';
import auth from '@react-native-firebase/auth';
import styles from './Styles';
import { Constants } from '../../Utils';
import Booking from './Booking';
import LoadingModal from '../../Components/LoadingModal';
import HeaderComponent from './HeaderComponent';

const Profile = (props) => {
  // const { user: doctor } = useSelector((state) => state.Account);
  const dispatch = useDispatch();
  const { createAppointment: CA, getDoctor: GD } = useSelector((state) => state.loading.effects.Doctors);
  const [ state, setState ] = React.useState({ modalVisible: false, loading: false, ...props.route.params });

  console.log('Iamage params', props.route.params.imageUrl);

  const bookAppointment = (payload) => {
    setState({ ...state, loading: true, modalVisible: false });
    try {
      dispatch.Doctors.createAppointment({
        payload,
        callback: ({ error, doc }) => {
          if (error) return Alert.alert('Error booking appointment', error);
          setState({ ...state, loading: false });

          return Alert.alert('Success', 'Successfully created your appointment with the doctor appointment', error);
        }
      });
    } catch (error) {
      setState({ ...state, loading: false });

      return Alert.alert('Error booking appointment', error.message);
    }
  };

  const getUpdateDoctorDetails = () => {
    dispatch.Doctors.getDoctor({
      uid: props.route.params.uid,
      callback: (resp) => {
        if (resp.error)
          return Alert.alert(
            'Error get updated details',
            'There was an error getting the updated details of the doctor, please try again'
          );
        setState({ ...state, ...resp.doc });
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <LoadingModal visible={CA || GD || state.loading} />
      <SafeAreaView style={{ flex: 1 }}>
        <Modal isVisible={state.modalVisible} closeModal={() => setState({ ...state, modalVisible: false })}>
          <Booking {...state} bookAppointment={bookAppointment} />
        </Modal>
        <Header title="Doctor Profile" navigation={props.navigation} />

        <ScrollView style={{ flex: 1, paddingHorizontal: RFValue(10) }} showsVerticalScrollIndicator={false}>
          <HeaderComponent
            profile={props.route.params}
            showModal={() => setState({ ...state, modalVisible: true })}
            navigation={props.navigation}
            setLoading={(loading) => setState({ ...state, loading })}
            getDoctorDetails={getUpdateDoctorDetails}
          />
          <View style={{}}>
            <Text />
            <Text style={{ fontSize: RFValue(16), fontWeight: 'bold', marginBottom: RFValue(15) }}>
              About this doctor :
            </Text>
            <Text style={{ fontSize: RFValue(14), marginBottom: RFValue(10), color: state.intro ? '#000' : '#ccc' }}>
              {state.intro || 'This doctor does not have any description added yet to the profile...'}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
