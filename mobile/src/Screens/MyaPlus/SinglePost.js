import React from 'react';
import { View, Text, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SinglePost = ({
  caption = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est autem officium, quod ita factum est, ut eius facti probabilis ratio reddi possit. Tum Quintus: Est plane, Piso, ut dicis, inquit. Sit ista in Graecorum levitate pervers',
  imageUrl = ''
}) => {
  const [ state, setState ] = React.useState({ comments: [], likes: [] });
  return (
    <View>
      {imageUrl ? (
        <View>
          <Image source={{ uri: imageUrl }} style={{ width: '100%', height: RFValue(300) }} />
          <Text style={{ fontSize: RFValue(16), marginHorizontal: RFValue(10), marginVertical: RFValue(15) }}>
            {caption}
          </Text>
        </View>
      ) : (
        <View style={{ backgroundColor: '#eee', padding: RFValue(10) }}>
          <Text style={{ fontSize: RFValue(30), marginVertical: RFValue(10), fontWeight: '700' }}>{caption}</Text>
        </View>
      )}
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
          <Text style={{ color: '#000', fontSize: RFValue(14) }}>20 comments ・ 300 likes</Text>
          <Text style={{ color: '#aaa', marginTop: RFValue(5) }}>Added 20 hours ago</Text>
        </View>
        <View>
          <Icon name="heart-outline" size={RFValue(25)} color="red" />
        </View>
      </View>
    </View>
  );
};

export default SinglePost;
