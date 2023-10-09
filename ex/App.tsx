/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {FlatList, StyleSheet, TextInput, View} from 'react-native';
import {SinglePost} from './components/SinglePost';
import {useEffect, useState} from 'react';

function App(): JSX.Element {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = search
          ? await fetch('https://dummyjson.com/products/search?q=' + search)
          : await fetch('https://dummyjson.com/products');
        const data = await res.json();
        setPosts(data.products);
      };
      fetchData();
    } catch (error) {}
  }, [search]);

  type postProps = {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search"
          style={styles.input}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={posts}
        renderItem={({item}: {item: postProps}) => <SinglePost post={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'lightblue',
    minWidth: 150,
    padding: 4,
    marginTop: 50,
    paddingLeft: 10,
    borderRadius: 20,
  },
  inputContainer: {height: 100, justifyContent: 'center'},
  scrollview: {
    backgroundColor: 'lightgray',
    alignContent: 'center',
    width: 300,
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
  post: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  postContainer: {
    margin: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
