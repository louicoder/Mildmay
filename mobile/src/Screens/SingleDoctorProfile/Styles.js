import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Constants } from '../../Utils';

export default StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
    // paddingHorizontal: RFValue(10)
  },
  buttons: {
    width: '32%',
    height: RFValue(50),
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttonIcons: {
    marginRight: RFValue(5)
  },
  profText: {
    paddingVertical: RFValue(8),
    backgroundColor: '#eee',
    borderRadius: RFValue(50),
    fontSize: RFValue(12),
    marginRight: RFValue(5)
  },
  reviewsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: RFValue(20),
    alignItems: 'center',
    borderTopColor: '#eee'
  },
  allReviewsBtn: {
    height: RFValue(50),
    backgroundColor: '#010203',
    paddingHorizontal: RFValue(10),
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center'
  },
  dateTimeText: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    backgroundColor: '#eeeeee90',
    padding: RFValue(10),
    flexGrow: 1,
    marginHorizontal: RFValue(10),
    textAlign: 'center',
    color: Constants.green
  },
  dropIcon: {
    height: RFValue(40),
    width: RFValue(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    borderRadius: RFValue(50)
  },
  descText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: RFValue(15)
  }
});
