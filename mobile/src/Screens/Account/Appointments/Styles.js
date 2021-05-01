import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  modalButtons: (styles, btnSize) => ({
    width: `${btnSize}%`,
    paddingVertical: RFValue(15),
    borderRadius: RFValue(5),
    alignItems: 'center',
    backgroundColor: '#000',
    borderColor: 'red',
    ...styles
  }),
  btnText: (styles) => ({
    fontSize: RFValue(14),
    ...styles
  }),
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: RFValue(10),
    marginTop: RFValue(20)
    // borderTopWidth: 1,
    // paddingTop: RFValue(10)
  }
});
