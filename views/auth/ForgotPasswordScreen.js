import React from "react";
import { StyleSheet, Text, Button, View, TextInput, Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";
import firebase from "firebase";

export default class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  onResetPasswordPress = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(
        () => {
          Alert.alert('Password reset email has been sent.')
        },
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
        <Text>Forgot Password</Text>
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
        <Button title="Reset Password" onPress={this.onResetPasswordPress} />
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
