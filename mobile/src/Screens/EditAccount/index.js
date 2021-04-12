import React from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../Components';
import Input from '../../Components/Input';
import LoadingModal from '../../Components/LoadingModal';
import { Constants, Queries } from '../../Utils';
import firestore from '@react-native-firebase/firestore';
import Header from '../../Components/Header';

const EditAccount = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Account);
  const [ state, setState ] = React.useState({
    user: {},
    intsVisible: false,
    profsVisible: false,
    isLoading: false,
    interests: [],
    professions: [],
    name: '',
    // profession: 'teacher',
    phoneNumber: '',
    username: '',
    description: ''
  });

  React.useEffect(() => {
    const unsubscribe = firestore()
      .doc(`Users/${user.uid}`)
      .onSnapshot((snap) => setState({ ...state, ...snap.data(), uid: user.uid }));

    return unsubscribe;
  }, []);
  // console.log('USR', state.topics);

  const updateProfile = async () => {
    setState({ ...state, isLoading: true });
    const { intsVisible, profsVisible, isLoading, ...rest } = state;

    await Queries.updateDoc('Users', user.uid, rest, async ({ doc }) => {
      dispatch.Account.setUserDetails(doc);
      setState({ ...state, isLoading: false, user: { ...state.user, ...doc } });
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoadingModal visible={state.isLoading} />
      <Header title="Edit your profile" navigation={navigation} />
      <KeyboardAwareScrollView
        style={{ paddingHorizontal: RFValue(10), flexGrow: 1, paddingTop: RFValue(20) }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexGrow: 1, marginBottom: RFValue(20) }}>
          <Input
            value={state.name}
            onChangeText={(name) => setState({ ...state, name })}
            placeholder="Enter your full name"
            title="Full name"
          />
          {/* <Input
            value={state.profession}
            onChangeText={(profession) => setState({ ...state, profession })}
            placeholder="Enter your profession"
            title="Profession"
          /> */}
          <Input
            value={state.phoneNumber}
            onChangeText={(phoneNumber) => setState({ ...state, phoneNumber })}
            placeholder="Enter your phone number"
            title="Phone number"
          />
          <Input
            value={state.username}
            onChangeText={(username) => setState({ ...state, username })}
            placeholder="Enter your name"
            title="Username"
          />
          <Input
            value={state.description}
            onChangeText={(description) => setState({ ...state, description })}
            placeholder="Enter brief description of yourself"
            title="Description"
          />
          <Text style={{ fontSize: RFValue(12), marginBottom: RFValue(10) }}>Select your interests</Text>

          <Pressable
            onPress={() => setState({ ...state, intsVisible: !state.intsVisible })}
            style={{
              height: RFValue(50),
              backgroundColor: '#eee',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: RFValue(10),
              marginBottom: RFValue(10),
              borderRadius: RFValue(5)
            }}
          >
            <Text style={{ flexGrow: 1, fontSize: RFValue(14) }}>
              {state.interests && state.interests.length ? (
                `${state.interests.join(',').slice(0, 40)}${state.interests.join(',').length > 40 ? '...' : ''}`
              ) : (
                'No interests selected'
              )}
            </Text>
            <Icon name={state.intsVisible ? 'chevron-up' : 'chevron-down'} size={RFValue(20)} />
          </Pressable>
          {state.intsVisible && (
            <ScrollView
              horizontal
              style={{
                // marginBottom: RFValue(10),
                // flexDirection: 'row',
                // justifyContent: 'flex-start',
                // flexWrap: 'wrap'
              }}
            >
              {Constants.topics.map((topic) => (
                <Pressable
                  onPress={() =>
                    state.interests && state.interests.includes(topic)
                      ? setState({ ...state, interests: state.interests.filter((to) => to !== topic) })
                      : setState({ ...state, interests: [ ...state.interests, topic ] })}
                  style={{
                    borderWidth: 1,
                    borderColor: state.interests && state.interests.includes(topic) ? '#000' : '#eee',
                    padding: RFValue(10),
                    marginBottom: RFValue(5),
                    marginHorizontal: RFValue(3),
                    borderRadius: RFValue(30),
                    backgroundColor: state.interests && state.interests.includes(topic) ? '#000' : '#fff'
                  }}
                >
                  <Text style={{ color: state.interests && state.interests.includes(topic) ? '#fff' : '#000' }}>
                    {topic}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          )}

          <Text style={{ fontSize: RFValue(12), marginBottom: RFValue(10) }}>Select your profession</Text>

          <Pressable
            onPress={() => setState({ ...state, profsVisible: !state.profsVisible })}
            style={{
              height: RFValue(50),
              backgroundColor: '#eee',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: RFValue(10),
              marginBottom: RFValue(10),
              borderRadius: RFValue(5)
            }}
          >
            <Text style={{ flexGrow: 1, fontSize: RFValue(14) }}>
              {state.professions && state.professions.length ? (
                `${state.professions.join(',').slice(0, 40)}${state.professions.join(',').length > 40 ? '...' : ''}`
              ) : (
                'No interests selected'
              )}
            </Text>
            <Icon name={state.profsVisible ? 'chevron-up' : 'chevron-down'} size={RFValue(20)} />
          </Pressable>
          {state.profsVisible && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                marginBottom: RFValue(10)
                // flexDirection: 'row',
                // justifyContent: 'flex-start',
                // flexWrap: 'wrap'
              }}
            >
              {Constants.professions.map((topic) => (
                <Pressable
                  onPress={() =>
                    state.professions && state.professions.includes(topic)
                      ? setState({ ...state, professions: state.professions.filter((to) => to !== topic) })
                      : setState({ ...state, professions: [ ...state.professions, topic ] })}
                  style={{
                    borderWidth: 1,
                    borderColor: state.professions && state.professions.includes(topic) ? '#000' : '#eee',
                    padding: RFValue(10),
                    marginBottom: RFValue(5),
                    marginHorizontal: RFValue(3),
                    borderRadius: RFValue(30),
                    backgroundColor: state.professions && state.professions.includes(topic) ? '#000' : '#fff'
                  }}
                >
                  <Text style={{ color: state.professions && state.professions.includes(topic) ? '#fff' : '#000' }}>
                    {topic}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          )}

          <Button
            onPress={updateProfile}
            title="Update Profile"
            extStyles={{ backgroundColor: 'green', marginBottom: RFValue(10) }}
            textStyles={{ color: '#fff' }}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditAccount;
