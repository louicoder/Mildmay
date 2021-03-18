import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { HelperFunctions } from '../../../Utils';

const Filters = React.memo(({ filter, setFilter }) => {
  // const [ state, setState ] = React.useState({ filter: '' });
  return (
    <View
      style={{
        width: '100%',
        borderBottomColor: '#eeeeee',
        borderBottomWidth: 0.5,
        paddingVertical: RFValue(10)
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[ 'sex', 'reproductive health', 'Testing', 'Colours', 'Travelling' ].map((item, index) => (
          <Pressable
            // onPress={() => setState({ ...state, filter: item })}
            onPress={() => setFilter(item)}
            key={HelperFunctions.keyGenerator()}
            style={{
              borderWidth: 1,
              borderColor: filter === item ? '#000' : '#eee',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: RFValue(15),
              marginRight: RFValue(10),
              borderRadius: RFValue(50),
              backgroundColor: filter === item ? '#000' : 'transparent',
              marginLeft: index === 0 ? RFValue(10) : 0,
              height: RFValue(35)
            }}
          >
            <Text style={{ fontSize: RFValue(13), color: filter === item ? '#fff' : '#000' }}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
});

export default Filters;
