import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import styles from './Styles';

const CommentBox = ({ onPress }) => {
  const [ review, setReview ] = React.useState('');
  return (
    <View style={styles.commentContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Leave a review"
        multiline
        value={review}
        onChangeText={(review) => setReview(review)}
      />
      <Pressable style={{ width: '20%' }} onPressIn={() => onPress(review)}>
        <Text style={styles.postText}>Post</Text>
      </Pressable>
    </View>
  );
};

export default CommentBox;
