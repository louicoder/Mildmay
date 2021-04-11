import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Constants, HelperFunctions } from '../../../Utils';

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
        {Constants.topics.map((item, index) => (
          <Pressable
            // onPress={() => setState({ ...state, filter: item })}
            onPress={() => setFilter(item)}
            key={HelperFunctions.keyGenerator()}
            style={{
              borderWidth: 1,
              borderColor: filter === item ? Constants.green : '#eee',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: RFValue(15),
              marginRight: RFValue(10),
              borderRadius: RFValue(50),
              backgroundColor: filter === item ? Constants.green : 'transparent',
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
