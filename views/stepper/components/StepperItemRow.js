import React from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  Picker,
  CheckBox,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const ApiKey = "&apiKey=02240cf11e1a4c2ea8f3b3d41c4d4d05";
const ImageBaseUri = "https://spoonacular.com/recipeImages/";

export default class StepperItemRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: props.uid,
    };
  }

  delete() {
      console.log('delete');
  }

  render() {
    return (
      <TouchableOpacity onLongPress={() => this.delete()}>
        
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  checkboxContainer: {
    flexDirection: "row",
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
  },
  info: {
    marginLeft: 5,
    width: 250,
  },
  title: {
    fontWeight: "bold",
    marginLeft: 5,
    width: 250,
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
    width: 250,
    backgroundColor: "#aeaeae",
    padding: 7,
    alignItems: "center",
    margin: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
