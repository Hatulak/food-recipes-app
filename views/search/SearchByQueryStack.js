import React from "react";
import { StyleSheet, Text, Button, View, Picker, CheckBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SearchByQuery from "./SearchByQuery";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default class SearchByQueryStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid : props.uid,
    };
  }

  render() {
    return (
      <NavigationContainer independent={true}>
          <Stack.Navigator>
          <Stack.Screen name="SearchByQuery">{props => <SearchByQuery {...props} uid={this.state.uid} />}</Stack.Screen>
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
