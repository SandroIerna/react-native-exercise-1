import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setPosts(data.products);
        console.log(posts[1]);
      };
      fetchData();
    } catch (error) {}
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://dummyjson.com/products/search?q=" + search
      );
      const data = await res.json();
      setPosts(data.products);
    };
    fetchData();
  }, [search]);

  type post = {
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
      <ScrollView style={styles.scrollview}>
        {posts.map((post: post) => (
          <View style={styles.postContainer}>
            <View key={post.id} style={styles.post}>
              <Image
                source={{ uri: post.thumbnail }}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text>{post.title}</Text>
              </View>
            </View>
            <View style={{ margin: 10 }}>
              <Text>{post.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "lightblue",
    minWidth: 150,
    padding: 4,
    paddingLeft: 10,
    borderRadius: 20,
  },
  inputContainer: { height: 100, justifyContent: "center" },
  scrollview: {
    backgroundColor: "lightgray",
    alignContent: "center",
    width: 300,
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
  post: {
    alignItems: "center",
    flexDirection: "row",
  },
  postContainer: {
    margin: 10,
  },
});
