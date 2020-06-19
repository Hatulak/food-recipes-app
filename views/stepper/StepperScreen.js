import React from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  ScrollView,
  Picker,
  CheckBox,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import firebase from "firebase";

const ApiKeyQ = "?apiKey=02240cf11e1a4c2ea8f3b3d41c4d4d05";
const ApiKey = "&apiKey=02240cf11e1a4c2ea8f3b3d41c4d4d05";

export default class StepperScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: props.uid,
    };
    console.log(this.state.uid);
  }

  componentDidMount(){
      
  }

  render() {
    return <ScrollView style={styles.container}></ScrollView>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#eee",
    marginTop: 10,
    // alignItems: "center",
  },
  queryContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  fav: {
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    paddingLeft: 20,
    width: 250,
    height: 40,
    borderColor: "gray",
    color: "black",
    borderRadius: 10,
    borderStyle: "solid",
    backgroundColor: "#fff",
    // margin: 5,
  },
  label: {
    marginTop: 5,
  },
  text: {
    padding: 5,
    marginTop: 10,
    textAlign: "justify",
    fontSize: 17,
  },
  button: {
    borderRadius: 10,
    width: 100,
    backgroundColor: "#aeaeae",
    padding: 7,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  summary: {
    flex: 1,
  },
  info: {
    marginLeft: 5,
    width: 180,
  },
  title: {
    fontWeight: "bold",
    marginLeft: 5,
    width: 180,
  },
});
