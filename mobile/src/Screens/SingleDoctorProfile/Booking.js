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
import styles from './Styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Button, Header } from '../../Components';
import auth from '@react-native-firebase/auth';
import LoadingModal from '../../Components/LoadingModal';
import { useDispatch, useSelector } from 'react-redux';

const Booking = ({ navigation, route: { params: profile }, ...props }) => {
  const loading = useSelector((state) => state.loading.effects.Doctors);
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const [ state, setState ] = React.useState({
    time: '8:00 - 9:00',
    timeShowing: true,
    calShowing: true,
    description: '',
    date: new Date().toISOString(),
    ...profile
  });

  const bookAppointment = () => {
    Keyboard.dismiss();
    const { date, time, description, uid, ...rest } = state;
    const payload = {
      date,
      description,
      time,
      dateCreated: new Date().toISOString(),
      doctorId: uid,
      patientId: auth().currentUser.uid,
      confirmed: false
    };

    try {
      dispatch.Doctors.createAppointment({
        payload,
        callback: ({ error, doc }) => {
          if (error) {
            setState({ ...state, loading: false });
            return Alert.alert('Error booking appointment', error);
          }
          setState({ ...state, loading: false });
          // return Alert.alert('Success', 'Successfully created your appointment with the doctor appointment', error);
          return navigation.goBack();
        }
      });
    } catch (error) {
      setState({ ...state, loading: false });
      return Alert.alert('Error booking appointment', error.message);
    }
  };

  return (
    <React.Fragment>
      <LoadingModal visible={loading.createAppointment} />
      <SafeAreaView style={{ flex: 1 }}>
        <Header title="Appointment details" navigation={navigation} />

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustContentInsets={false}
          style={{
            width: '100%',
            backgroundColor: '#fff',
            paddingBottom: useSafeAreaInsets().bottom,
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
              height: RFValue(250),
              // minHeight: RFValue(50),
              padding: RFValue(10),
              fontSize: RFValue(14),
              marginBottom: RFValue(10)
            }}
            value={state.description}
            multiline
            ref={inputRef}
            // onFocus={() => setState({ ...state, timeShowing: false, calShowing: false })}
            onBlur={() => Keyboard.dismiss()}
            onChangeText={(description) => setState({ ...state, description })}
          />

          <Button
            title="Book Appointment"
            extStyles={{ borderWidth: 0, backgroundColor: Constants.darkGreen }}
            textStyles={{ color: '#fff' }}
            onPressIn={bookAppointment}
          />
          <View style={{ height: 20 }} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default Booking;
