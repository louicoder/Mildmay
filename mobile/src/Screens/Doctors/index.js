import React from 'react';
import { View, Text, SafeAreaView, FlatList, Image, Pressable, ScrollView, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { DoctorPreview } from '../../Components';
import Button from '../../Components/Button';
import Header from '../../Components/Header';
import LoadingModal from '../../Components/LoadingModal';
import Modal from '../../Components/Modal';
import Navigation from '../../Navigation';
import { Constants, HelperFunctions } from '../../Utils';
import { professions } from '../../Utils/Constants';
import Filters from './Filters';
import styles from './Styles';

const { width } = Dimensions.get('window');
const Doctors = (props) => {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.Doctors);
  const [ state, setState ] = React.useState({ selectedProfessions: [], isLoading: false });

  console.log('width,', width - 20 * 0.9);
  React.useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = () => {
    dispatch.Doctors.getDoctors((response) => {
      console.log('REsponse from getting doctors', response);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header {...props} title="Doctors" back={false} />
      <LoadingModal visible={state.isLoading} />

      <View style={{ height: RFValue(60), justifyContent: 'center' }}>
        <Filters />
      </View>
      <FlatList
        style={{ flexGrow: 1, paddingHorizontal: RFValue(10) }}
        showsVerticalScrollIndicator={false}
        keyExtractor={() => HelperFunctions.keyGenerator()}
        data={doctors}
        renderItem={({ item }) => (
          <DoctorPreview
            navigation={props.navigation}
            {...item}
            setLoading={(isLoading) => setState({ ...state, isLoading })}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Doctors;
