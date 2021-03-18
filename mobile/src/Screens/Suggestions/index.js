import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { HelperFunctions } from '../../Utils';

const Suggestions = ({ navigation }) => {
  const [ state, setState ] = React.useState({ selected: [] });
  const stateX = useSelector((state) => state);

  console.log('Plus+++++', stateX);
  return (
    <View style={{ justifyContent: 'center', flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        {[ 'girls', 'boys', 'sex-life', 'adolescence', 'testing', 'blogs' ].map((item) => (
          <Pressable
            key={HelperFunctions.keyGenerator()}
            onPress={() =>
              setState({
                ...state,
                selected: state.selected.includes(item)
                  ? [ ...state.selected.filter((sel) => sel !== item) ]
                  : [ ...state.selected, item ]
              })}
            style={{
              paddingVertical: RFValue(15),
              paddingHorizontal: RFValue(20),
              borderWidth: 1,
              borderColor: state.selected.includes(item) ? '#000' : '#ddd',
              borderRadius: RFValue(100),
              marginBottom: RFValue(10),
              marginHorizontal: RFValue(5),
              backgroundColor: state.selected.includes(item) ? '#000' : '#fff'
            }}
          >
            <Text style={{ fontSize: RFValue(14), color: state.selected.includes(item) ? '#fff' : '#000' }}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
      <Pressable
        onPress={() => navigation.navigate('HomeScreens')}
        style={{
          position: 'absolute',
          bottom: RFValue(40),
          backgroundColor: '#000',
          // borderWidth: 1,
          paddingHorizontal: RFValue(20),
          paddingVertical: RFValue(10),
          alignSelf: 'center'
        }}
      >
        <Text style={{ color: '#fff', fontSize: RFValue(14) }}>Continue</Text>
      </Pressable>
    </View>
  );
};

export default Suggestions;
