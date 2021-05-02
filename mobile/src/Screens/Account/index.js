import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
  Pressable,
  Alert,
  Dimensions
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from '../../Components/LoadingModal';
import { Constants, HelperFunctions, Queries } from '../../Utils';
import auth from '@react-native-firebase/auth';
import Missing from './Missing';
import moment from 'moment';
import Appointment from './Appointment';

const { width, height } = Dimensions.get('window');

const Account = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, blogs, appointments } = useSelector((state) => state.Account);
  const loading = useSelector((state) => state.Account);
  const [ image, setImage ] = React.useState({ uri: user.imageUrl });
  const [ state, setState ] = React.useState({
    progress: null,
    isLoading: false,
    image: { uri: user.imageUrl },
    ...user
  });

  React.useEffect(() => {
    getUserAppointments();
    getUserBlogs();
  }, []);

  const getUserAppointments = () =>
    dispatch.Account.getUserAppointments({
      field: user.accountType === 'Doctor' ? 'doctorId' : 'patientId',
      uid: auth().currentUser.uid,
      callback: (resp) => {
        // console.log('REsponse Appointments', resp.result[0]);
      }
    });

  const getUserBlogs = () =>
    dispatch.Account.getUserBlogs({
      field: 'uid',
      uid: auth().currentUser.uid,
      callback: (resp) => {
        // console.log('REsponse', resp);
        // setState({ ...state, isLoading: false });
      }
    });

  const updatePhoto = () =>
    HelperFunctions.CHECK_PERMISSIONS(({ success, error }) => {
      if (!success) return Alert.alert('Failed', `Something went wrong: ${error} `);
      ImagePicker((image) => {
        if (image.uri) {
          setState({ ...state, image: { ...state.image, ...img } });
          HelperFunctions.uploadImage(
            `Profiles/${user.uid}/${img.fileName}`,
            img.uri,
            (progress) => setState({ ...state, progress, image: { ...state.image, ...img }, isLoading: true }),
            (error) => console.log('Error uploading image'),
            async (imageUrl) =>
              await Queries.updateDoc(
                'Users',
                user.uid,
                { imageUrl },
                async () =>
                  await dispatch.Account.getUserDetails({
                    uid: user.uid,
                    callback: ({ success, result }) => {
                      return (
                        success &&
                        setState({ ...state, image: { ...state.image, uri: result.imageUrl }, isLoading: false })
                      );
                    }
                  })
              )
          );
        }
      });
    });

  React.useEffect(() => {
    const sub = getUser();
    return () => sub;
  }, []);

  const getUser = () => {
    Queries.documentRealTime('Users', auth().currentUser.uid, (resp) => {
      setState({ ...state, ...resp.doc });
    });
  };

  React.useEffect(() => {
    const sub = getUserReviews();
    return () => sub;
  }, []);

  const getUserReviews = () => {
    firestore().collection('Reviews').where('uid', '==', user.uid).onSnapshot((snapshot) => {
      const reviews = [ ...snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) ];
      // console.log('Reviews', reviews);
      setState({ ...state, reviews });
    });
  };

  // console.log('Appointments.', appointments && appointments.length);

  return (
    <React.Fragment>
      <LoadingModal visible={state.isLoading || loading.getUserBlogs || loading.getUserAppointments} />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ width: '100%', alignItems: 'center', paddingVertical: RFValue(10), marginTop: RFValue(0) }}>
          <ImageBackground
            source={{
              uri: state.image.uri
            }}
            resizeMode="cover"
            style={{ width: RFValue(100), height: RFValue(100), borderRadius: RFValue(150) }}
            imageStyle={{ borderRadius: RFValue(150) }}
          >
            <Pressable
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,.5)',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: RFValue(150)
              }}
              onPress={updatePhoto}
            >
              {/* <Text style={{ color: '#fff', fontSize: RFValue(16) }}>Edit Photo</Text> */}
              <Icon name="pencil" size={RFValue(40)} color="#fff" />
              {state.progress && state.progress > 0 && state.progress < 100 ? (
                <Text style={{ color: '#fff', fontSize: RFValue(20), fontWeight: 'bold' }}>{state.progress}%</Text>
              ) : null}
            </Pressable>
          </ImageBackground>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: RFValue(16), fontWeight: 'bold', color: '#000', marginTop: RFValue(5) }}>
              {user.name || user.username || user.email}
            </Text>
            {/* <Text style={{ fontSize: RFValue(14), color: '#000', marginVertical: RFValue(5) }}>{user.email}</Text> */}
          </View>
        </View>

        <Pressable
          onPress={() => navigation.navigate('EditAccount')}
          style={{
            borderWidth: 1,
            borderColor: '#aaa',
            borderRadius: RFValue(3),
            width: '60%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            height: RFValue(40)
          }}
        >
          <Text style={{ fontSize: RFValue(14) }}>Edit Profile</Text>
        </Pressable>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: RFValue(15),
            width: '95%',
            alignSelf: 'center'
          }}
        >
          {[
            { label: 'Following', value: state.following && state.following.length },
            { label: 'Followers', value: state.followers && state.followers.length }
            // { label: 'Reviews', value: state.reviews && state.reviews.length }
          ].map(({ label, value }, index) => (
            <Pressable
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#eee',
                paddingVertical: RFValue(10),
                width: '49%'
              }}
              key={HelperFunctions.keyGenerator()}
              // style={{  }}
            >
              <Text style={{ fontSize: RFValue(30), color: Constants.green, fontWeight: 'bold' }}>{value}</Text>
              <Text style={{ fontSize: RFValue(14) }}>{label}</Text>
            </Pressable>
          ))}
        </View>

        {/* End Statistics */}
        <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{}}>
            {blogs && blogs.length ? (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: RFValue(10) }}>
                <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>Latest blog posts</Text>
                <Pressable style={{ alignSelf: 'flex-end' }} onPress={() => navigation.navigate('OwnedBlogs')}>
                  <Text style={{ fontSize: RFValue(14), fontWeight: 'normal', color: 'blue' }}>View All</Text>
                </Pressable>
              </View>
            ) : null}
            {blogs && blogs.length ? (
              <FlatList
                style={{ marginVertical: RFValue(15), marginHorizontal: RFValue(10) }}
                showsHorizontalScrollIndicator={false}
                data={blogs && blogs.slice(0, 5)}
                horizontal
                keyExtractor={() => HelperFunctions.keyGenerator()}
                renderItem={({ item, index }) => (
                  <Pressable
                    style={{
                      // borderWidth: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      padding: RFValue(10),
                      paddingVertical: RFValue(20),
                      backgroundColor: '#eee',
                      width: blogs.length === 1 ? width - RFValue(20) : width - RFValue(50),
                      height: RFValue(150),
                      marginRight: index === blogs.length ? 0 : RFValue(10)
                    }}
                    onPress={() => navigation.navigate('MyaPlusHome', item)}
                  >
                    <Text style={{ fontWeight: 'normal', fontSize: RFValue(16) }}>
                      {item && item.caption.slice(0, 80)}
                      {item && item.caption.length > 80 ? '...' : ''}
                    </Text>
                    <View
                      style={{ alignItems: 'flex-end', position: 'absolute', bottom: RFValue(10), right: RFValue(10) }}
                    >
                      <Text style={{ color: '#aaa', fontSize: RFValue(10) }}>
                        Created: {moment(item.dateCreated).fromNow()}
                      </Text>
                      <Text style={{ color: '#000000', fontSize: RFValue(10) }}>
                        {item.topics && item.topics.slice(0, 3).join(', ')}
                      </Text>
                    </View>
                  </Pressable>
                )}
              />
            ) : null}

            {blogs && !blogs.length ? (
              <Missing
                onPress={() => navigation.navigate('CreateBlogPost')}
                text="You have no blogs yet, click here to create your first blog post.."
              />
            ) : null}

            {appointments && appointments.length ? (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: RFValue(10) }}>
                <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>Latest Appointments:</Text>
                <Pressable style={{ alignSelf: 'flex-end' }} onPress={() => navigation.navigate('MyAppointments')}>
                  <Text style={{ fontSize: RFValue(14), fontWeight: 'normal', color: 'blue' }}>View All</Text>
                </Pressable>
              </View>
            ) : null}
            {appointments && appointments.length ? (
              <FlatList
                style={{ marginVertical: RFValue(15), marginHorizontal: RFValue(10) }}
                showsHorizontalScrollIndicator={false}
                data={appointments && appointments.slice(0, 5)}
                horizontal
                keyExtractor={() => HelperFunctions.keyGenerator()}
                renderItem={(props) => <Appointment {...props} onPress={() => null} len={blogs && blogs.length} />}
              />
            ) : null}

            {appointments && !appointments.length ? (
              <Missing
                onPress={() => null}
                text="You have no appointments yet, All your appointments will appear here."
              />
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default Account;
