import moment from 'moment';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { Constants, HelperFunctions } from '../../../Utils';
import styles from './Styles';

const Info = ({ description, date, confirmed, cancel, confirm, reschedule, id, ...rest }) => {
  // console.log('Rendering Appoinemtn:::', rest);
  const { user } = useSelector((state) => state.Account);

  return (
    <View>
      <Text style={{ fontSize: RFValue(16), fontWeight: 'bold' }}>Appointment Details:</Text>
      <View style={{ borderTopWidth: 1, marginVertical: RFValue(10), borderColor: '#ddd' }} />
      <Text style={{ fontSize: RFValue(14), color: confirmed ? Constants.darkGreen : 'red' }}>
        Appointment {confirmed ? 'Confirmed 🎉' : 'Not Confirmed!'}
      </Text>
      <Text style={{ fontSize: RFValue(14), marginVertical: RFValue(15) }}>
        {description ? description : 'There is no description for this appointment'}
      </Text>

      <View style={{ borderTopWidth: 1, paddingTop: RFValue(10), borderTopColor: '#ddd' }}>
        <Text style={{ fontSize: RFValue(14) }}>
          <Text style={{ fontWeight: 'bold' }}>Date</Text> ・ {moment(date).format('DD-MMMM-YYYY')}
        </Text>
      </View>

      {/* Start buttons */}
      <View style={styles.btnContainer}>
        {[
          {
            label: 'Delete',
            // command: () => cancel(id),
            command: () => alert(id),
            btn: { backgroundColor: 'red' },
            text: { color: '#fff' },
            show: true
          },
          {
            label: 'Confirm',
            command: () => (confirmed ? null : confirm(id)),
            btn: { backgroundColor: confirmed ? '#aaa' : Constants.green, borderWidth: 0 },
            text: { color: '#fff' },
            show: user.accountType === 'Doctor'
          },
          { label: 'Edit', command: () => reschedule(id), btn: {}, text: { color: '#fff' }, show: true }
        ].map(
          ({ label, command, btn, text, show }) =>
            show && (
              <Pressable
                key={HelperFunctions.keyGenerator()}
                style={styles.modalButtons(btn, user.accountType === 'Doctor' ? 32 : 49)}
                onPress={command}
              >
                <Text style={[ styles.btnText(text) ]}>{label}</Text>
              </Pressable>
            )
        )}
      </View>
      {/* End of buttons */}
    </View>
  );
};

export default React.memo(Info);
