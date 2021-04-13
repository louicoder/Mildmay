import { Platform, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Constants } from '../../Utils';

export default StyleSheet.create({
  commentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // height: RFValue(40),
    paddingHorizontal: RFValue(5)
  },
  textInput: {
    width: '75%',
    backgroundColor: '#fff',
    // height: '100%',
    height: RFValue(40),
    // maxHeight: RFValue(100),
    backgroundColor: '#eee',
    paddingHorizontal: RFValue(10),
    paddingTop: Platform.OS === 'ios' ? RFValue(10) : 0,
    fontSize: RFValue(13)
  },
  postText: { fontSize: RFValue(14), color: Constants.green }
});
