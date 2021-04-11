import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Queries } from '../../../Utils';
import Filters from './Filters';
import SingleBlog from './SingleBlog';
import LoadingModal from '../../../Components/LoadingModal';

const BlogList = ({ navigation }) => {
  const [ blogs, setBlogs ] = React.useState([]);
  const [ filter, setFilter ] = React.useState('');
  const [ loading, setLoading ] = React.useState(false);

  React.useEffect(() => {
    const subscribe = Queries.collectionRealTime('Blogs', ({ error, docs: blogs }) => {
      if (error) return Alert.alert('Error', error);
      setBlogs(blogs);
    });
    // const subscribe = getBlogs();
    return subscribe;
  }, []);

  const setFilterHandler = React.useCallback(
    (item) => {
      console.log('Filter', item);
      setFilter(item);
    },
    [ setFilter ]
  );

  return (
    <View style={{ flex: 1 }}>
      <LoadingModal visible={loading} />
      <Filters filter={filter} setFilter={setFilterHandler} />
      {blogs && blogs.length ? (
        <FlatList
          // ListHeaderComponent={<Filters filter={filter} setFilter={setFilterHandler} />}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, paddingBottom: RFValue(200) }}
          keyExtractor={(item) => item.id}
          data={blogs}
          renderItem={({ index, item }) => (
            <SingleBlog
              navigation={navigation}
              setLoading={(loading) => setLoading(loading)}
              {...item}
              last={index + 1 === blogs.length}
              extStyles={{}}
              // navigation={navigation}
              index={index}
              email="musanje2010@gmail.com"
            />
          )}
        />
      ) : null}
      {blogs && !blogs.length ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: RFValue(15) }}>
          <Text style={{ color: '#aaa', fontSize: RFValue(12) }}>No blogs yet, keep checking...</Text>
        </View>
      ) : null}
    </View>
  );
};

export default BlogList;
