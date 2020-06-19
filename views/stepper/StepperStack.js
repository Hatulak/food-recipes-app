import React from "react";
import { StyleSheet, Text, Button, View, Picker, CheckBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StepperScreen from "./StepperScreen";

const Stack = createStackNavigator();

export default class StepperStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: props.uid,
    };
  }

  render() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name="StepperScreen" options={{title: 'Burn your meals'}}>
            {(props) => <StepperScreen {...props} uid={this.state.uid} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
