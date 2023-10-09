import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';

type PostProps = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
};
export function SinglePost({post}: {post: PostProps}) {
  return (
    <View style={styles.postContainer}>
      <View key={post.id} style={styles.post}>
        <Image source={{uri: post.thumbnail}} style={styles.postImage} />
        <View style={styles.postTitle}>
          <Text>{post.title}</Text>
        </View>
      </View>
      <View style={styles.postDescription}>
        <Text>{post.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  postContainer: {
    margin: 10,
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },
  postTitle: {
    alignItems: 'center',
    flex: 1,
  },
  postImage: {width: 100, height: 100, borderRadius: 10, margin: 5},
  postDescription: {margin: 10},
});
