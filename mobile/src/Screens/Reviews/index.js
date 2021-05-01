import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { DoctorReview, Header } from '../../Components';
import { Constants, HelperFunctions, Queries } from '../../Utils';
import LoadingModal from '../../Components/LoadingModal';
import CommentBox from './CommentBox';

const Reviews = (props) => {
  const dispatch = useDispatch();
  const [ state, setState ] = React.useState({ review: '', reviews: [] });
  const { user } = useSelector((state) => state.Account);
  const { postReview: PR } = useSelector((state) => state.loading.effects.Doctors);
  // const reviews = [];

  React.useEffect(() => {
    // const sub = firestore()
    //   .collection('Reviews')
    //   .where('uid', '==', props.route.params.uid)
    //   .onSnapshot((snapshot) => {
    //     const reviews = [ ...snapshot.docs.map((snap) => ({ ...snap.data(), id: snap.id })) ];
    //     const resp = HelperFunctions.addUsersInfoToArray(reviews, 'uid', (response) => {
    //       console.log('After adding users info', response);
    //       if (response.doc) setState({ ...state, reviews: response.doc });
    //     });
    //   });
    // return sub;
    getReviews();
  }, []);

  const getReviews = async () => {
    await firestore()
      .collection('Reviews')
      .where('uid', '==', props.route.params.uid)
      .get()
      .then((snapshot) => {
        const reviews = [ ...snapshot.docs.map((snap) => ({ ...snap.data(), id: snap.id })) ];
        HelperFunctions.addUsersInfoToArray(reviews, 'uid', (response) => {
          // console.log('After adding users info', response);
          if (response.doc) setState({ ...state, reviews: response.doc });
        });
      })
      .catch((error) => Alert.alert('Error getting reviews', error.messsage));
  };

  const postReviewHandler = (review) => {
    const payload = {
      reviewer: auth().currentUser.uid,
      review,
      dateCreated: new Date().toISOString(),
      uid: props.route.params.uid
    };

    dispatch.Doctors.postReview({
      payload,
      callback: (response) => {
        // console.log('REsponse post review', response);
        if (response.error) return Alert.alert('Error creating review', response.error);
        setState({ ...state, review: '' });
        getReviews();
      }
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <LoadingModal visible={PR} />
      <Header
        // extStyles={{ marginTop: useSafeAreaInsets().top }}
        {...props}
        title="All Reviews"
        iconName="plus"
        leftComp={() => <Icon name="plus" size={RFValue(25)} color={Constants.darkGreen} onPress={() => null} />}
      />
      {/* </SafeAreaView> */}

      <View
        style={{
          width: '100%',
          // position: 'absolute',
          height: RFValue(50),
          // backgroundColor: Constants.green,
          bottom: 0,
          marginVertical: RFValue(10),

          zIndex: 10,
          paddingHorizontal: RFValue(10),
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <Image
          source={{ uri: user.imageUrl }}
          style={{ width: RFValue(40), height: RFValue(40), borderRadius: RFValue(50) }}
        />
        <CommentBox onPress={postReviewHandler} />
      </View>
      {state.reviews && state.reviews.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 1, paddingHorizontal: RFValue(10), paddingTop: RFValue(20) }}
          data={state.reviews}
          keyExtractor={() => HelperFunctions.keyGenerator()}
          renderItem={({ item, index }) => <DoctorReview {...item} last={index === state.reviews.length - 1} />}
        />
      ) : null}
      {state.reviews && !state.reviews.length ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: RFValue(14) }}>No reviews yet...</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Reviews;
