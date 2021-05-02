import React from 'react';
import { View, Text, SafeAreaView, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../../Components';
import Modal from '../../../Components/Modal';
import LoadingModal from '../../../Components/LoadingModal';
import Appointment from '../Appointment';
import Cancel from './Cancel';
import Confirm from './Confirm';
import Info from './Info';
import Reschedule from './Reschedule';
import Booking from '../../SingleDoctorProfile/Booking';

const Appointments = ({ navigation }) => {
  const dispatch = useDispatch();
  const { appointments, user } = useSelector((state) => state.Account);
  const loading = useSelector((state) => state.loading.effects.Account);
  const [ state, setState ] = React.useState({ isVisible: false, comp: '', activeAppoint: {} });

  const RenderModalComp = ({ comp, appointment, cancel, confirm, reschedule, rescheduleAppointment }) => {
    switch (comp) {
      case 'cancel':
        return <Cancel />;
      case 'reschedule':
        return (
          <Reschedule {...state.activeAppoint} reschedule={reschedule} rescheduleAppointment={rescheduleAppointment} />
        );
      case 'confirm':
        return <Confirm />;
      case 'info':
        return <Info {...appointment} cancel={cancel} confirm={confirm} reschedule={reschedule} />;
      default:
        return <Info {...appointment} cancel={cancel} confirm={confirm} reschedule={reschedule} />;
    }
  };

  const cancelAppointment = (appointId) => {
    setState({ ...state, isVisible: false });
    dispatch.Account.cancelAppointment({
      appointId,
      callback: (res) => {
        if (!res.error) {
          return Alert.alert(
            'Error cancelling appointment',
            'Something went wrong while trying to cancel appointment, try again'
          );
        }
      }
    });
  };

  const confirmAppointment = (appointId) => {
    setState({ ...state, isVisible: false });
    dispatch.Account.confirmAppointment({
      appointId,
      callback: (res) => {
        if (res.error) {
          return Alert.alert(
            'Error confirm appointment',
            'Something went wrong while trying to cancel appointment, try again'
          );
        }
        return Alert.alert('Success', 'Successfully confirmed your appointment');
      }
    });
  };

  const rescheduleAppointment = (appointId, payload) => {
    setState({ ...state, isVisible: false });
    dispatch.Account.rescheduleAppointment({
      appointId,
      payload,
      callback: (res) => {
        if (res.error) {
          return Alert.alert(
            'Error confirm appointment',
            'Something went wrong while trying to cancel appointment, try again'
          );
        }
        setState({ ...state, comp: 'info', isVisible: false });
        return Alert.alert('Success', 'Successfully rescheduled your appointment');
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <LoadingModal
        visible={
          loading.cancelAppointment ||
          loading.getUserAppointments ||
          loading.confirmAppointment ||
          loading.rescheduleAppointment
        }
      /> */}
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <Modal
          isVisible={state.isVisible}
          closeModal={() => setState({ ...state, isVisible: false })}
          externalStyles={{ zIndex: 20 }}
        >
          <View style={{ backgroundColor: '#fff', flex: 1, padding: state.comp !== 'reschedule' ? RFValue(10) : 0 }}>
            <RenderModalComp
              comp={state.comp}
              appointment={state.activeAppoint}
              cancel={cancelAppointment}
              confirm={confirmAppointment}
              reschedule={() => setState({ ...state, comp: 'reschedule' })}
              rescheduleAppointment={rescheduleAppointment}
            />
          </View>
        </Modal>
        <Header title="My Appointments" navigation={navigation} />
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 1 }}
          data={appointments}
          renderItem={(props) => (
            <Appointment
              {...props}
              len={appointments && appointments.length}
              extStyles={{
                width: '100%',
                marginBottom: RFValue(5),
                height: RFValue(120)
                // marginTop: props.index === 0 ? RFValue(10) : 0
              }}
              onPress={() => navigation.navigate('EditAppoinment', { ...props.item })}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default Appointments;
