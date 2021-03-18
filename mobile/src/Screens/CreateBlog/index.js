import React from 'react';
import { View, Text, SafeAreaView, Image, Pressable, ScrollView, ImageBackground, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { PERMISSIONS } from 'react-native-permissions';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HelperFunctions, Queries } from '../../Utils';
// import Firebase from '../../Utils/Firebase';
import { ImagePicker } from '../../Utils/HelperFunctions';
import Firestore from '@react-native-firebase/firestore';
import Storage from '@react-native-firebase/storage';

const DB = Firestore();

const BlogPost = ({ navigation }) => {
  const [ state, setState ] = React.useState({
    caption:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Perge porro; Virtutis, magnitudinis animi, patientiae, fortitudinis fomentis dolor mitigari solet. Duo Reges: constructio interrete',
    topics: [],
    topicsVisible: true,
    image: {},
    progress: 0,
    progressVisible: false
  });

  const imageLoaded = () => {
    Image.getSize(
      'https://upload.wikimedia.org/wikipedia/en/2/2f/Profile_image_Nadia_Lim_chef_2014.jpg',
      (width, height) => {
        console.log('Image size', width, height);
      }
    );
  };

  const selectImage = () =>
    HelperFunctions.CheckPermissions(
      PERMISSIONS.ANDROID.CAMERA,
      ImagePicker((image) => {
        console.log('REsponse', image);
        if (image.uri) setState({ ...state, image });
      })
    );

  const createBlogHandler = async () => {
    if (state.image.uri) {
      await HelperFunctions.uploadImage(
        `blogs/${state.image.fileName}`,
        state.image.uri,
        (progress) => {
          setState({ ...state, progress, progressVisible: true });
        },
        (error) => {
          setState({ ...state, progressVisible: false, progress: 0 });
          Alert.alert('Error', error);
        },
        async (imageUrl) => createDocument(imageUrl)
      );
    } else {
      createDocument('');
    }
  };

  const clearFields = () =>
    setState({ ...state, caption: '', image: {}, topics: [], progress: 0, progressVisible: false });

  const createDocument = async (imageUrl = '') =>
    await Queries.createDoc(
      'Blogs',
      {
        caption: state.caption,
        topics: state.topics,
        imageUrl,
        dateCreated: new Date().toDateString(),
        timeStamp: Firestore.FieldValue.serverTimestamp(),
        likes: [],
        comments: []
      },
      ({ error, doc }) => {
        if (error) return Alert.alert(error);
        clearFields();
        return navigation.navigate('MyaBlogsList');
      }
    );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: RFValue(10),
          marginHorizontal: RFValue(10),
          marginTop: RFValue(10)
        }}
      >
        <Text style={{ fontSize: RFValue(15) }}>Create Post</Text>
        <Pressable
          onPress={() =>
            state.image.uri && !state.progressVisible
              ? setState({ ...state, image: {} })
              : state.progressVisible ? null : selectImage()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: RFValue(15),
            paddingVertical: RFValue(8),
            backgroundColor: '#010203',
            borderRadius: RFValue(50)
          }}
        >
          <Text style={{ fontSize: RFValue(12), color: '#fff' }}>{state.image.uri ? 'Remove' : 'Add'} Photo</Text>
          <Icon
            name={state.image.uri ? 'close' : 'plus'}
            size={RFValue(20)}
            color="#fff"
            style={{ marginLeft: RFValue(10) }}
          />
        </Pressable>
      </View>
      <ScrollView style={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {state.image.uri ? (
          <ImageBackground
            source={{ uri: state.image.uri }}
            onProgress={(e) => console.log('progress started', e)}
            style={{ width: '100%', height: RFValue(300) }}
            onLoadEnd={imageLoaded}
            resizeMode="cover"
          >
            <Pressable
              onPress={() => (state.progressVisible ? null : selectImage())}
              style={{
                flex: 1,
                padding: RFValue(20),
                zIndex: 20,
                backgroundColor: 'rgba(0,0,0,.6)',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={{ color: 'rgb(255,255,255)' }}>Click to change image</Text>
              {state.progressVisible ? (
                <Text style={{ marginVertical: RFValue(10), fontSize: RFValue(25), color: '#fff', fontWeight: 'bold' }}>
                  {state.progress}%
                </Text>
              ) : null}
            </Pressable>
          </ImageBackground>
        ) : null}

        {!state.image.uri ? (
          <Pressable
            onPress={selectImage}
            style={{
              width: '100%',
              height: RFValue(300),
              backgroundColor: '#ddd',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Icon name="camera" size={RFValue(200)} color="#ccc" />
            <Text style={{ fontSize: RFValue(14), color: '#000000' }}>Press to select image for post</Text>
          </Pressable>
        ) : null}

        <Pressable
          onPress={() => setState({ ...state, topicsVisible: !state.topicsVisible })}
          style={{ margin: RFValue(10), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text style={{ fontSize: RFValue(14), fontWeight: '700' }}>Add topics to your blog</Text>
          <Icon
            name={!state.topicsVisible ? 'chevron-down' : 'chevron-up'}
            size={RFValue(25)}
            onPress={() => setState({ ...state, topicsVisible: !state.topicsVisible })}
          />
        </Pressable>

        {state.topicsVisible ? (
          <View
            style={{
              width: '100%',
              margin: RFValue(10),
              flexWrap: 'wrap',
              flexDirection: 'row'
            }}
          >
            {[ 'sex', 'reproductive health', 'Testing', 'Colours', 'Travelling' ].map((item, index) => (
              <Pressable
                onPress={() =>
                  setState({
                    ...state,
                    topics: state.topics.includes(item)
                      ? state.topics.filter((topic) => topic !== item)
                      : [ ...state.topics, item ]
                  })}
                key={HelperFunctions.keyGenerator()}
                style={{
                  borderWidth: 1,
                  borderColor: state.topics.includes(item) ? '#000' : '#ccc',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: RFValue(10),
                  marginRight: RFValue(5),
                  borderRadius: RFValue(50),
                  backgroundColor: state.topics.includes(item) ? '#000' : 'transparent',
                  marginBottom: RFValue(5)
                }}
              >
                <Text style={{ fontSize: RFValue(12), color: state.topics.includes(item) ? '#fff' : '#000' }}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}
        <Text
          style={{
            fontWeight: '700',
            fontSize: RFValue(14),
            paddingHorizontal: RFValue(10),
            marginVertical: RFValue(15)
          }}
        >
          Add a description of your blog post below
        </Text>
        <TextInput
          placeholder="Enter blog description here..."
          placeholderTextColor="#aaa"
          value={state.caption}
          onChangeText={(caption) => setState({ ...state, caption })}
          multiline
          onContentSizeChange={() => null}
          maxLength={100}
          style={{
            marginHorizontal: RFValue(10),
            padding: RFValue(10),
            backgroundColor: '#ddd',
            fontSize: RFValue(14)
          }}
        />
        <Pressable
          style={{
            marginHorizontal: RFValue(10),
            paddingHorizontal: RFValue(20),
            paddingVertical: RFValue(10),
            backgroundColor: '#000',
            alignItems: 'center',
            marginVertical: RFValue(10),
            height: RFValue(50),
            justifyContent: 'center'
          }}
          onPress={createBlogHandler}
        >
          <Text style={{ color: '#fff', fontSize: RFValue(16) }}>Create Blog</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BlogPost;
