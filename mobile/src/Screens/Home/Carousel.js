import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { HelperFunctions } from '../../Utils';

const { width } = Dimensions.get('window');

const Carousel = () => {
  const flatListRef = React.useRef();
  const [ state, setState ] = React.useState(0);
  React.useEffect(
    () => {
      const subscribe = setInterval(() => {
        if (state < 3) {
          flatListRef.current.scrollToIndex({ index: state });
          console.log('indexing---...', state);
        }
        const newState = state + 1;
        setState(newState);
      }, 5000);

      return () => clearInterval(subscribe);
    },
    [ state ]
  );
  return (
    <FlatList
      style={{ marginBottom: RFValue(10) }}
      ref={(ref = flatListRef)}
      horizontal
      pagingEnabled
      keyExtractor={() => HelperFunctions.keyGenerator()}
      showsHorizontalScrollIndicator={false}
      data={[ 'green', 'orange', 'black' ]}
      onEndReachedThreshold={0.9}
      onEndReached={() => {
        setState(0);
        // setTimeout(() => {
        //   // flatListRef.current.scrollToIndex({ index: 0 });
        // }, 3000);
      }}
      renderItem={({ item }) => (
        <View
          style={{
            width,
            height: RFValue(250),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: item
          }}
        >
          <Text>{item}</Text>
        </View>
      )}
    />
  );
};

export default Carousel;
