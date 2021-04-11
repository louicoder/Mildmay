import moment from 'moment';
import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import DoctorReview from '../../Components/DoctorReview';
import Header from '../../Components/Header';
import Modal from '../../Components/Modal';
import auth from '@react-native-firebase/auth';

const Profile = (props) => {
  const { user: doctor } = useSelector((state) => state.Account);
  const [ state, setState ] = React.useState({ modalVisible: true, ...props.route.params });

  const followed = state.followers && state.followers.includes(auth().currentUser.uid);
  console.log('DOC', followed, state.followers);

  const HeaderComponent = () => (
    <View style={{}}>
      <Image
        source={{
          uri: state.imageUrl
        }}
        style={{ width: '100%', height: RFValue(350) }}
        resizeMode="cover"
      />

      <View style={{ marginVertical: RFValue(20), paddingHorizontal: RFValue(10) }}>
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
          {state.professions.map((profession) => (
            <Text
              style={{
                paddingVertical: RFValue(8),
                paddingHorizontal: RFValue(10),
                backgroundColor: '#eee',
                borderRadius: RFValue(50),
                fontSize: RFValue(12),
                marginRight: RFValue(5)
              }}
            >
              {profession}
            </Text>
          ))}
        </ScrollView>
      </View>
      <View
        style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: RFValue(10) }}
      >
        <Pressable
          style={{
            width: '48%',
            height: RFValue(50),
            backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ fontSize: RFValue(16), color: '#fff' }}>
            <Icon name="calendar-month-outline" size={RFValue(20)} style={{ marginRight: RFValue(10) }} /> Book doctor
          </Text>
        </Pressable>
        <Pressable style={{ width: '48%', backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: RFValue(16), color: 'green' }}>
            <Icon
              name={followed ? 'account-multiple-minus-outlined' : 'account-multiple-plus-outlined'}
              size={RFValue(20)}
              style={{ marginRight: RFValue(10) }}
            />{' '}
            Follow Doctor
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: RFValue(10),
          justifyContent: 'space-between',
          marginVertical: RFValue(20),
          alignItems: 'center',
          borderTopWidth: 1,
          paddingTop: RFValue(20),
          borderTopColor: '#eee'
        }}
      >
        <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>Latest Reviews:</Text>
        <Pressable
          style={{
            height: RFValue(40),
            backgroundColor: '#010203',
            paddingHorizontal: RFValue(10),
            justifyContent: 'center'
          }}
        >
          <Text style={{ fontSize: RFValue(14), color: '#fff' }}>See all Reviews</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={state.modalVisible} closeModal={() => setState({ ...state, modalVisible: false })}>
        <View style={{ height: RFValue(200), backgroundColor: '#fff', width: '100%' }}>
          <Text>sdfsfsd</Text>
        </View>
      </Modal>
      <SafeAreaView style={{ flex: 1 }}>
        <Header title="Doctor Profile" navigation={props.navigation} />

        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<HeaderComponent />}
          style={{ flexGrow: 1 }}
          data={[ 0, 1 ]}
          renderItem={() => <DoctorReview />}
        />
      </SafeAreaView>
    </View>
  );
};

export default Profile;
