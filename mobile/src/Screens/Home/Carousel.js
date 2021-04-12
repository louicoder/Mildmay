import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { HelperFunctions } from '../../Utils';

const { width } = Dimensions.get('window');

const Carousel = () => {
  const flatListRef = React.useRef();
  const [ timer, setTimer ] = React.useState(0);

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])

  React.useEffect(
    () => {
      const subscribe = setInterval(() => {
        // if (!timer) return;
        if (timer < 3) {
          flatListRef.current.scrollToIndex({ index: timer });
          console.log('indexing---...', timer);
        }
        const newTimer = timer + 1;
        setTimer(newTimer);
      }, 3000);

      return () => clearInterval(subscribe);
    },
    [ timer ]
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
      onEndReached={() => setTimer(0)}
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
