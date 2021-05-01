import React from 'react';
import { View, Text, FlatList, Dimensions, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { HelperFunctions } from '../../Utils';
import image1 from '../../assets/images/image1.jpeg';
import image2 from '../../assets/images/image2.jpeg';
import image3 from '../../assets/images/image3.jpeg';
import image4 from '../../assets/images/image4.jpeg';
import image5 from '../../assets/images/image5.jpeg';
import image6 from '../../assets/images/image6.jpeg';
import image7 from '../../assets/images/image7.jpeg';
import image8 from '../../assets/images/image8.jpeg';
import image9 from '../../assets/images/image9.jpeg';
import image10 from '../../assets/images/image10.jpeg';

const { width } = Dimensions.get('window');

const Carousel = () => {
  const flatListRef = React.useRef();
  const [ timer, setTimer ] = React.useState(0);

  const images = [ image1, image2, image3, image4, image5, image6, image7, image8, image9, image10 ];

  React.useEffect(
    () => {
      const subscribe = setInterval(() => {
        // if (!timer) return;
        if (timer && timer < images.length) {
          flatListRef.current.scrollToIndex({ index: timer });
          // console.log('indexing---...', timer);
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
      data={images}
      onEndReachedThreshold={0.9}
      onEndReached={() => images && setTimer(0)}
      renderItem={({ item }) => (
        <View
          style={{
            width,
            height: RFValue(250),
            alignItems: 'center',
            justifyContent: 'center'
            // backgroundColor: item
          }}
        >
          <Image source={item} style={{ width, height: '100%' }} resizeMode="cover" />
        </View>
      )}
    />
  );
};

export default Carousel;
