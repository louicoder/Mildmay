import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  followContainer: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(10),
    width: RFValue(50),
    height: RFValue(50),
    zIndex: 20
  },
  modalContainer: {
    // flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'center',
    margin: 0
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    height: RFValue(55),
    alignItems: 'center',
    paddingHorizontal: RFValue(10)
  }
});
