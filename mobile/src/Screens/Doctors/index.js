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
import styles from './Styles';

const { width } = Dimensions.get('window');
const Doctors = (props) => {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.Doctors);
  const [ state, setState ] = React.useState({ selectedProfessions: [], isLoading: false, modalVisible: true });

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
    <View style={{ flex: 1 }}>
      <Header {...props} title="Doctors" back={false} />
      <LoadingModal visible={state.isLoading} />
      <Modal isVisible={state.modalVisible} closeModal={() => setState({ ...state, modalVisible: false })}>
        <View style={{ height: RFValue(200), backgroundColor: '#fff', width: '100%' }}>
          <Text>sdfsfsd</Text>
        </View>
      </Modal>

      <View style={{ height: RFValue(60), justifyContent: 'center' }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: RFValue(10), height: RFValue(20) }}
        >
          {professions &&
            professions.map((profession, index) => {
              const exists = state.selectedProfessions && state.selectedProfessions.includes(profession);
              return (
                <Pressable
                  key={HelperFunctions.keyGenerator()}
                  onPress={() =>
                    setState({
                      ...state,
                      modalVisible: true,
                      selectedProfessions: exists
                        ? state.selectedProfessions.filter((pro) => pro !== profession)
                        : [ ...state.selectedProfessions, profession ]
                    })}
                  style={styles.professionContainer(exists)}
                >
                  <Text style={styles.proText(exists)}>{profession}</Text>
                </Pressable>
              );
            })}
        </ScrollView>
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
    </View>
  );
};

export default Doctors;
