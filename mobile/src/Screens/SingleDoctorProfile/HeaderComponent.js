import React from 'react';
import { View, Text, Pressable, Image, ScrollView, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import styles from './Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
// import { Queries } from '../../Utils';

const HeaderComponent = ({ showModal, navigation, setLoading, getDoctorDetails, ...state }) => {
  const followed = state.followers && state.followers.includes(auth().currentUser.uid);

  const followUnfollowHandler = async () => {
    setLoading(true);
    const uid = auth().currentUser.uid;
    const followers = followed ? state.followers.filter((follower) => follower !== uid) : [ ...state.followers, uid ];
    try {
      await Queries.updateDoc('Users', state.uid, { followers }, (resp) => {
        if (resp.error) {
          setLoading(false);
          return Alert.alert(
            `Error ${followed ? 'unfollowing' : 'following'} doctor`,
            `There was an trying to ${followed ? 'unfollow' : 'follow'} this doctor, please try again \n ${resp.error}`
          );
        }
        return getDoctorDetails();
      });
    } catch (error) {
      setLoading(false);
      return Alert.alert(
        `Error ${followed ? 'unfollowing' : 'following'} doctor`,
        `There was an trying to ${followed ? 'unfollow' : 'follow'} this doctor, please try again \n ${error.message}`
      );
    }
  };

  return (
    <View style={{}}>
      <Image
        source={{
          uri: state.imageUrl
        }}
        style={{ width: '100%', height: RFValue(300) }}
        resizeMode="cover"
      />

      <View style={{ marginVertical: RFValue(20) }}>
        <Text style={{ fontWeight: 'bold', fontSize: RFValue(20) }}>
          {state.name ? 'DR.' : null}
          {state.name ? ' ' : ''}
          {state.name || state.email}
        </Text>
        <Text style={{ fontSize: RFValue(14), marginVertical: RFValue(5), color: '#aaa', marginBottom: RFValue(10) }}>
          Joined - {moment(state.dateJoined).fromNow()}
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ fontSize: RFValue(14), flexDirection: 'row', width: '100%', flexWrap: 'wrap' }}
        >
          {state.professions.map((profession) => <Text style={styles.profText}>{profession}</Text>)}
        </ScrollView>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.buttons} onPressIn={showModal}>
          <Icon name="calendar-month-outline" size={RFValue(20)} style={styles.buttonIcons} color="#fff" />
          <Text style={{ fontSize: RFValue(16), color: '#fff' }}>Book</Text>
        </Pressable>

        <Pressable style={styles.buttons}>
          <Icon name="phone" size={RFValue(20)} style={styles.buttonIcons} color="#fff" />
          <Text style={{ fontSize: RFValue(16), color: '#fff' }}>Call</Text>
        </Pressable>
        <Pressable style={[ styles.buttons, { backgroundColor: '#eee' } ]} onPressIn={followUnfollowHandler}>
          <Text style={{ fontSize: RFValue(16), color: 'green' }}>{followed ? 'UnFollow' : 'Follow'}</Text>
        </Pressable>
      </View>
      <View style={styles.reviewsContainer}>
        <Pressable style={styles.allReviewsBtn} onPress={() => navigation.navigate('Reviews', { uid: state.uid })}>
          <Text style={{ fontSize: RFValue(14), color: '#fff' }}>See all Reviews</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HeaderComponent;
