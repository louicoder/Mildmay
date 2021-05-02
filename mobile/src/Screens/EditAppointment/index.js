import React from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Constants, HelperFunctions } from '../../Utils';
import moment from 'moment';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import styles from '../SingleDoctorProfile/Styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Button, Header } from '../../Components';
import auth from '@react-native-firebase/auth';
import LoadingModal from '../../Components/LoadingModal';
import { useDispatch, useSelector } from 'react-redux';

const Booking = ({ navigation, route: { params }, ...props }) => {
  const loading = useSelector((state) => state.loading.effects.Account);
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const [ state, setState ] = React.useState({
    time: '8:00 - 9:00',
    timeShowing: true,
    calShowing: true,
    description: '',
    date: new Date().toISOString(),
    ...params
  });

  const cancelAppointment = () => {
    dispatch.Account.cancelAppointment({
      appointId: params.id,
      callback: (res) => {
        if (!res.error) {
          return Alert.alert(
            'Error cancelling appointment',
            'Something went wrong while trying to cancel appointment, try again'
          );
        }
        return navigation.goBack();
      }
    });
  };

  const confirmAppointment = () => {
    dispatch.Account.confirmAppointment({
      appointId: params.id,
      callback: (res) => {
        if (res.error) {
          return Alert.alert(
            'Error confirm appointment',
            'Something went wrong while trying to cancel appointment, try again'
          );
        }
        return navigation.goBack();
      }
    });
  };

  const rescheduleAppointment = () => {
    const { date, time, description } = state;
    dispatch.Account.rescheduleAppointment({
      appointId: params.id,
      payload: { date, time, description },
      callback: (res) => {
        if (res.error) {
          return Alert.alert(
            'Error confirm appointment',
            'Something went wrong while trying to cancel appointment, try again'
          );
        }
        return navigation.goBack();
      }
    });
  };

  const confirm = (callback, msg) =>
    Alert.alert('Confirm Action', msg, [
      {
        text: 'Cancel',
        onPress: () => {
          return;
        },
        style: 'cancel'
      },
      { text: 'OK', onPress: callback }
    ]);

  console.log('LOADING', loading);

  return (
    <React.Fragment>
      <LoadingModal
        visible={loading.cancelAppointment || loading.confirmAppointment || loading.rescheduleAppointment}
      />
      <View style={{ flex: 1 }}>
        <Header title="Appointment details" navigation={navigation} />
        <View
          style={{
            position: 'absolute',
            bottom: RFValue(20),
            // right: RFValue(10),
            // width: '100%',
            // borderWidth: 1,
            // height: RFValue(20),
            zIndex: 1000,
            paddingHorizontal: RFValue(10),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            alignSelf: 'flex-end'
          }}
        >
          {!state.confirmed &&
          state.doctorId === auth().currentUser.uid && (
            <Pressable
              onPress={() => confirm(confirmAppointment, 'Are you sure you would like to confirm this appointment')}
              style={{
                backgroundColor: 'green',
                width: RFValue(50),
                height: RFValue(50),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: RFValue(50),
                marginRight: RFValue(10)
              }}
            >
              <Icon name="check" size={RFValue(30)} color="#fff" />
            </Pressable>
          )}
          <Pressable
            onPress={() => confirm(cancelAppointment, 'Are you sure you want cancel this appointment')}
            style={{
              backgroundColor: 'red',
              width: RFValue(50),
              height: RFValue(50),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: RFValue(50)
            }}
          >
            <Icon name="close" size={RFValue(30)} color="#fff" />
          </Pressable>
        </View>

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustContentInsets={false}
          style={{
            width: '100%',
            backgroundColor: '#fff',
            // paddingBottom: useSafeAreaInsets().bottom,
            paddingHorizontal: RFValue(10)
          }}
        >
          <Pressable
            style={styles.descText}
            onPressIn={() => {
              setState({ ...state, calShowing: !state.calShowing, timeShowing: false });
              Keyboard.dismiss();
            }}
          >
            <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>Select date:</Text>
            <Text style={styles.dateTimeText}>{moment(state.date).format('DD-MMMM-YYYY')}</Text>
            <View style={styles.dropIcon}>
              <Icon name={state.calShowing ? 'chevron-up' : 'chevron-down'} size={RFValue(20)} />
            </View>
          </Pressable>

          {state.calShowing && (
            <View style={{ width: '100%' }}>
              <Calendar
                hideExtraDays
                style={{ width: '100%' }}
                current={moment(state.date).format('YYYY-MM-DD')}
                minDate={moment(new Date()).format('YYYY-MM-DD')}
                enableSwipeMonths={true}
                onDayPress={({ dateString }) => {
                  setState({ ...state, date: moment(dateString).toISOString() });
                }}
                markingType="multi-dot"
                markedDates={{
                  [moment(state.date).format('YYYY-MM-DD')]: {
                    selected: true,
                    selectedColor: Constants.green
                  }
                }}
              />
            </View>
          )}

          <Pressable style={styles.descText} onPressIn={() => setState({ ...state, timeShowing: !state.timeShowing })}>
            <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>Select time:</Text>
            <Text style={styles.dateTimeText}>{state.time || 'No time selected'}</Text>
            <View style={styles.dropIcon}>
              <Icon name={state.timeShowing ? 'chevron-up' : 'chevron-down'} size={RFValue(20)} />
            </View>
          </Pressable>
          {state.timeShowing && (
            <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {Constants.timeSlots.map((time) => {
                const selected = state.time === time;
                return (
                  <Pressable
                    key={HelperFunctions.keyGenerator()}
                    onPressIn={() => setState({ ...state, time })}
                    style={{
                      width: '32%',
                      paddingVertical: RFValue(10),
                      backgroundColor: selected ? Constants.green : '#eee',
                      marginBottom: RFValue(7),
                      alignItems: 'center'
                    }}
                  >
                    <Text
                      style={{
                        fontSize: RFValue(14),
                        color: selected ? '#fff' : '#000',
                        fontWeight: selected ? 'bold' : 'normal'
                      }}
                    >
                      {time}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}

          <Text style={{ fontSize: RFValue(14), marginVertical: RFValue(10) }}>
            Enter desciption on why your would like to make an appointment with the doctor:
          </Text>
          <TextInput
            placeholder="Enter desciption for appointment"
            placeholderTextColor="#aaa"
            scrollEnabled={false}
            textAlignVertical="top"
            style={{
              backgroundColor: '#eee',
              height: RFValue(150),
              // minHeight: RFValue(50),
              padding: RFValue(10),
              // paddingTop: Platform.OS === 'ios' ? RFValue(10) : 0,
              fontSize: RFValue(14),
              marginBottom: RFValue(10)
            }}
            value={state.description}
            multiline
            ref={inputRef}
            onFocus={() => setState({ ...state, calShowing: false })}
            onBlur={() => Keyboard.dismiss()}
            onChangeText={(description) => setState({ ...state, description })}
          />

          <Button
            title="Update Appointment"
            extStyles={{ borderWidth: 0, backgroundColor: Constants.darkGreen, marginBottom: RFValue(50) }}
            textStyles={{ color: '#fff' }}
            onPressIn={rescheduleAppointment}
          />
          <View style={{ height: 20 }} />
        </KeyboardAwareScrollView>
      </View>
    </React.Fragment>
  );
};

export default Booking;
