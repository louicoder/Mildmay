import React from 'react';
import { View, FlatList } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Button, HeaderLinker, Text } from '../../Components';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { HelperFunctions } from '../../Utils';

const Listing = ({ title = 'Sample Topic', data }) => {
  return (
    <View style={{ height: RFPercentage(30) }}>
      <HeaderLinker title={title} extStyles={{ paddingHorizontal: RFValue(10) }} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={[ 0, 2, 3, 4, 4, 5, 6, 7, 8 ]}
        keyExtractor={() => HelperFunctions.keyGenerator()}
        horizontal
        renderItem={({ index }) => (
          <Ripple
            rippleDuration={300}
            style={{
              height: '100%',
              width: RFPercentage(30),
              borderWidth: 1,
              borderColor: 'orange',
              marginRight: RFValue(10)
            }}
          />
        )}
      />
    </View>
  );
};

export default Listing;
