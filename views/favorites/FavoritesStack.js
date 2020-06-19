import React from "react";
import { StyleSheet, Text, Button, View, Picker, CheckBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FavoriteRecipeDetails from "./FavoriteRecipeDetails";
import FavoritesScreen from "./FavoritesScreen";

const Stack = createStackNavigator();

export default class FavoritesStack extends React.Component {
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
          <Stack.Screen name="FavoritesScreen" options={{title: 'My favorites'}}>
            {(props) => <FavoritesScreen {...props} uid={this.state.uid} />}
          </Stack.Screen>
          <Stack.Screen name="FavoriteRecipeDetails" options={{title: 'Recipe details'}}>
            {(props) => <FavoriteRecipeDetails {...props} uid={this.state.uid} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
