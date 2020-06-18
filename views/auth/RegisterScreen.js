import React from "react";
import { StyleSheet, Text, Button, View, TextInput, Alert, } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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
        <Text style={styles.text}>Signup</Text>
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
        <TouchableOpacity style={styles.button} onPress={this.onSignupPress}>
          <Text style={styles.buttonText}>Signup</Text>
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
