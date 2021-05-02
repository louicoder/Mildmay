import React from 'react';
import { View, Text, SafeAreaView, FlatList, Alert } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { DoctorPreview } from '../../Components';
import Input from '../../Components/Input';
import LoadingModal from '../../Components/LoadingModal';
import { HelperFunctions } from '../../Utils';
import firestore from '@react-native-firebase/firestore';

const Search = ({ navigation }) => {
  const loading = useSelector((state) => state.loading.effects.Doctors);
  const dispatch = useDispatch();
  const [ state, setState ] = React.useState({
    filterShowing: false,
    category: '',
    subCategory: '',
    searchResults: [],
    filteredResults: [],
    search: '',
    isLoading: false
  });

  React.useEffect(() => {
    // getSearchResults();

    const sub = firestore().collection('Users').where('accountType', '==', 'Doctor').onSnapshot((snapshot) => {
      const searchResults = [ ...snapshot.docs.map((doc) => ({ ...doc.data(), uid: doc.id })) ];
      setState({ ...state, searchResults });
    });
    return () => sub;
  }, []);

  const getSearchResults = () => {
    dispatch.Doctors.getDoctors(({ doc, error }) => {
      if (error) return Alert.alert('Error', 'Something went wrong while initialising doctors search');
      setState({ ...state, searchResults: doc });
      // console.log('doctors', doc);
    });
  };

  const filterResults = (search) => {
    // const doctors = [ ...state.searchResults ];
    const filt = state.searchResults.filter((doc) => {
      // console.log('', doc.name && doc.name.toLowerCase().indexOf(search.toLowerCase()));
      const nameExists = doc.name && doc.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      const emailExists = doc.email.split('@')[0].toLowerCase().indexOf(search.toLowerCase()) !== -1;
      if (nameExists || emailExists) return doc;
    });

    return setState({ ...state, filteredResults: filt, search });
  };

  return (
    <React.Fragment>
      <LoadingModal visible={loading.getDoctors} />
      <SafeAreaView>
        <View style={{ paddingHorizontal: RFValue(10), flexDirection: 'row', marginTop: RFValue(10) }}>
          <Input
            placeholder="Enter your search"
            extStyles={{ width: '85%', marginBottom: 0 }}
            inputStyles={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            value={state.search}
            onChangeText={(search) => {
              console.log('SEARCH', search);
              setState({ ...state, search });
              filterResults(search);
            }}
          />
          <Ripple
            rippleCentered
            style={{
              flexGrow: 1,
              borderTopRightRadius: RFValue(5),
              borderBottomRightRadius: RFValue(5),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'green'
            }}
          >
            <Icon name="magnify" size={RFValue(25)} color="#fff" />
          </Ripple>
        </View>

        <FlatList
          style={{ flexGrow: 1, paddingHorizontal: RFValue(10) }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.uid}
          data={state.search && state.search.length ? state.filteredResults : state.searchResults}
          renderItem={({ item }) => (
            <DoctorPreview
              getDoctors={getSearchResults}
              navigation={navigation}
              profile={item}
              // setLoading={(isLoading) => setState({ ...state, isLoading })}
            />
          )}
        />
        {/* {state.search && state.search.length && state.filteredResults && state.filteredResults.length ? (
        ) : null} */}
        {/* {state.search && state.search.length && state.filteredResults && !state.filteredResults.length ? (
          <View style={{ flexGrow: 1, backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' }}>
            <Text>No doctors match your query</Text>
          </View>
        ) : null} */}
      </SafeAreaView>
    </React.Fragment>
  );
};

export default Search;
