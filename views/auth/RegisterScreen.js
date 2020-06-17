import React from "react";
import { StyleSheet, Text, Button, View, TextInput, Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";
import firebase from "firebase";

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
    };
  }

  onSignupPress = () => {
    if (this.state.password !== this.state.passwordConfirm) {
      Alert.alert("Passwords do not match");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {},
        (error) => {
          Alert.alert(error.message);
        }
      );
  };

  onBackToLoginPress = () => {
    var navActions = CommonActions.reset({
      index: 1,
      routes: [{ name: "LoginScreen" }],
    });
    this.props.navigation.dispatch(navActions);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Signup</Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          placeholder='Email'
          keyboardType='email-address'
          autoCapitalize='none'
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
        />
        <TextInput
          style={styles.input}
          value={this.state.password}
          placeholder='Password'
          autoCapitalize='none'
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
        />
        <TextInput
          style={styles.input}
          value={this.state.passwordConfirm}
          placeholder='Password confirm'
          autoCapitalize='none'
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({ passwordConfirm: text });
          }}
        />

        <Button title="Signup" onPress={this.onSignupPress} />
        <Button title="Back to Login" onPress={this.onBackToLoginPress} />
      </View>
    );
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
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
  },
});
