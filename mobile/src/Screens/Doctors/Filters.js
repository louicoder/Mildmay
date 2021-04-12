import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { HelperFunctions } from '../../Utils';
import { professions } from '../../Utils/Constants';
import styles from './Styles';

const Filters = () => {
  const [ state, setState ] = React.useState({ selectedProfessions: [] });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginVertical: RFValue(10), height: RFValue(20) }}
    >
      {professions &&
        professions.map((profession) => {
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
  );
};

export default Filters;
