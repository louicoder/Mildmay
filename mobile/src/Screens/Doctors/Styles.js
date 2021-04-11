import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Constants } from '../../Utils';

export default StyleSheet.create({
  professionContainer: (exists) => ({
    paddingHorizontal: RFValue(10),
    // paddingVertical: RFValue(10),
    borderWidth: 1,
    borderColor: Constants.green,
    borderRadius: RFValue(100),
    marginHorizontal: RFValue(5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: exists ? Constants.green : 'transparent'
    // height: RFValue(40)
  }),
  proText: (exists) => ({
    fontSize: RFValue(14),
    color: exists ? '#fff' : Constants.green
  }),
  followContainer: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(10),
    width: RFValue(50),
    height: RFValue(50),
    zIndex: 20
  }
});
