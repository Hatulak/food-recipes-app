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
const ImageBaseUri = 'https://spoonacular.com/recipeImages/';

export default class SearchItemRow extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
        uid: props.uid,
        recipeId: props.result.item.id,
    };
  }


  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: ImageBaseUri+ this.props.result.item.image}} style={{width: 100, height: 100,}} />
        <Text>{this.props.result.item.title}</Text>
        <Text>{this.props.result.item.readyInMinutes}</Text>
        <Text>{this.props.result.item.servings}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
  },
  label: {
    margin: 6,
  },
  list: {
    flex: 1,
    padding: 1,
  },
});
