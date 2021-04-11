import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, ImageBackground, Pressable, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from '../../Components/LoadingModal';
import { HelperFunctions, Queries } from '../../Utils';

const Account = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Account);
  const [ image, setImage ] = React.useState({ uri: user.imageUrl });
  const [ state, setState ] = React.useState({ progress: null, isLoading: false, image: { uri: user.imageUrl } });

  const updatePhoto = () => {
    HelperFunctions.ImagePicker((img) => {
      console.log('Image here', img);
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
                  // console.log('Success updaing', success, result);
                  return (
                    success && setState({ ...state, image: { ...state.image, uri: result.imageUrl }, isLoading: false })
                  );
                }
              })
          )
      );
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ width: '100%', alignItems: 'center', paddingVertical: RFValue(10), marginTop: '10%' }}>
        <LoadingModal visible={state.isLoading} />
        <ImageBackground
          source={{
            uri: state.image.uri
          }}
          resizeMode="cover"
          style={{ width: RFValue(150), height: RFValue(150), borderRadius: RFValue(150) }}
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
            <Text style={{ color: '#fff', fontSize: RFValue(16) }}>Edit Photo</Text>
            <Icon name="pencil" size={RFValue(40)} color="#fff" />
            {state.progress && state.progress > 0 && state.progress < 100 ? (
              <Text style={{ color: '#fff', fontSize: RFValue(20), fontWeight: 'bold' }}>{state.progress}%</Text>
            ) : null}
          </Pressable>
        </ImageBackground>
        <View style={{ alignItems: 'center' }}>
          {user.name && <Text style={{ fontSize: RFValue(30), fontWeight: 'bold', color: '#000' }}>{user.name}</Text>}
          <Text style={{ fontSize: RFValue(14), color: '#000', marginVertical: RFValue(5) }}>{user.email}</Text>
        </View>
      </View>

      <ScrollView style={{ flexGrow: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>
          {/* {[ 'instagram', 'facebook', 'whatsapp', 'cog' ].map((name) => (
            <Ripple
              rippleCentered
              style={{
                width: RFValue(50),
                height: RFValue(50),
                alignItems: 'center',
                justifyContent: 'center',
                // borderWidth: RFValue(1),
                backgroundColor: '#eee',
                // borderColor: '#aaa',
                marginHorizontal: RFValue(5),
                borderRadius: RFValue(3)
              }}
            >
              <Icon name={name} size={RFValue(30)} color="#010203" />
            </Ripple>
          ))} */}
          <Pressable
            onPress={() => navigation.navigate('EditAccount')}
            style={{
              width: '60%',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#ccc',
              paddingVertical: RFValue(15),
              borderRadius: RFValue(5)
            }}
          >
            <Text style={{ fontSize: RFValue(16) }}>Edit Profile</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
