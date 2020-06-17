import React from "react";
import { StyleSheet, Text, Button, View, TextInput, Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";
import firebase from "firebase";

export default class LogoutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    firebase.auth().signOut();
  }

  render() {
    return <View style={styles.container}></View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
    flex: 1,
    backgroundColor: "#eee",
  },
});
