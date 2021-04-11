import moment from 'moment';
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Constants, Queries } from '../Utils';
import auth from '@react-native-firebase/auth';
import styles from './Styles';

const DoctorPreview = ({ navigation, setLoading, ...rest }) => {
  const followed = rest.followers.includes(auth().currentUser.uid);

  const followUnfollowHandler = async () => {
    setLoading(true);

    const uid = auth().currentUser.uid;
    const followers = followed ? rest.followers.filter((follower) => follower !== uid) : [ ...rest.followers, uid ];
    // console.log('followers', followers);
    await Queries.updateDoc('Users', rest.uid, { followers }, (resp) => {
      // console.log('Rspponse from following');
      setLoading(false);
    });
  };

  return (
    <Pressable
      style={{
        marginVertical: RFValue(10),
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
        // borderWidth: 1
      }}
      onPress={() => navigation.navigate('DoctorProfile', rest)}
    >
      <View style={{ width: RFValue(60), flexDirection: 'row', width: '80%' }}>
        <Image
          source={{
            uri: rest.imageUrl || Constants.PROFILE_IMAGE
          }}
          style={{ width: RFValue(60), height: RFValue(60), borderRadius: RFValue(10) }}
          resizeMode="cover"
        />
        <View style={{ paddingLeft: RFValue(10), width: '80%' }}>
          <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>{rest.name || rest.email}</Text>
          <View style={{ width: '100%' }}>
            <Text style={{ fontSize: RFValue(12) }}>
              {rest.professions.length ? rest.professions.join(', ') : 'No professsions added yet.'}
            </Text>
          </View>
          <Text style={{ fontSize: RFValue(12), color: '#aaa' }}>
            Joined {moment(rest.dateJoined).fromNow()} ・ {rest.reviews && rest.reviews.length} reviews
          </Text>
        </View>
      </View>
      <Pressable onPress={followUnfollowHandler} style={styles.followContainer}>
        <Icon
          name={followed ? 'account-multiple-minus-outline' : 'account-multiple-plus-outline'}
          size={RFValue(25)}
          color="green"
        />
      </Pressable>
    </Pressable>
  );
};

export default DoctorPreview;
