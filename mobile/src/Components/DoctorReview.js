import React from 'react';
import { View, Text, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const DoctorReview = () => {
  return (
    <View
      style={{
        marginBottom: RFValue(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: RFValue(10),
        width: '100%'
        // borderWidth: 1
      }}
    >
      <Image
        source={{
          uri: 'https://post.greatist.com/wp-content/uploads/2020/09/Black_Male_Doctor_Portrait_732x549-thumbnail.jpg'
        }}
        style={{ width: RFValue(30), height: RFValue(30), borderRadius: RFValue(50) }}
      />
      <View style={{ flexShrink: 1, paddingLeft: RFValue(10) }}>
        <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>Reviewer's name</Text>
        <Text style={{ fontSize: RFValue(12), color: '#aaa', marginBottom: RFValue(5) }}>20 mins ago</Text>
        <Text style={{ fontSize: RFValue(14) }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quod proximum fuit non vidit. Tum ille timide vel
          potius verecunde: Facio, inquit. Videamus igitur sententias eorum, tum ad verba redeamus. Sed quanta sit
          alias, nunc tantum possitne esse tanta. Duo Reges: constructio interrete. Itaque contra est, ac dicitis;
        </Text>
      </View>
    </View>
  );
};

export default DoctorReview;
