import React from 'react';
import { View, SafeAreaView, Dimensions, FlatList, ScrollView } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text } from '../../Components';
import Listing from './Listing';

const { width } = Dimensions.get('window');

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: RFValue(10),
            marginVertical: RFValue(20)
          }}
        >
          <View>
            <Text text="Welcome to," extStyles={{ fontSize: RFValue(20) }} />
            <Text text="MildMay" extStyles={{ fontSize: RFValue(35), fontWeight: '700' }} />
          </View>
          <Ripple
            rippleContainerBorderRadius={RFValue(25)}
            rippleCentered
            style={{
              height: RFValue(40),
              width: RFValue(40),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: RFValue(25),
              backgroundColor: '#1c7c54'
            }}
          >
            <Icon name="dots-horizontal" size={RFValue(20)} color="#fff" />
          </Ripple>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: RFValue(10) }}>
            <Button
              title="Visit MYU"
              extStyles={{
                height: RFValue(40),
                width: '49%',
                height: RFValue(100),
                backgroundColor: '#90e0ef'
                // borderWidth: 0
              }}
              noBg
            />
            <Button
              title="Visit MYa Plus to cconnect with some"
              extStyles={{ height: RFValue(40), width: '49%', height: RFValue(100), backgroundColor: '#90e0ef' }}
              noBg
            />
          </View>
          <Listing title="Our Top Doctors" />
          <Listing title="Latest Providers" />
          <Listing title="Latest Providers" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
