import moment from 'moment';
import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, Pressable, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import DoctorReview from '../../Components/DoctorReview';
import Header from '../../Components/Header';
import Modal from '../../Components/Modal';
import auth from '@react-native-firebase/auth';
import styles from './Styles';
import { Constants } from '../../Utils';
import Booking from './Booking';
import LoadingModal from '../../Components/LoadingModal';

const Profile = (props) => {
  // const { user: doctor } = useSelector((state) => state.Account);
  const dispatch = useDispatch();
  const { createAppointment: CA } = useSelector((state) => state.loading.effects.Doctors);
  const [ state, setState ] = React.useState({ modalVisible: false, ...props.route.params, loading: false });

  const followed = state.followers && state.followers.includes(auth().currentUser.uid);

  const HeaderComponent = ({ showModal, ...state }) => (
    <View style={{}}>
      <Image
        source={{
          uri: state.imageUrl
        }}
        style={{ width: '100%', height: RFValue(300) }}
        resizeMode="cover"
      />

      <View style={{ marginVertical: RFValue(20) }}>
        <Text style={{ fontWeight: 'bold', fontSize: RFValue(20) }}>
          {state.name ? 'DR.' : null}
          {state.name ? ' ' : ''}
          {state.name || state.email}
        </Text>
        <Text style={{ fontSize: RFValue(14), marginVertical: RFValue(5), color: '#aaa', marginBottom: RFValue(10) }}>
          Joined - {moment(state.dateJoined).fromNow()}
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ fontSize: RFValue(14), flexDirection: 'row', width: '100%', flexWrap: 'wrap' }}
        >
          {state.professions.map((profession) => <Text style={styles.profText}>{profession}</Text>)}
        </ScrollView>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.buttons} onPressIn={showModal}>
          <Icon name="calendar-month-outline" size={RFValue(20)} style={styles.buttonIcons} color="#fff" />
          <Text style={{ fontSize: RFValue(16), color: '#fff' }}>Book</Text>
        </Pressable>

        <Pressable style={styles.buttons}>
          <Icon name="phone" size={RFValue(20)} style={styles.buttonIcons} color="#fff" />
          <Text style={{ fontSize: RFValue(16), color: '#fff' }}>Call</Text>
        </Pressable>
        <Pressable style={[ styles.buttons, { backgroundColor: '#eee' } ]}>
          <Icon
            name={followed ? 'account-multiple-remove-outline' : 'account-multiple-plus-outline'}
            size={RFValue(20)}
            style={styles.buttonIcons}
            color={Constants.darkGreen}
          />
          <Text style={{ fontSize: RFValue(16), color: 'green' }}>{followed ? 'UnFollow' : 'Follow'}</Text>
        </Pressable>
      </View>
      <View style={styles.reviewsContainer}>
        <Pressable
          style={styles.allReviewsBtn}
          onPress={() => props.navigation.navigate('Reviews', { uid: state.uid })}
        >
          <Text style={{ fontSize: RFValue(14), color: '#fff' }}>See all Reviews</Text>
        </Pressable>
      </View>
    </View>
  );

  const bookAppointment = (payload) => {
    setState({ ...state, loading: true, modalVisible: false });
    try {
      dispatch.Doctors.createAppointment({
        payload,
        callback: ({ error, doc }) => {
          if (error) return Alert.alert('Error booking appointment', error);
          return Alert.alert('Successfully created your appointment with the doctor appointment', error);
        }
      });
    } catch (error) {
      return Alert.alert('Error booking appointment', error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LoadingModal visible={CA} />
      <Modal isVisible={state.modalVisible} closeModal={() => setState({ ...state, modalVisible: false })}>
        <Booking {...state} bookAppointment={bookAppointment} />
      </Modal>
      <SafeAreaView style={{ flex: 1 }}>
        <Header title="Doctor Profile" navigation={props.navigation} />

        <ScrollView style={{ flex: 1, paddingHorizontal: RFValue(10) }} showsVerticalScrollIndicator={false}>
          <HeaderComponent {...state} showModal={() => setState({ ...state, modalVisible: true })} />
          <View style={{}}>
            <Text style={{ fontSize: RFValue(16), fontWeight: 'bold', marginBottom: RFValue(15) }}>Doctor's about</Text>
            <Text style={{ fontSize: RFValue(14), marginBottom: RFValue(10) }}>{state.intro}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
