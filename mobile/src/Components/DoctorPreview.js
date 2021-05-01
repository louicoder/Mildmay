import moment from 'moment';
import React from 'react';
import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Constants, Queries } from '../Utils';
import auth from '@react-native-firebase/auth';
import styles from './Styles';

const DoctorPreview = ({ navigation, profile, ...rest }) => {
  // console.log('REndering DoctorPREview::');
  const followed = profile.followers && profile.followers.includes(auth().currentUser.uid);
  const [ loading, setLoading ] = React.useState(false);

  const followUnfollowHandler = async () => {
    setLoading(true);

    const uid = auth().currentUser.uid;
    const following = followed
      ? profile.followers.filter((follower) => follower !== uid)
      : [ ...profile.followers, uid ];
    const followers = [ ...profile.following, uid ];
    await Queries.updateDoc('Users', uid, { following }, async (resp) => {
      return await Queries.updateDoc('Users', profile.uid, { followers }, (resp) => {
        setLoading(false);
      });
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
      }}
      onPress={() => navigation.push('DoctorProfile', profile)}
    >
      <View style={{ width: RFValue(60), flexDirection: 'row', width: '80%', alignItems: 'center' }}>
        <Image
          source={{
            uri: profile.imageUrl || Constants.PROFILE_IMAGE
          }}
          style={{ width: RFValue(50), height: RFValue(50), borderRadius: RFValue(60) }}
          resizeMode="cover"
        />
        <View style={{ paddingLeft: RFValue(10), width: '80%' }}>
          <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>{profile.name || profile.email}</Text>
          <View style={{ width: '100%' }}>
            <Text style={{ fontSize: RFValue(12) }}>
              {profile.professions && profile.professions.length ? (
                profile.professions.join(', ').slice(0, 50)
              ) : (
                'No professsions added yet.'
              )}
              {profile.professions && profile.professions.join(', ').length > 50 ? '...' : ''}
            </Text>
          </View>
          <Text style={{ fontSize: RFValue(12), color: '#aaa' }}>Joined {moment(profile.dateJoined).fromNow()}</Text>
        </View>
      </View>
      {!followed && (
        <Pressable onPress={followUnfollowHandler} style={styles.followContainer}>
          {loading ? (
            <ActivityIndicator size={RFValue(20)} />
          ) : (
            <Icon name="account-multiple-plus-outline" size={RFValue(25)} color="green" />
          )}
        </Pressable>
      )}
    </Pressable>
  );
};

export default DoctorPreview;
