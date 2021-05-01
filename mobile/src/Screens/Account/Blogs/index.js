import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { Header } from '../../../Components';
import LoadingModal from '../../../Components/LoadingModal';
import SingleBlog from '../../MyaPlus/MyaBlogsList/SingleBlog';

const Blogs = ({ navigation }) => {
  const { blogs } = useSelector((state) => state.Account);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={navigation} back title="Your blog posts" />
      <LoadingModal  />
      <FlatList
        data={blogs}
        renderItem={({ item, index }) => (
          <SingleBlog navigation={navigation} {...item} last={index + 1 === blogs.length} />
        )}
      />
    </SafeAreaView>
  );
};

export default Blogs;
