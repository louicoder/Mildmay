import moment from 'moment';
import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Constants, HelperFunctions, Queries } from '../../Utils';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';

const Comments = ({ id, caption, likes, dateCreated, email, imageUrl, setLoading, comments, userInfo }) => {
  // const [ comments, setCommets ] = React.useState([]);
  const { user } = useSelector((state) => state.MyaPlus);
  console.log('ID', userInfo);

  React.useEffect(() => {
    // const subscribe = Queries.collectionRealTime(`Blogs/${id}/Comments`, (resp) => {
    //   console.log('Response comment son blog', resp);
    //   if (resp.docs) setCommets(resp.docs);
    // });
    // return subscribe;
  }, []);

  const likeHandler = async () => {
    setLoading(true);
    const _likes =
      likes.indexOf(auth().currentUser.uid) === -1
        ? [ ...likes, auth().currentUser.uid ]
        : likes.filter((item) => item !== auth().currentUser.uid);
    console.log('LIKESS', likes, _likes);

    await Queries.updateDoc('Blogs', id, { likes: _likes }, () => {
      console.log('Done updating');
      setLoading(false);
    });
  };

  const RenderCaption = () => (
    <View style={{ width: '100%' }}>
      {imageUrl ? <Image source={{ uri: imageUrl }} style={{ width: '100%', height: RFValue(300) }} /> : null}
      <View style={{ padding: RFValue(10) }}>
        <Text style={{ fontSize: imageUrl ? RFValue(16) : RFValue(30), fontWeight: imageUrl ? 'normal' : '700' }}>
          {caption}
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: RFValue(10),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: RFValue(10)
        }}
      >
        <View>
          <Text style={{ fontSize: RFValue(14) }}>
            {comments && comments.length} comments ・ {likes && likes.length} likes
          </Text>
          <Text style={{ color: '#aaa', fontSize: RFValue(12) }}>{moment(dateCreated).fromNow()} likes</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Icon
            name={likes && likes.includes(auth().currentUser.uid) ? 'heart' : 'heart-outline'}
            size={RFValue(30)}
            color="#000"
            onPress={likeHandler}
          />
          <Icon
            name="share"
            size={RFValue(30)}
            color="#000"
            style={{ marginHorizontal: RFValue(10), marginRight: imageUrl ? RFValue(10) : 0 }}
          />
          {imageUrl ? <Icon name="download" size={RFValue(30)} color="#000" /> : null}
        </View>
      </View>
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{}}
        keyExtractor={() => HelperFunctions.keyGenerator()}
        ListHeaderComponent={<RenderCaption />}
        data={comments}
        renderItem={({ index, item: { comment, dateCreated, userInfo: { email } } }) => (
          <View
            style={{
              marginBottom: index + 1 === comments.length ? RFValue(100) : RFValue(20),
              marginHorizontal: RFValue(10),
              marginTop: index === 0 ? RFValue(20) : 0,
              borderBottomWidth: index + 1 === comments.length ? 0 : 0.5,
              borderColor: '#eee',
              paddingBottom: RFValue(20)
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{
                  uri: userInfo.imageUrl || Constants.PROFILE_IMAGE
                }}
                style={{ width: RFValue(30), height: RFValue(30), borderRadius: RFValue(40) }}
              />
              <View>
                <Text style={{ fontSize: RFValue(12), marginLeft: RFValue(10), fontWeight: '700' }}>{email}</Text>
                <Text style={{ color: '#aaa', fontSize: RFValue(10), marginLeft: RFValue(10), fontWeight: 'normal' }}>
                  {moment(dateCreated).fromNow()}
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: 'rgba(0,0,0,.7)',
                fontSize: RFValue(12),
                marginLeft: RFValue(40),
                marginTop: RFValue(5)
              }}
            >
              {comment}
            </Text>
            {/* <View style={{ marginLeft: RFValue(40) }}>
              <Text style={{ color: '#aaa', marginTop: RFValue(5), fontSize: RFValue(12) }}>
                {moment(dateCreated).fromNow()}
              </Text>
            </View> */}
          </View>
        )}
      />
    </View>
  );
};

export default Comments;
