import React from "react";
import { StyleSheet, Text, Button, View, TextInput, Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";
import firebase from "firebase";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  onLoginPress = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {

    }, (error) => {
      Alert.alert(error.message);
    });
  };

  onCreateAccountPress = () => {
    var navActions = CommonActions.reset({
      index: 1,
      routes: [{ name: "RegisterScreen" }],
    });
    this.props.navigation.dispatch(navActions);
  };

  onForgotPasswordPress = () => {
    var navActions = CommonActions.reset({
      index: 1,
      routes: [{ name: "ForgotPasswordScreen" }],
    });
    this.props.navigation.dispatch(navActions);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
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

        <Button title="Login" onPress={this.onLoginPress} />
        <Button title="Create Account" onPress={this.onCreateAccountPress} />
        <Button title="Forgot Password" onPress={this.onForgotPasswordPress} />
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
