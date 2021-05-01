import React from 'react';
import { View, Dimensions, ScrollView, Image, Text, Linking, SafeAreaView, Pressable } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text as TextComp } from '../../Components';
import Header from '../../Components/Header';
import Listing from './Listing';
import TopCategories from './TopCategories';
import LOGO from '../../assets/MUG(2).png';
import { Constants, HelperFunctions, Queries } from '../../Utils';
import Carousel from './Carousel';

const { width } = Dimensions.get('window');

const Home = ({ navigation, ...props }) => {
  const [ state, setState ] = React.useState({ topPosts: [] });
  const gotoHandler = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  React.useEffect(() => {
    const subscribe = Queries.getDocsOrderedByTimeStamp('Blogs', 5, (topPosts) => {
      // console.log('TOp posts', topPosts);
      setState({ ...state, topPosts });
    });

    return subscribe;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Header {...props} /> */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: RFValue(10)
        }}
      >
        <View>
          {/* <TextComp text="Welcome to," extStyles={{ fontSize: RFValue(20) }} /> */}
          <TextComp
            text="MildMay Uganda"
            extStyles={{ fontSize: RFValue(25), fontWeight: '700', color: Constants.darkGreen }}
          />
        </View>
        <Pressable
          style={{
            height: RFValue(40),
            width: RFValue(40),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: RFValue(25),
            backgroundColor: Constants.darkGreen
          }}
          onPress={() => navigation.toggleDrawer()}
        >
          <Icon name="menu" size={RFValue(20)} color="#fff" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        {state && <Carousel />}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: RFValue(10),
            flexWrap: 'wrap'
          }}
        >
          {[
            { icon: '', caption: '', goto: () => gotoHandler('https://www.mildmay.or.ug') },
            { icon: 'hospital-building', caption: 'MUG Hospital', goto: '' },
            { icon: 'doctor', caption: 'Bethany Clinic', goto: '' },
            { icon: 'calendar', caption: 'Programs', goto: () => gotoHandler('https://www.mildmay.or.ug/impact') },
            {
              icon: 'text-box-search',
              caption: 'MURC',
              goto: () => gotoHandler('https://www.mildmay.or.ug/research-mildmay-uganda')
            },
            { icon: 'account-group', caption: 'MYa Plus', goto: () => navigation.navigate('MyaPlus') },
            {
              icon: 'newspaper-variant-multiple',
              caption: 'News',
              goto: () => gotoHandler('https://www.mildmay.or.ug/news-events')
            },
            { icon: 'school', caption: 'MIHS Insitute', goto: () => gotoHandler('https://www.mihs.mildmay.or.ug') }
          ].map(({ icon, caption, goto }) => (
            <Ripple
              key={HelperFunctions.keyGenerator()}
              rippleContainerBorderRadius={200}
              rippleCentered
              style={{
                width: RFValue(25 / 100 * width),
                height: RFValue(25 / 100 * width),
                borderRadius: 100,
                borderColor: '#eee',
                backgroundColor: 'green',
                marginBottom: RFValue(5),
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: RFValue(10)
              }}
              // onPress={() => (goto ? gotoHandler(goto) : null)}
              onPress={goto}
            >
              {icon ? (
                <Icon name={icon} size={RFValue(25)} color="#fff" />
              ) : (
                <Image source={LOGO} style={{ width: '90%', height: '90%' }} />
              )}
              {caption ? (
                <Text style={{ fontSize: RFValue(12), color: '#fff', textAlign: 'center', marginTop: RFValue(10) }}>
                  {caption}
                </Text>
              ) : null}
            </Ripple>
          ))}
          <View
            style={{
              width: RFValue(25 / 100 * width),
              height: RFValue(25 / 100 * width),
              borderRadius: 100,
              borderWidth: 1,
              marginBottom: RFValue(5),
              opacity: 0
            }}
          />
        </View>

        <TopCategories />

        {/* {state.topPosts && <Listing title="MyaPlus Latest Posts" data={state.topPosts} />}
        <Listing title="MyaPlus Top Posts" data={doctors} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
