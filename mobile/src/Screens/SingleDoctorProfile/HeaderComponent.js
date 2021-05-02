import React from 'react';
import { View, Text, Pressable, Image, ScrollView, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import styles from './Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Constants, HelperFunctions, Queries } from '../../Utils';
import { useSelector } from 'react-redux';

const HeaderComponent = ({ showModal, navigation, setLoading, getDoctorDetails, profile, ...state }) => {
  const followed = state.followers && state.followers.includes(auth().currentUser.uid);
  const { user } = useSelector((state) => state.Account);

  const followUnfollowHandler = async () => {
    // setLoading(true);
    // const uid = auth().currentUser.uid;
    // const following = checkExists(state.followers)
    //   ? { following: firestore.FieldValue.arrayRemove(uid) }
    //   : { followers: firestore.FieldValue.arrayUnion(uid) };
    // const followers = checkExists(state.followers)
    //   ? { followers: firestore.FieldValue.arrayRemove(uid) }
    //   : { followers: firestore.FieldValue.arrayUnion(uid) };
    // console.log('STate, auth', followers, following);
    // await Queries.updateDoc('Users', uid, { following }, async (resp) => {
    //   if (resp.error) {
    //     return Error(
    //       `Error ${followed ? 'unfollowing' : 'following'} doctor`,
    //       `There was an trying to ${followed ? 'unfollow' : 'follow'} this doctor, please try again \n ${resp.error}`
    //     );
    //   }
    //   await Queries.updateDoc('Users', rest.uid, { followers }, (resp) => {
    //     getDoctorDetails();
    //     return setLoading(false);
    //   });
    // });
  };

  // console.log('STate use', profile);
  const checkExists = (array) => array.includes(auth().currentUser.uid);

  const Error = (title, msg) => Alert.alert(title, msg);

  return (
    <View style={{}}>
      <Image
        source={{
          uri: profile.imageUrl
        }}
        style={{ width: '100%', height: RFValue(300) }}
        resizeMode="cover"
      />

      <View style={{ marginVertical: RFValue(20) }}>
        <Text style={{ fontWeight: 'bold', fontSize: RFValue(20) }}>
          {profile.name ? 'DR.' : null}
          {profile.name ? ' ' : ''}
          {profile.name || profile.email}
        </Text>
        <Text style={{ fontSize: RFValue(12), color: '#aaa', marginBottom: RFValue(10) }}>
          Joined - {moment(profile.dateJoined).fromNow()}
        </Text>

        <View style={styles.buttonsContainer}>
          <Pressable style={styles.buttons} onPress={() => navigation.navigate('Booking', profile)}>
            <Icon name="calendar-month-outline" size={RFValue(20)} style={styles.buttonIcons} color="#fff" />
            <Text style={{ fontSize: RFValue(16), color: '#fff' }}>Book</Text>
          </Pressable>

          <Pressable
            style={styles.buttons}
            onPress={() =>
              profile.phoneNumber
                ? HelperFunctions.callNumber(profile.phoneNumber)
                : Alert.alert(
                    'No number',
                    'This doctor has not yet added their phone number yet. Keep checking to see when they have updated their account details'
                  )}
          >
            <Icon name="phone" size={RFValue(20)} style={styles.buttonIcons} color="#fff" />
            <Text style={{ fontSize: RFValue(16), color: '#fff' }}>Call</Text>
          </Pressable>
          <Pressable
            style={[ styles.buttons, { backgroundColor: '#eee' } ]}
            // onPress={() => navigation.navigate('Reviews', { uid: profile.uid })}
            onPress={() => null}
          >
            <Icon name="message" size={RFValue(20)} style={styles.buttonIcons} color={Constants.green} />
            <Text style={{ fontSize: RFValue(16), color: Constants.darkGreen }}>Reviews</Text>
          </Pressable>
        </View>

        <View
          showsHorizontalScrollIndicator={false}
          // horizontal
          style={{ fontSize: RFValue(14), flexDirection: 'row', width: '100%', flexWrap: 'wrap' }}
        >
          <Text style={{ fontSize: RFValue(16), fontWeight: 'bold', marginBottom: RFValue(10) }}>
            Doctor's skills :
          </Text>
          <Text
            style={{
              fontSize: RFValue(14),
              color: profile.professions && profile.professions.length ? '#000' : '#ccc'
            }}
          >
            {profile.professions && profile.professions.length ? (
              profile.professions.join(', ')
            ) : (
              'This doctor has not added any professions to their profiles yet'
            )}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderComponent;
