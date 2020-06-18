import React from "react";
import { StyleSheet, Text, Button, View, TextInput, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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
        <Text style={styles.text}>Forgot Password</Text>
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
        <TouchableOpacity style={styles.button} onPress={this.onResetPasswordPress}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.onBackToLoginPress}>
          <Text style={styles.buttonText}>Back to Login</Text>
        </TouchableOpacity>
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
    alignItems: "center",
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
    margin: 5,
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
    color: "#fff"
  },
});
