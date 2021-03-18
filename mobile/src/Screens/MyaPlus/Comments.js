import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import SinglePost from './SinglePost';

const Comments = ({ id }) => {
  return (
    <View>
      <FlatList
        style={{}}
        ListHeaderComponent={SinglePost}
        data={[ ...Array(30).keys() ]}
        renderItem={({ index }) => (
          <View
            style={{
              marginBottom: index === 29 ? RFValue(100) : RFValue(10),
              marginHorizontal: RFValue(10),
              marginTop: index === 0 ? RFValue(20) : 0
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{
                  uri:
                    'https://bloximages.chicago2.vip.townnews.com/stlamerican.com/content/tncms/assets/v3/editorial/1/cb/1cb65068-c76d-11e8-8686-7f40e5fbe1d0/5bb5605309dba.image.jpg?resize=400%2C422'
                }}
                style={{ width: RFValue(30), height: RFValue(30), borderRadius: RFValue(30) }}
              />
              <Text style={{ fontSize: RFValue(14), marginLeft: RFValue(10), fontWeight: 'bold' }}>
                someone@gmail.com
              </Text>
            </View>
            <View style={{ marginLeft: RFValue(40) }}>
              <Text style={{ color: 'rgba(0,0,0,.7)' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si quicquam extra virtutem habeatur in bonis.
                Nulla profecto est, quin suam vim retineat a primo ad extremum. Experiamur igitur, succumbere.
                {index % 2 === 0 &&
                  'inquit, etsi habetStoicorum ratio difficilius quiddam et obscurius. Tum Piso: Quoniam igitur aliquid omnes, quid Lucius noster? Quid est igitur, cur ita semper deum appellet Epicurus beatum et aeternum? Non potes, nisiretexueris illa. Potius ergo illa dicantur: turpe esse, viri non esse debilitari dolore, frangi'}
              </Text>
              <Text style={{ color: '#aaa', marginTop: RFValue(5) }}>20 hours ago</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Comments;
